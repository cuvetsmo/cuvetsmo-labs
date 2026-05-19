import type { Lab } from "@/lib/labs";
import { STATUS_LABEL } from "@/lib/labs";

/**
 * Lab card — used by the landing grid.
 * - Live/Coming Soon labs link out to their subdomain.
 * - Planned/Future labs render as static cards (no CTA).
 */
export function LabCard({ lab }: { lab: Lab }) {
  const status = STATUS_LABEL[lab.status];
  const isLinkable = lab.url !== null;
  const isLive = lab.status === "live";

  const cardBody = (
    <>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div aria-hidden className="text-3xl sm:text-4xl leading-none">
          {lab.icon}
        </div>
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ring-1 ${status.tone}`}
        >
          {status.en}
        </span>
      </div>

      <div className="mb-2">
        <h3 className="text-lg sm:text-xl font-bold tracking-tight">
          {lab.name}
        </h3>
        <p className="text-xs text-[var(--color-muted)] mt-0.5">
          {status.th}
        </p>
      </div>

      <p className="text-sm text-[var(--color-text)] leading-relaxed mb-2">
        {lab.descTh}
      </p>
      <p className="text-xs text-[var(--color-muted)] leading-relaxed mb-4 italic">
        {lab.descEn}
      </p>

      <dl className="grid grid-cols-1 gap-1.5 text-xs mb-5">
        <div className="flex gap-2">
          <dt className="font-semibold text-[var(--color-muted)] w-20 shrink-0">
            Audience
          </dt>
          <dd className="text-[var(--color-text)]">{lab.audience}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="font-semibold text-[var(--color-muted)] w-20 shrink-0">
            Tech
          </dt>
          <dd className="text-[var(--color-text)] font-mono text-[11px]">
            {lab.tech}
          </dd>
        </div>
      </dl>

      {isLinkable ? (
        <span className="text-sm font-medium text-[var(--color-brand)] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
          {isLive ? "Visit" : "Preview"}
          <span aria-hidden>→</span>
        </span>
      ) : (
        <span className="text-xs text-[var(--color-muted)] inline-flex items-center gap-1">
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-muted)]"
          />
          In planning — ติดตามใน Updates
        </span>
      )}
    </>
  );

  const baseClasses = `group relative rounded-2xl p-5 sm:p-6 bg-gradient-to-br ${lab.accent} border ${lab.border} transition-all`;
  const linkClasses = `${baseClasses} hover:border-[var(--color-brand)] hover:shadow-lg hover:-translate-y-0.5 cursor-pointer`;
  const staticClasses = `${baseClasses} opacity-90`;

  if (isLinkable && lab.url) {
    return (
      <a
        href={lab.url}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClasses}
        aria-label={`${lab.name} — ${status.en}`}
      >
        {cardBody}
      </a>
    );
  }

  return (
    <div className={staticClasses} aria-label={`${lab.name} — ${status.en}`}>
      {cardBody}
    </div>
  );
}
