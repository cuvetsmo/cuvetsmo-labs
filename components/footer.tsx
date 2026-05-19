import Image from "next/image";
import Link from "next/link";

/**
 * Footer for labs.cuvetsmo.com — subtle, cream-on-cream.
 *
 * Carries the shared "Powered by CUVETSMO Labs ↗" unit used across all
 * three subdomains (web3 / labs / imaging). On the labs subdomain itself
 * the link points back to its own root so the brand mark is reachable from
 * every page.
 */

const PROJECT_LINKS = [
  { href: "https://cuvetsmo.com", label: "cuvetsmo.com" },
  { href: "https://web3.cuvetsmo.com", label: "Web3 Lab" },
  { href: "https://imaging.cuvetsmo.com", label: "Imaging Lab" },
];

const COMMUNITY_LINKS = [
  { href: "https://github.com/cuvetsmo", label: "GitHub" },
  { href: "https://status.cuvetsmo.com", label: "Status" },
  { href: "https://instagram.com/cuvetsmo", label: "Instagram" },
];

const CONTACT_LINKS = [
  { href: "mailto:palm@cuvetsmo.com", label: "palm@cuvetsmo.com" },
  { href: "mailto:contact@cuvetsmo.com", label: "contact@cuvetsmo.com" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="relative mt-auto border-t border-[var(--color-border)] bg-[var(--color-bg)] overflow-hidden"
      role="contentinfo"
    >
      {/* Atom mark watermark — large, cream-on-cream, fades behind the
          content so the labs identity reads without shouting. */}
      <Image
        src="/labs-logo-mark.png"
        alt=""
        aria-hidden
        width={420}
        height={420}
        className="pointer-events-none select-none absolute -left-20 -bottom-20 opacity-[0.05]"
      />

      <div className="relative max-w-5xl mx-auto px-6 sm:px-10 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-10 gap-x-6">
          <div className="col-span-2 sm:col-span-1">
            <Link
              href="https://labs.cuvetsmo.com"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[var(--color-muted)] hover:text-[var(--color-brand)] transition-colors"
              aria-label="Powered by CUVETSMO Labs"
            >
              <Image
                src="/labs-logo-mark.png"
                alt="CUVETSMO Labs"
                width={18}
                height={18}
                className="rounded-[3px]"
              />
              Powered by CUVETSMO Labs
              <span aria-hidden className="text-xs">↗</span>
            </Link>
            <p className="mt-4 text-xs text-[var(--color-muted)] leading-[1.6] max-w-[18rem]">
              สโมสรนิสิตคณะสัตวแพทยศาสตร์ จุฬาฯ — student-led experimental tools and platforms.
            </p>
          </div>

          <FooterColumn title="Labs" links={PROJECT_LINKS} />
          <FooterColumn title="Community" links={COMMUNITY_LINKS} />
          <FooterColumn title="Contact" links={CONTACT_LINKS} />
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-[var(--color-muted)]">
          <p>Built by CUVETSMO</p>
          <p className="font-mono">© {year} CUVETSMO Labs</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[var(--color-text-strong)] mb-4">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => {
          const isMail = link.href.startsWith("mailto:");
          const isExternal = link.href.startsWith("http");
          return (
            <li key={link.href}>
              <a
                href={link.href}
                target={!isMail && isExternal ? "_blank" : undefined}
                rel={!isMail && isExternal ? "noopener noreferrer" : undefined}
                className="text-sm text-[var(--color-muted)] hover:text-[var(--color-brand)] transition-colors"
              >
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
