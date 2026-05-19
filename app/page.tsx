import Image from "next/image";
import type { Metadata } from "next";
import { EcosystemBar } from "@/components/ecosystem-bar";
import { Footer } from "@/components/footer";
import { PlotDecoration } from "@/components/PlotDecoration";
import { LABS, STATUS_LABEL, type Lab } from "@/lib/labs";

/**
 * labs.cuvetsmo.com — index page.
 *
 * Composition:
 *   1. Ecosystem bar — shared CUVETSMO mark + 4 site nav
 *   2. Brand header — top-left mark + page nav
 *   3. Hero — bold headline, atom mark on the right, stats row
 *   4. Live now section — featured cards for the 2 labs that are live
 *   5. Lab index — restrained rows for everything (web3, imaging, ai, robotics)
 *   6. About — narrow editorial column
 *
 * Voice: anthropic.com/research meets observablehq.com. Pushed the volume
 * up from "academic restraint" to "confident experimental" per Palms
 * 2026-05-20 directive ("เด่นและเจ๋งกว่านี้").
 */

export const metadata: Metadata = {
  title: {
    absolute: "CUVETSMO Labs — Experimental tools by Chula Vet students",
  },
  description:
    "ที่ทดลองของนิสิตสัตวแพทย์ จุฬาฯ — เครื่องมือ prototype การเรียนรู้แบบใหม่. Imaging, Web3, AI, Robotics labs ครบในที่เดียว.",
  openGraph: {
    url: "https://labs.cuvetsmo.com",
    title: "CUVETSMO Labs — Experimental tools by Chula Vet students",
    description:
      "Imaging, Web3, AI, Robotics — experimental tools and platforms by Chula Vet students.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "CUVETSMO Labs — Imaging, Web3, AI, Robotics",
      },
    ],
  },
};

const PLOT_SIGNATURES: Record<string, { data: number[]; tone: "warm" | "cool" | "bio" | "mute" }> = {
  imaging: { data: [4, 5, 7, 6, 9, 11, 10, 14, 12, 16], tone: "cool" },
  web3:    { data: [2, 6, 5, 10, 9, 14, 13, 18, 17, 22], tone: "bio" },
  ai:      { data: [8, 7, 9, 8, 12, 10, 15, 13, 18, 16], tone: "warm" },
  robotics:{ data: [3, 5, 4, 7, 6, 8, 7, 9, 8, 10], tone: "mute" },
};

const TONE_COLORS: Record<"warm" | "cool" | "bio" | "mute", { stroke: string; fill: string }> = {
  warm: { stroke: "#D97757", fill: "rgba(217, 119, 87, 0.12)" },
  cool: { stroke: "#6A9BCC", fill: "rgba(106, 155, 204, 0.12)" },
  bio:  { stroke: "#788C5D", fill: "rgba(120, 140, 93, 0.12)" },
  mute: { stroke: "#B0AEA5", fill: "rgba(176, 174, 165, 0.18)" },
};

// Featured cards reach for one of these mark images. Mirrors what each
// sub-brand ships on its own subdomain so visitors recognize the logo
// when they click through.
const FEATURED_MARKS: Record<string, string> = {
  web3: "/web3-logo-mark.png",
  imaging: "/imaging-logo-mark.png",
};

export default function LabsIndexPage() {
  const liveCount = LABS.filter((l) => l.status === "live").length;
  const comingCount = LABS.filter((l) => l.status === "coming-soon").length;
  const plannedCount = LABS.filter((l) => l.status === "planned" || l.status === "future").length;
  const liveLabs = LABS.filter((l) => l.status === "live");

  return (
    <>
      <EcosystemBar current="labs" />

      {/* ─── Brand header ─── */}
      <header className="border-b border-[var(--color-border)]" role="banner">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 py-5 flex items-center justify-between gap-6">
          <a
            href="/"
            aria-label="CUVETSMO Labs home"
            className="flex items-center gap-3 shrink-0"
          >
            <Image
              src="/labs-logo-mark.png"
              alt=""
              width={28}
              height={28}
              className="rounded-sm opacity-90"
              priority
            />
            <span className="text-sm tracking-tight text-[var(--color-text-strong)]">
              <span className="font-semibold">CUVETSMO</span>
              <span className="text-[var(--color-muted)]"> Labs</span>
            </span>
          </a>
          <nav aria-label="Primary" className="flex items-center gap-6 text-sm">
            <a
              href="#live"
              className="text-[var(--color-muted)] hover:text-[var(--color-brand)] transition-colors"
            >
              Live now
            </a>
            <a
              href="#labs"
              className="text-[var(--color-muted)] hover:text-[var(--color-brand)] transition-colors"
            >
              All labs
            </a>
            <a
              href="#about"
              className="text-[var(--color-muted)] hover:text-[var(--color-brand)] transition-colors"
            >
              About
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* ─── Hero ─── */}
        <section className="relative max-w-5xl mx-auto px-6 sm:px-10 pt-16 sm:pt-24 pb-20 sm:pb-28">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7 lg:col-span-8">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-brand)] mb-6 animate-fade-up font-semibold">
                CUVETSMO Labs
              </p>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] animate-fade-up text-[var(--color-text-strong)]">
                Built by{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">Chula Vet</span>
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 right-0 h-3 bg-[var(--color-brand)]/25 -z-0"
                  />
                </span>{" "}
                students.
              </h1>
              <p
                className="mt-8 max-w-2xl text-[var(--color-muted)] text-lg sm:text-xl leading-[1.65] animate-fade-up"
                style={{ animationDelay: "0.05s" }}
              >
                เครื่องมือทดลองที่นิสิตสร้างขึ้นเอง เพื่อแก้ปัญหาจริงในคลินิก ห้องเรียน
                และ web ของชุมชนสัตวแพทย์ จุฬาฯ.
              </p>

              <div
                className="mt-12 flex flex-wrap items-baseline gap-x-10 gap-y-4 animate-fade-up"
                style={{ animationDelay: "0.1s" }}
              >
                <Stat number={liveCount} label="live now" tone="bio" />
                <Stat number={comingCount + plannedCount} label="in development" tone="muted" />
                <Stat number={LABS.length} label="labs total" tone="brand" />
              </div>
            </div>

            <div className="md:col-span-5 lg:col-span-4 flex justify-center md:justify-end">
              <div className="relative">
                <Image
                  src="/labs-logo-mark.png"
                  alt=""
                  width={320}
                  height={320}
                  priority
                  className="relative z-10 drop-shadow-[0_18px_50px_rgba(217,119,87,0.18)]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 -m-8 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(217,119,87,0.18),transparent_72%)] -z-0"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ─── Live now — featured cards ─── */}
        <section
          id="live"
          className="border-t border-[var(--color-border)] bg-[var(--color-surface-2)]/40 scroll-mt-20"
        >
          <div className="max-w-5xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
            <div className="mb-10 flex items-end justify-between gap-6 flex-wrap">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-brand)] mb-3 font-semibold">
                  Live now
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text-strong)]">
                  Try them today.
                </h2>
              </div>
              <p className="text-sm text-[var(--color-muted)] max-w-sm">
                Both have their own subdomain and theme. Click a card to jump.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {liveLabs.map((lab) => (
                <FeaturedLab key={lab.slug} lab={lab} />
              ))}
            </div>
          </div>
        </section>

        {/* ─── All labs — restrained index ─── */}
        <section
          id="labs"
          className="border-t border-[var(--color-border)] scroll-mt-20"
          aria-labelledby="labs-heading"
        >
          <div className="max-w-5xl mx-auto px-6 sm:px-10 py-20 sm:py-24">
            <div className="mb-12 flex items-baseline justify-between gap-6 flex-wrap">
              <h2
                id="labs-heading"
                className="text-2xl sm:text-3xl font-semibold text-[var(--color-text-strong)]"
              >
                All labs
              </h2>
              <p className="text-sm text-[var(--color-muted)] max-w-md">
                Each lab has its own audience, stack, and subdomain. Live ones link out, planned ones preview what is coming.
              </p>
            </div>

            <ul className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
              {LABS.map((lab) => (
                <LabRow key={lab.slug} lab={lab} />
              ))}
            </ul>
          </div>
        </section>

        {/* ─── About ─── */}
        <section
          id="about"
          className="border-t border-[var(--color-border)] bg-[var(--color-surface-2)]/40 scroll-mt-20"
        >
          <div className="max-w-3xl mx-auto px-6 sm:px-10 py-20 sm:py-24">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-brand)] mb-6 font-semibold">
              About
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-[var(--color-text-strong)]">
              What CUVETSMO Labs is.
            </h2>
            <div className="space-y-6 text-[var(--color-text)] leading-[1.75] text-base">
              <p>
                Labs เป็น umbrella สำหรับโปรเจกต์ทดลองของนิสิตสัตวแพทย์ จุฬาฯ
                ทุก lab เป็น experiment ที่นิสิตสร้างขึ้นเพื่อแก้ปัญหา ทดลอง tech ใหม่
                หรือสร้างเครื่องมือเรียนรู้แบบใหม่.
              </p>
              <p className="text-[var(--color-muted)] italic">
                Labs is an umbrella for experimental projects by Chula Vet students. Each lab is built to solve a real problem, try new tech, or invent new learning tools.
              </p>
              <p>
                แต่ละ lab มีกลุ่มเป้าหมายและ tech stack ของตัวเอง การแยก subdomain
                ทำให้แต่ละทีมโตอิสระ ไม่ติดกัน ไม่ต้องรอกัน.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
              <h3 className="text-sm font-semibold mb-3 tracking-tight text-[var(--color-text-strong)]">
                Want to start a lab?
              </h3>
              <p className="text-[var(--color-text)] leading-[1.75] mb-2">
                ถ้ามีไอเดียอยากทดลอง อยากสร้างเครื่องมือสำหรับชุมชนสัตวแพทย์
                ติดต่อเราได้ทาง Instagram หรืออีเมล.
              </p>
              <p className="text-sm text-[var(--color-muted)] italic mb-6">
                If you have an idea worth experimenting on, or a tool the vet community needs, reach out via Instagram or email.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
                <a
                  href="https://instagram.com/cuvetsmo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[var(--color-brand)] font-medium hover:underline underline-offset-4"
                >
                  @cuvetsmo
                  <span aria-hidden>↗</span>
                </a>
                <a
                  href="mailto:palm@cuvetsmo.com"
                  className="inline-flex items-center gap-1.5 text-[var(--color-brand)] font-medium hover:underline underline-offset-4"
                >
                  palm@cuvetsmo.com
                  <span aria-hidden>↗</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Stat({ number, label, tone }: { number: number; label: string; tone: "bio" | "muted" | "brand" }) {
  const numberClass = (() => {
    switch (tone) {
      case "bio": return "text-[var(--color-accent-bio)]";
      case "brand": return "text-[var(--color-brand)]";
      default: return "text-[var(--color-text-strong)]";
    }
  })();
  return (
    <div>
      <div className={`text-4xl sm:text-5xl font-bold tabular-nums tracking-tight ${numberClass}`}>
        {number}
      </div>
      <div className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
        {label}
      </div>
    </div>
  );
}

/**
 * FeaturedLab — bigger card for labs in the "Live now" row. Shows the
 * sub-brand mark prominently plus the EN description as a teaser. Hover
 * lifts subtly to signal clickability.
 */
function FeaturedLab({ lab }: { lab: Lab }) {
  const mark = FEATURED_MARKS[lab.slug];
  const url = lab.url ?? "#";
  return (
    <a
      href={url}
      target={lab.url ? "_blank" : undefined}
      rel={lab.url ? "noopener noreferrer" : undefined}
      className="group block bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg p-7 transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgba(217,119,87,0.18)] hover:border-[var(--color-brand)]/40"
    >
      <div className="flex items-start gap-5">
        {mark ? (
          <Image
            src={mark}
            alt=""
            width={64}
            height={64}
            className="rounded-md shrink-0"
          />
        ) : (
          <span className="text-4xl shrink-0" aria-hidden>
            {lab.icon}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="status-dot status-dot--live" aria-hidden />
            <span className="text-xs uppercase tracking-[0.16em] text-[var(--color-accent-bio)] font-semibold">
              Live
            </span>
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-[var(--color-text-strong)] mb-2">
            {lab.name}
          </h3>
          <p className="text-sm text-[var(--color-text)] leading-[1.65] line-clamp-3">
            {lab.descEn}
          </p>
          <div className="mt-5 flex items-center gap-2 text-sm font-medium text-[var(--color-brand)]">
            <span>{new URL(url, "https://labs.cuvetsmo.com").hostname}</span>
            <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">
              ↗
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

/**
 * One lab row in the index list — wordmark left, description middle, plot
 * decoration right. Live/coming-soon rows are clickable; planned/future stay
 * static with a quieter affordance.
 */
function LabRow({ lab }: { lab: Lab }) {
  const status = STATUS_LABEL[lab.status];
  const signature = PLOT_SIGNATURES[lab.slug] ?? { data: [3, 5, 4, 6, 7, 9], tone: "mute" };
  const colors = TONE_COLORS[signature.tone];
  const isLinkable = lab.url !== null;
  const isLive = lab.status === "live";

  const dotClass = (() => {
    switch (lab.status) {
      case "live": return "status-dot status-dot--live";
      case "coming-soon": return "status-dot status-dot--coming";
      case "planned": return "status-dot status-dot--planned";
      case "future":
      default: return "status-dot status-dot--future";
    }
  })();

  const body = (
    <div className="grid grid-cols-12 gap-4 sm:gap-6 items-center py-7 sm:py-8">
      <div className="col-span-12 sm:col-span-1 text-xs font-mono text-[var(--color-muted)] tabular-nums">
        {`0${LABS.findIndex((l) => l.slug === lab.slug) + 1}`}
      </div>

      <div className="col-span-12 sm:col-span-7">
        <div className="flex items-center gap-3 mb-1.5">
          <span className={dotClass} aria-hidden />
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[var(--color-text-strong)]">
            {lab.name}
          </h3>
          <span className="text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]">
            {status.en}
          </span>
        </div>
        <p className="text-[15px] text-[var(--color-text)] leading-[1.6] max-w-xl">
          {lab.descTh}
        </p>
        <p className="mt-1 text-[13px] text-[var(--color-muted)] italic leading-[1.6] max-w-xl">
          {lab.descEn}
        </p>
        <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-[var(--color-muted)]">
          <div className="inline-flex gap-1.5">
            <dt className="font-semibold">Audience</dt>
            <dd>{lab.audience}</dd>
          </div>
          <div className="inline-flex gap-1.5">
            <dt className="font-semibold">Tech</dt>
            <dd className="font-mono text-[11px]">{lab.tech}</dd>
          </div>
        </dl>
      </div>

      <div className="col-span-9 sm:col-span-3 flex items-center justify-start sm:justify-end">
        <PlotDecoration
          data={signature.data}
          stroke={colors.stroke}
          fill={colors.fill}
          width={160}
          height={56}
          label={`${lab.name} signature plot`}
        />
      </div>

      <div className="col-span-3 sm:col-span-1 text-right">
        {isLinkable ? (
          <span
            aria-hidden
            className="text-[var(--color-brand)] text-lg inline-block transition-transform group-hover:translate-x-1"
          >
            ↗
          </span>
        ) : (
          <span className="text-[var(--color-muted)] text-xs">—</span>
        )}
      </div>
    </div>
  );

  if (isLinkable && lab.url) {
    return (
      <li>
        <a
          href={lab.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group block hover:bg-[var(--color-surface-2)]/50 transition-colors px-2 -mx-2 rounded-sm"
          aria-label={`${lab.name} — ${status.en}${isLive ? " — visit" : " — preview"}`}
        >
          {body}
        </a>
      </li>
    );
  }

  return (
    <li className="px-2 -mx-2 opacity-90" aria-label={`${lab.name} — ${status.en}`}>
      {body}
    </li>
  );
}
