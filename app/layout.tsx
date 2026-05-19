import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai } from "next/font/google";
import "./globals.css";

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  variable: "--font-ibm-plex-sans-thai",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://labs.cuvetsmo.com"),
  title: {
    default: "CUVETSMO Labs — Experimental tools by Chula Vet students",
    template: "%s — CUVETSMO Labs",
  },
  description:
    "ที่ทดลองของนิสิตสัตวแพทย์ จุฬาฯ — เครื่องมือ prototype การเรียนรู้แบบใหม่. Imaging, Web3, AI, Robotics labs in one place.",
  applicationName: "CUVETSMO Labs",
  keywords: [
    "cuvetsmo",
    "cuvetsmo labs",
    "chulalongkorn",
    "veterinary",
    "vet tech",
    "imaging lab",
    "web3 lab",
    "ai lab",
    "robotics lab",
    "thai vet students",
    "experimental tools",
  ],
  authors: [{ name: "CUVETSMO Labs" }],
  creator: "CUVETSMO",
  publisher: "CUVETSMO",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "CUVETSMO Labs — Experimental tools by Chula Vet students",
    description:
      "Imaging, Web3, AI, Robotics — experimental tools and platforms by Chula Vet students.",
    type: "website",
    locale: "th_TH",
    alternateLocale: ["en_US"],
    siteName: "CUVETSMO Labs",
    url: "https://labs.cuvetsmo.com",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "CUVETSMO Labs — Imaging, Web3, AI, Robotics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CUVETSMO Labs — Experimental tools by Chula Vet students",
    description:
      "Imaging, Web3, AI, Robotics — experimental tools and platforms by Chula Vet students.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://labs.cuvetsmo.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${ibmPlexSansThai.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
