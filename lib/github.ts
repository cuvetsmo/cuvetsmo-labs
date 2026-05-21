/**
 * GitHub commit-activity fetcher — turns each lab's repo into a live signal.
 *
 * Why: the lab-row plot decorations used to be made-up numbers (decorative
 * only). Pulling real commit activity makes the page a transparency surface:
 * "this lab is alive" / "this lab has been quiet" / "this lab has no repo yet."
 *
 * API surface used (public, no auth required):
 *   - GET /repos/{owner}/{repo}/commits?since=...&per_page=100
 *     → recent commits with timestamps. We group by ISO week and derive
 *       lastActivity from the latest commit.
 *
 * Why NOT `/stats/commit_activity`: that endpoint returns 202 on cold cache
 * while GitHub computes weekly stats. Next.js then caches the 202 response,
 * so the plot stays empty for an hour. The /commits endpoint returns 200
 * deterministically and is enough data for our small 12-week window.
 *
 * Rate limit: unauthenticated = 60 req/hr per IP. With Next.js
 * `revalidate: 3600` and 1 request per repo (2 repos = 2 req/hr), we're
 * well inside the cap.
 */

export type CommitSignal = {
  /**
   * Commit counts per day for the plot window, oldest → newest. With 14
   * daily buckets a freshly-launched lab (a few days of activity) still
   * produces a legible signal — switching to weekly buckets meant 11 empty
   * weeks + 1 spike, which read as a flat line + tick instead of "this lab
   * is busy right now."
   */
  weeklyCounts: number[];
  /** ISO timestamp of the latest commit, or null if unknown. */
  lastActivity: string | null;
  /** Total commits in the plot window. Useful for sanity checks. */
  totalCommits: number;
};

const GH_API = "https://api.github.com";

/** Hours of cache for each GitHub response. */
const REVALIDATE_SECONDS = 60 * 60;

/**
 * Days in the plot window. 14 = two weeks. Tight enough that recent activity
 * dominates the shape, loose enough that "last 10 days of nothing" still
 * shows up.
 */
const PLOT_WINDOW_DAYS = 14;

/** Max commits to pull per repo. Caps the response size at ~30KB. */
const COMMITS_PER_PAGE = 100;

type GhCommit = {
  sha: string;
  commit: {
    author: { date: string } | null;
    committer: { date: string } | null;
  };
};

/**
 * Bucket a Date into the start (00:00 UTC) of its UTC day, returned as a
 * millisecond epoch. Used to count commits per day.
 */
function dayStartMs(d: Date): number {
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Fetch the commit signal for a single repo path like `"cuvetsmo/cuvetsmo-imaging"`.
 * Returns `null` if the repo doesn't exist or the API errors out.
 */
export async function getCommitSignal(repoPath: string | null): Promise<CommitSignal | null> {
  if (!repoPath) return null;

  try {
    // PLOT_WINDOW_DAYS ago in ISO-8601. GitHub accepts ?since=<ISO>.
    const since = new Date(Date.now() - PLOT_WINDOW_DAYS * DAY_MS).toISOString();
    const url = `${GH_API}/repos/${repoPath}/commits?per_page=${COMMITS_PER_PAGE}&since=${encodeURIComponent(since)}`;

    const res = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { Accept: "application/vnd.github+json" },
    });

    if (!res.ok) return null;

    const commits = (await res.json()) as GhCommit[];
    if (!Array.isArray(commits) || commits.length === 0) {
      return null;
    }

    // GitHub returns commits newest → oldest, so commits[0] is the latest.
    const lastActivity =
      commits[0]?.commit?.committer?.date ?? commits[0]?.commit?.author?.date ?? null;

    // Build daily buckets, oldest → newest. Pre-seed all days with 0 so
    // a quiet stretch shows as a flat segment, not a missing one.
    const today = dayStartMs(new Date());
    const dayStarts: number[] = [];
    for (let i = PLOT_WINDOW_DAYS - 1; i >= 0; i--) {
      dayStarts.push(today - i * DAY_MS);
    }
    const counts = dayStarts.map(() => 0);

    for (const c of commits) {
      const dateStr = c.commit?.committer?.date ?? c.commit?.author?.date;
      if (!dateStr) continue;
      const dStart = dayStartMs(new Date(dateStr));
      const idx = dayStarts.indexOf(dStart);
      if (idx >= 0) counts[idx]++;
    }

    const totalCommits = counts.reduce((a, b) => a + b, 0);

    if (totalCommits === 0 && !lastActivity) return null;

    return { weeklyCounts: counts, lastActivity, totalCommits };
  } catch {
    return null;
  }
}

/**
 * Format an ISO timestamp into a short relative label like "2h ago" /
 * "3d ago" / "5mo ago".
 */
export function formatRelativeTime(iso: string | null): string | null {
  if (!iso) return null;
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return null;

  const diffMs = Date.now() - then;
  if (diffMs < 0) return "just now";

  const sec = Math.floor(diffMs / 1000);
  if (sec < 60) return `${sec}s ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day < 30) return `${day}d ago`;
  const mo = Math.floor(day / 30);
  if (mo < 12) return `${mo}mo ago`;
  const yr = Math.floor(day / 365);
  return `${yr}y ago`;
}
