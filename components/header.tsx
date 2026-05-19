import Image from "next/image";
import Link from "next/link";

/**
 * Minimal header — used by secondary pages (e.g. not-found).
 * The home page renders its own inline header to control composition.
 */
export function Header() {
  return (
    <header
      className="border-b border-[var(--color-border)] bg-[var(--color-bg)]"
      role="banner"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-5 flex items-center justify-between gap-6">
        <Link
          href="/"
          className="flex items-center gap-3 shrink-0"
          aria-label="CUVETSMO Labs home"
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
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-6 text-sm">
          <a
            href="/#labs"
            className="text-[var(--color-muted)] hover:text-[var(--color-brand)] transition-colors"
          >
            Labs
          </a>
          <a
            href="/#about"
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
  );
}
