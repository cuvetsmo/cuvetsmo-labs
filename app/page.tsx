import Image from "next/image";
import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LabCard } from "@/components/lab-card";
import { LABS } from "@/lib/labs";

/**
 * labs.cuvetsmo.com — index page.
 *
 * Sections:
 *   1. Hero — wordmark, bilingual subtitle, single "Explore Labs" CTA
 *   2. Labs grid — 4 cards (Imaging, Web3, AI, Robotics)
 *   3. About — what is Labs, why subdomains, want to start a lab
 *   4. Footer
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

export default function LabsIndexPage() {
  const liveCount = LABS.filter((l) => l.status === "live").length;
  const comingCount = LABS.filter((l) => l.status === "coming-soon").length;

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* ─── Hero ─── */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 0%, rgba(3,105,161,0.18) 0%, rgba(3,105,161,0) 60%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-brand)]/40 to-transparent -z-10"
          />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-14 sm:pb-20">
            <div className="flex justify-center mb-6">
              <Image
                src="/smo-logo.png"
                alt="CUVETSMO"
                width={80}
                height={80}
                className="rounded-2xl shadow-sm ring-1 ring-black/5"
                priority
              />
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-center max-w-4xl mx-auto leading-[1.15] animate-fade-up">
              <span className="block">CUVETSMO</span>
              <span className="block gradient-text mt-1">Labs</span>
            </h1>

            <p
              className="mt-6 text-base sm:text-lg text-[var(--color-muted)] text-center max-w-2xl mx-auto leading-relaxed animate-fade-up"
              style={{ animationDelay: "0.05s" }}
            >
              ที่ทดลองของนิสิตสัตวแพทย์ จุฬาฯ
              <br className="hidden sm:block" />
              <span className="text-sm sm:text-base">
                เครื่องมือ, prototype, การเรียนรู้แบบใหม่
              </span>
            </p>

            <p
              className="mt-2 text-sm text-[var(--color-muted)] text-center max-w-2xl mx-auto italic animate-fade-up"
              style={{ animationDelay: "0.08s" }}
            >
              Experimental tools and platforms by Chula Vet students
            </p>

            <div
              className="mt-8 flex justify-center animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              <a href="#labs" className="btn-brand text-center">
                ลองดู Labs ทั้งหมด
              </a>
            </div>

            <p className="mt-10 text-xs sm:text-sm text-center text-[var(--color-muted)] flex flex-wrap justify-center items-center gap-x-3 gap-y-1">
              <span className="inline-flex items-center gap-1.5">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"
                />
                {liveCount} live
              </span>
              <span aria-hidden className="opacity-30">
                —
              </span>
              <span>{comingCount} coming soon</span>
              <span aria-hidden className="opacity-30">
                —
              </span>
              <span>{LABS.length} labs total</span>
            </p>
          </div>
        </section>

        {/* ─── Labs grid ─── */}
        <section
          id="labs"
          className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 scroll-mt-20"
        >
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold text-[var(--color-brand)] uppercase tracking-wider mb-2">
              All Labs
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              เลือก lab ที่อยากลอง
            </h2>
            <p className="mt-3 text-[var(--color-muted)] max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              แต่ละ lab มีกลุ่มเป้าหมายและ tech stack ของตัวเอง คลิกเข้าไปดูได้เลย
              <br className="hidden sm:block" />
              <span className="italic">
                Each lab has its own audience and stack. Click in to explore.
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {LABS.map((lab) => (
              <LabCard key={lab.slug} lab={lab} />
            ))}
          </div>
        </section>

        {/* ─── About ─── */}
        <section
          id="about"
          className="border-t border-[var(--color-border)] bg-[var(--color-card)] scroll-mt-20"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
            <div className="mb-10 text-center">
              <p className="text-xs font-semibold text-[var(--color-brand)] uppercase tracking-wider mb-2">
                About CUVETSMO Labs
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                ที่นี่คืออะไร
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="card">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-brand)] mb-2">
                  What is CUVETSMO Labs?
                </h3>
                <p className="text-sm text-[var(--color-text)] leading-relaxed mb-3">
                  Labs เป็น umbrella สำหรับโปรเจกต์ทดลองของนิสิตสัตวแพทย์ จุฬาฯ
                  — ทุก lab เป็น experiment ที่นิสิตสร้างขึ้นเพื่อแก้ปัญหา ทดลอง tech ใหม่ๆ หรือสร้างเครื่องมือเรียนรู้แบบใหม่
                </p>
                <p className="text-xs text-[var(--color-muted)] italic leading-relaxed">
                  Labs is an umbrella for experimental projects by Chula Vet students.
                  Each lab is built to solve a real problem, try new tech, or invent
                  new learning tools.
                </p>
              </div>

              <div className="card">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-brand)] mb-2">
                  Why subdomains?
                </h3>
                <p className="text-sm text-[var(--color-text)] leading-relaxed mb-3">
                  แต่ละ lab มีกลุ่มเป้าหมายและ tech stack ของตัวเอง
                  แยก subdomain ทำให้แต่ละทีมโตอิสระ ไม่ติดกัน ไม่ต้องรอกัน
                </p>
                <p className="text-xs text-[var(--color-muted)] italic leading-relaxed">
                  Each lab has its own audience and tech stack. Separate subdomains
                  let each team grow independently without blocking one another.
                </p>
              </div>

              <div className="card sm:col-span-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-brand)] mb-2">
                  อยากเริ่ม lab ของตัวเอง? — Want to start a lab?
                </h3>
                <p className="text-sm text-[var(--color-text)] leading-relaxed mb-3">
                  ถ้ามีไอเดียอยากทดลอง อยากสร้างเครื่องมือสำหรับชุมชนสัตวแพทย์
                  ติดต่อเราได้ทาง IG หรืออีเมล
                </p>
                <p className="text-xs text-[var(--color-muted)] italic leading-relaxed mb-4">
                  If you have an idea worth experimenting on, or a tool the vet
                  community needs, reach out via Instagram or email.
                </p>
                <div className="flex flex-wrap gap-3 text-sm">
                  <a
                    href="https://instagram.com/cuvetsmo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[var(--color-brand)] font-medium hover:underline"
                  >
                    @cuvetsmo
                    <span aria-hidden>→</span>
                  </a>
                  <span aria-hidden className="text-[var(--color-muted)] opacity-50">
                    —
                  </span>
                  <a
                    href="mailto:palm@cuvetsmo.com"
                    className="inline-flex items-center gap-1.5 text-[var(--color-brand)] font-medium hover:underline"
                  >
                    palm@cuvetsmo.com
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
