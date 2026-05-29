# CLAUDE.md — cuvetsmo-labs

## 🧭 Ecosystem role (canonical · locked 2026-05-29)
- **Role:** Umbrella index/directory site that lists all CUVETSMO experimental labs (imaging, web3, ai, robotics) from the `lib/labs.ts` registry — a static launcher/hub, NOT itself a lab.
- **Layer:** Labs
- **Live:** https://labs.cuvetsmo.com
- **This repo OWNS (do not rebuild elsewhere):** The labs registry (`lib/labs.ts` — single source of truth for the labs grid: slug, status, URL, audience, tech, accent, githubRepo), the labs index/landing UI, the cross-lab ecosystem bar, and `lib/github.ts` live commit-activity fetch per lab. No individual lab tool lives here — each lab is its own repo/subdomain.

### ⛔ No-duplication rule
Before building anything new in this repo, check `cuvetsmo-docs/NO_DUPLICATION.md`. Do NOT rebuild: knowledge backend (→ cuvetsmo-source), MCP/tool access (→ cuvetsmo-mcp), AI inference (→ shared ai-chat edge fn in webcuvetsmo), forms/approval workflow (→ webcuvetsmo), exam engine (→ vet-mock), DICOM viewer (→ cuvetsmo-imaging) — unless THIS repo is the canonical owner above.

### Rule for any new repo/subdomain
Must declare: (1) canonical source repo, (2) whether it is data / protocol / UI / workflow / product. If you cannot answer both, do not create it.
