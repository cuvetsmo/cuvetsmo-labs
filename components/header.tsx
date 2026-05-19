import Image from "next/image";
import Link from "next/link";

/**
 * Minimal header for the labs index — wordmark left, "All Labs" anchor right.
 * No mobile menu needed (single-page index).
 */
export function Header() {
  return (
    <header
      className="sticky top-0 z-40 bg-[var(--color-bg)]/85 backdrop-blur border-b border-[var(--color-border)]"
      role="banner"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0"
          aria-label="CUVETSMO Labs home"
        >
          <Image
            src="/labs-logo-mark.png"
            alt="CUVETSMO Labs"
            width={32}
            height={32}
            className="rounded"
            priority
          />
          <span className="font-semibold text-[15px] tracking-tight">
            <span className="hidden sm:inline">CUVETSMO Labs</span>
            <span className="sm:hidden">Labs</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-1">
          <a
            href="#labs"
            className="px-3 py-2 rounded-md text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-brand-light)] hover:text-[var(--color-brand)] transition-colors"
          >
            All Labs
          </a>
          <a
            href="#about"
            className="px-3 py-2 rounded-md text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-brand-light)] hover:text-[var(--color-brand)] transition-colors"
          >
            About
          </a>
          <a
            href="https://cuvetsmo.com"
            className="hidden sm:inline-flex px-3 py-2 rounded-md text-sm font-medium text-[var(--color-muted)] hover:bg-[var(--color-brand-light)] hover:text-[var(--color-brand)] transition-colors"
          >
            cuvetsmo.com
          </a>
        </nav>
      </div>
    </header>
  );
}
