import Link from "next/link";

/**
 * Site footer for labs.cuvetsmo.com — slim, shared brand vibe with
 * cuvetsmo.com / web3.cuvetsmo.com.
 */

const PROJECT_LINKS = [
  { href: "https://cuvetsmo.com", label: "cuvetsmo.com (main)", external: true },
  { href: "https://web3.cuvetsmo.com", label: "Web3 Lab", external: true },
  { href: "https://imaging.cuvetsmo.com", label: "Imaging Lab", external: true },
];

const COMMUNITY_LINKS = [
  { href: "https://github.com/cuvetsmo", label: "GitHub", external: true },
  { href: "https://status.cuvetsmo.com", label: "Status", external: true },
  { href: "https://instagram.com/cuvetsmo", label: "Instagram", external: true },
];

const CONTACT_LINKS = [
  { href: "mailto:palm@cuvetsmo.com", label: "palm@cuvetsmo.com", external: true },
  { href: "mailto:contact@cuvetsmo.com", label: "contact@cuvetsmo.com", external: true },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-card)]"
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <FooterColumn title="Labs" links={PROJECT_LINKS} />
          <FooterColumn title="Community" links={COMMUNITY_LINKS} />
          <FooterColumn title="Contact" links={CONTACT_LINKS} />
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-[var(--color-muted)]">
          <p className="leading-relaxed">
            Built by CUVETSMO — สโมสรนิสิตคณะสัตวแพทยศาสตร์ จุฬาฯ
          </p>
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
  links: { href: string; label: string; external?: boolean }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold mb-3">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            {link.external ? (
              <a
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="text-sm text-[var(--color-muted)] hover:text-[var(--color-brand)] transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                className="text-sm text-[var(--color-muted)] hover:text-[var(--color-brand)] transition-colors"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
