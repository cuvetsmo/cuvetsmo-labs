/**
 * Lab registry — single source of truth for the labs grid.
 *
 * When a new lab launches:
 *   1. Add an entry here.
 *   2. Bump sitemap.ts if there's an on-domain landing page.
 *   3. Update OG image (public/og.png).
 */

export type LabStatus = "live" | "coming-soon" | "planned" | "future";

export type Lab = {
  slug: string;
  name: string;
  icon: string;
  status: LabStatus;
  url: string | null;
  descTh: string;
  descEn: string;
  audience: string;
  tech: string;
  accent: string;
  border: string;
  /**
   * GitHub repo path like `"cuvetsmo/cuvetsmo-imaging"` — used by `lib/github.ts`
   * to fetch live commit activity. `null` for labs that haven't materialized
   * into a repo yet (AI, Robotics).
   */
  githubRepo: string | null;
};

/**
 * One-line "what we're working on this week" pin shown above the All labs
 * section. Palm edits this directly; intentionally NOT in a CMS — friction is
 * a feature (forces real updates, not auto-generated noise).
 *
 * Convention: present tense, concrete, naming the lab. Empty string hides
 * the pin entirely.
 */
export const CURRENT_FOCUS = "AI Lab — ai.cuvetsmo.com is live (Thai chatbot, free, no login). Next: Norberg/CHD vet-diagnosis specialist agent on top of it.";

export const LABS: Lab[] = [
  {
    slug: "imaging",
    name: "Imaging Lab",
    icon: "🩻",
    status: "live",
    url: "https://imaging.cuvetsmo.com",
    descTh:
      "DICOM viewer ในเบราว์เซอร์ พร้อม overlay วัด Norberg angle (hip dysplasia) และ Vertebral Heart Score, บวก image occlusion สำหรับท่อง anatomy",
    descEn:
      "Browser-based DICOM viewer with Norberg angle (hip dysplasia) overlay, Vertebral Heart Score, and image-occlusion learning",
    audience: "นิสิตคลินิก Y4-Y6",
    tech: "DICOM, AI overlays",
    accent: "from-sky-500/10 to-sky-700/10",
    border: "border-sky-700/20",
    githubRepo: "cuvetsmo/cuvetsmo-imaging",
  },
  {
    slug: "web3",
    name: "Web3 Lab",
    icon: "⛓️",
    status: "live",
    url: "https://web3.cuvetsmo.com",
    descTh:
      "เรียน web3 ทดลอง mint NFT/SBT สร้าง token, DAO no-code — 4 pillars: Learn, Play, Build, The Lab",
    descEn:
      "Web3 playground — Learn, Play, Build, The Lab. Mint NFTs, create tokens, no-code DApps.",
    audience: "นักศึกษาทุก year, tech curious",
    tech: "Base Sepolia, Privy, EAS",
    accent: "from-emerald-500/10 to-emerald-700/10",
    border: "border-emerald-700/20",
    githubRepo: "cuvetsmo/cuvetsmo-web3",
  },
  {
    slug: "ai",
    name: "AI Lab",
    icon: "🤖",
    status: "live",
    url: "https://ai.cuvetsmo.com",
    descTh:
      "AI ภาษาไทยฟรี ไม่ต้อง login ไม่เก็บข้อความ ค้นงานวิจัย veterinary 250 ล้านบทความ ค้นเว็บข่าวสารใหม่ สร้างภาพประกอบได้ มีอ้างอิงทุกคำตอบ",
    descEn:
      "Free Thai AI chatbot — no login, no message storage. Search 250M veterinary research papers, query news from the web, generate illustrations. Every answer cites sources.",
    audience: "นักศึกษาทุก year + บุคลากร",
    tech: "LLM, RAG, OpenAlex, image gen",
    accent: "from-amber-500/10 to-amber-700/10",
    border: "border-amber-700/20",
    githubRepo: null,
  },
  {
    slug: "robotics",
    name: "Robotics Lab",
    icon: "🦾",
    status: "future",
    url: null,
    descTh:
      "robot ช่วยเหลือในคลินิก, animal feeding automation",
    descEn:
      "Clinical robotics, animal-feeding automation",
    audience: "Engineering collab",
    tech: "TBD",
    accent: "from-purple-500/10 to-purple-700/10",
    border: "border-purple-700/20",
    githubRepo: null,
  },
];

export const STATUS_LABEL: Record<LabStatus, { th: string; en: string; tone: string }> = {
  live: {
    th: "ใช้งานได้แล้ว",
    en: "Live",
    tone: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 ring-emerald-500/30",
  },
  "coming-soon": {
    th: "เปิดเร็วๆ นี้",
    en: "Coming Soon",
    tone: "bg-sky-500/15 text-sky-700 dark:text-sky-300 ring-sky-500/30",
  },
  planned: {
    th: "วางแผนปี 2026",
    en: "Planned 2026",
    tone: "bg-amber-500/15 text-amber-700 dark:text-amber-300 ring-amber-500/30",
  },
  future: {
    th: "อนาคต",
    en: "Future",
    tone: "bg-stone-500/15 text-stone-700 dark:text-stone-300 ring-stone-500/30",
  },
};
