export type TermLine = ["cmd" | "out", string];

export const TERMINAL_SNIPPETS: Record<string, TermLine[]> = {
  "001": [
    ["cmd", '$ curl -X POST /api/query -d \'{"query":"how does RBAC work?"}\''],
    ["out", "→ grounded answer · page 12 · citations [12, 14]"],
    ["cmd", "$ curl /api/stats"],
    ["out", "→ tenants 3 · docs indexed 42 · latency 1.4s"],
  ],
  "002": [
    ["cmd", '$ curl -N /api/search -d \'{"query":"langgraph vs langchain"}\''],
    ["out", "data: arxiv.org → 200"],
    ["out", "data: stream open · sse chunk 1/6"],
    ["out", "data: citation #3 attached"],
  ],
  "003": [
    ["cmd", "$ socket.io client"],
    ["out", "connected :: id 9f2c · room prod-ide"],
    ["cmd", "$ container boot webcontainers"],
    ["out", "→ sandbox ready · memory 128mb"],
  ],
  "004": [
    ["cmd", "$ docker compose up -d"],
    ["out", "✔ api → jwt issued · tenant=acme"],
    ["out", "✔ mongo → replica up · auth enabled"],
    ["out", "→ rbac:admin /api/tenants 200"],
  ],
  "005": [
    ["cmd", "$ claude --watch"],
    ["out", "→ trimmed boilerplate across 12 files"],
    ["out", "→ tokens 14,208 vs 22,940 baseline"],
  ],
  "006": [
    ["cmd", "$ node editor.js portrait.png"],
    ["out", "canvas 1200×800 · preset cinematic"],
    ["out", "✓ noise reduced · output webp 214kb"],
  ],
  _fallback: [
    ["cmd", "$ git checkout main"],
    ["out", "→ already on main"],
  ],
};

export function linesFor(term: string): TermLine[] {
  return TERMINAL_SNIPPETS[term] ?? TERMINAL_SNIPPETS._fallback;
}