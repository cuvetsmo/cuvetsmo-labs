import Image from "next/image";
import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { PlotDecoration } from "@/components/PlotDecoration";
import { LABS, STATUS_LABEL, type Lab } from "@/lib/labs";

/**
 * labs.cuvetsmo.com — index page (editorial / Anthropic-research voice).
 *
 * Composition:
 *   1. Quiet header band — top-left brand mark + small nav anchor
 *   2. Headline section — left-aligned, narrow editorial column
 *   3. Labs list — restrained rows, each with an inline SVG plot decoration
 *   4. Footnote (about, contact) — narrow column, low chroma
 *
 * Reference voice: anthropic.com/research, observablehq.com.
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

/**
 * Per-lab plot signature.
 *
 * Hand-tuned tiny series so each lab has a distinct decoration.
 * `tone` switches the stroke color, keeping the cream surface coherent.
 */
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

export default function LabsIndexPage() {
  const liveCount = LABS.filter((l) => l.status === "live").length;
  const comingCount = LABS.filter((l) => l.status === "coming-soon").length;

  return (
    <>
      {/* ─── Quiet header band ─── */}
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
              href="#labs"
              className="text-[var(--color-muted)] hover:text-[var(--color-brand)] transition-colors"
            >
              Labs
            </a>
            <a
              href="#about"
              className="text-[var(--color-muted)] hover:text-[var(--color-brand)] transition-colors"
            >
              About
            </a>
            <a
              href="https://cuvetsmo.com"
              className="hidden sm:inline text-[var(--color-muted)] hover:text-[var(--color-brand)] transition-colors"
            >
              cuvetsmo.com
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* ─── Headline ─── */}
        <section className="max-w-5xl mx-auto px-6 sm:px-10 pt-20 sm:pt-28 pb-16 sm:pb-24">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-brand)] mb-6 animate-fade-up">
            CUVETSMO Labs
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl max-w-3xl font-semibold animate-fade-up">
            Experimental tools by Chula Vet students.
          </h1>
          <p
            className="mt-6 max-w-2xl text-[var(--color-muted)] text-lg leading-[1.75] animate-fade-up"
            style={{ animationDelay: "0.05s" }}
          >
            ที่ทดลองของนิสิตสัตวแพทย์ จุฬาฯ — เครื่องมือ, prototype, การเรียนรู้แบบใหม่
            ที่นิสิตสร้างขึ้นเองเพื่อแก้ปัญหาจริงในคลินิกและห้องเรียน.
          </p>

          <div
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[var(--color-muted)] animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="inline-flex items-center gap-2">
              <span className="status-dot status-dot--live" aria-hidden />
              {liveCount} live
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="status-dot status-dot--coming" aria-hidden />
              {comingCount} coming soon
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="status-dot status-dot--future" aria-hidden />
              {LABS.length} labs total
            </span>
          </div>
        </section>

        {/* ─── Labs list ─── */}
        <section
          id="labs"
          className="border-t border-[var(--color-border)] scroll-mt-20"
          aria-labelledby="labs-heading"
        >
          <div className="max-w-5xl mx-auto px-6 sm:px-10 py-20 sm:py-24">
            <div className="mb-12 flex items-baseline justify-between gap-6 flex-wrap">
              <h2
                id="labs-heading"
                className="text-2xl sm:text-3xl font-semibold"
              >
                The lab index
              </h2>
              <p className="text-sm text-[var(--color-muted)] max-w-md">
                Each lab has its own audience, stack, and subdomain. Click in to read what we are building and try the live tools.
              </p>
            </div>

            <ul className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
              {LABS.map((lab) => (
                <LabRow key={lab.slug} lab={lab} />
              ))}
            </ul>
          </div>
        </section>

        {/* ─── About / footnote ─── */}
        <section
          id="about"
          className="border-t border-[var(--color-border)] bg-[var(--color-surface-2)]/40 scroll-mt-20"
        >
          <div className="max-w-3xl mx-auto px-6 sm:px-10 py-20 sm:py-24">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-brand)] mb-6">
              About
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold mb-8">
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
      {/* index number */}
      <div className="col-span-12 sm:col-span-1 text-xs font-mono text-[var(--color-muted)] tabular-nums">
        {`0${LABS.findIndex((l) => l.slug === lab.slug) + 1}`}
      </div>

      {/* title + description */}
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

      {/* plot decoration */}
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

      {/* affordance */}
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
