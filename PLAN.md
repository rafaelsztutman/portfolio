# Portfolio Implementation Plan

> **Living document.** This is the source of truth for the design and build of
> the portfolio. Update it as decisions evolve. Anyone (including a future
> Claude session with a fresh context window) should be able to pick up the
> work by reading this doc.

---

## 1. Overview

A personal portfolio site for Rafael Oliveira showcasing 3–10 AI/PM projects,
plus a writing section that links out to external posts (Substack, Medium,
etc.). Built as a single Next.js 16 app, deployed to Vercel Hobby tier,
source-available on GitHub under MIT.

**Primary audience:** recruiters, hiring managers, collaborators evaluating
Rafael's work. Visitors stay 60–120 seconds, scan, and leave with an
impression.

**Stance:** primarily Rafael's site, open-sourced honestly. Not a generic
template. README explains design decisions so a forker knows what they're
getting; no template config layer, no CONTRIBUTING.md, no deploy button.

---

## 2. Architecture at a glance

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind v4 + shadcn/ui (Radix primitives)
- **Theme:** Light + dark with `next-themes` toggle. No system-only mode by default.
- **Content pipeline:** Velite — typed content collections, build-time compile.
- **Content:**
  - `content/projects/*.mdx` — full MDX bodies with frontmatter
  - `content/writing/*.mdx` — frontmatter-only link cards
- **Hosting:** Vercel Hobby
- **Analytics:** Vercel Web Analytics (`@vercel/analytics`)
- **Fonts:** Geist Sans + Geist Mono via `next/font`
- **Code highlighting:** `rehype-pretty-code` with `github-dark` + `github-light` themes
- **Icons:**
  - **Lucide** (shadcn default) for UI icons
  - **simple-icons** (via `react-icons/si` or inline SVG) for brand glyphs on tech-stack and platform chips
  - **No emojis as icons anywhere**

### Routes

| Route | Type | Source |
|---|---|---|
| `/` | Static | Homepage with project grid + brief intro |
| `/projects/[slug]` | Static (SSG) | MDX-rendered project detail |
| `/writing` | Static | List of writing entries (link cards) |
| `/about` | Static | React component, hand-written JSX |
| `/sitemap.xml` | Generated | Next file convention |
| `/robots.txt` | Generated | Next file convention |
| 404 | Static | Custom minimal page |

No `/writing/[slug]` route in v1 — writing cards link directly to the external URL.
No admin routes in v1.

---

## 3. Locked design decisions

| # | Decision | Choice | Rationale |
|---|---|---|---|
| 1 | Positioning | Primarily Rafael's, open-sourced honestly | Avoids template-config bloat; dogfooded |
| 2 | Admin UI | None in v1 | Editor + git push is fine for 3–10 projects/year |
| 3 | Project page layout | Hybrid: frontmatter for Hero+Stack, body MDX with H2 conventions | MDX value preserved; consistent chrome |
| 4 | Drafts | Filtered by `VERCEL_ENV !== 'production'` | Visible in dev + Vercel previews; share via branch |
| 5 | Hero images | Convention `/public/projects/<slug>/hero.<ext>` | No external CDN risk; no remotePatterns config |
| 6 | OG images | Per-project = hero image; site-wide `/public/og-default.png` | Free, per-page previews; dynamic OG deferred |
| 7 | `/about` | React component, not MDX | One page, rarely changed, no MDX value |
| 8 | Homepage order | Featured first (manual `order`), then date desc | Lead with best work, not most recent |
| 9 | OSS scope | MIT, honest README, no CONTRIBUTING / deploy button | Source-available, not a template |
| 10 | Content pipeline | Velite | Two collections justifies the abstraction |
| 11 | Analytics | Vercel Web Analytics | Free, zero-config, privacy-friendly |
| 12 | Theme | Light + dark with toggle | Recruiter audience uses both modes |
| 13 | Project card | Hero thumb + title + summary + tech chips | No date displayed (avoids aging work) |
| 14 | Writing entry | Frontmatter-only link cards, no detail route | External post is canonical |

---

## 4. Frontmatter schemas

### Project (`content/projects/<slug>.mdx`)

```yaml
---
title: "Project Title"
slug: "project-slug"             # must match filename
summary: "One-line description shown on cards and hero."
tech_stack:                       # array of canonical strings (used to look up icons)
  - "Next.js"
  - "OpenAI"
  - "Vercel"
demo_url: "https://..."           # optional
github_url: "https://github.com/..." # optional
date: "2026-04-15"                # ISO date; used for ordering only, never displayed
status: "published"               # "draft" | "published"
featured: true                    # optional, default false
order: 1                          # optional, default 999; controls order among featured
---
```

Notes:
- `hero_image` is **not** in frontmatter — the layout looks up
  `/public/projects/<slug>/hero.<ext>` by convention (try png, jpg, webp).
- Body MDX is freeform but conventionally uses these H2s, in order:
  - `## What it does`
  - `## Why I built it`
  - `## How it works`
  - `## What I learned`
- `## Stack` is rendered by the layout from `tech_stack` — do not write it in the body.
- The `pnpm new-project` script scaffolds a skeleton with these H2s pre-written.

### Writing (`content/writing/<slug>.mdx`)

```yaml
---
title: "Post Title"
slug: "post-slug"
summary: "One-line blurb shown on the card."
external_url: "https://substack.com/..."
platform: "Substack"              # "Substack" | "Medium" | other (used for chip + icon lookup)
date: "2026-04-10"                # ISO date; used for ordering, not displayed
status: "published"               # "draft" | "published"
---
```

Body is empty by default. Future v2 may add an optional commentary section
with a detail route.

Hero image convention: `/public/writing/<slug>/hero.<ext>` (downloaded copy
of the external post's social card).

### Validation

Both schemas live in Velite config (`velite.config.ts`) using Zod. A bad
frontmatter field fails the build loudly — there is no silent fallback.

---

## 5. Visual direction

Reference set: **Anthropic, Vercel, Linear, claude.ai, v0.dev, Perplexity, Cursor.**

### Palette
- **Dark mode:** near-black background (not pure black), warm or cool muted accents.
- **Light mode:** off-white / cream background (not pure white), darker neutrals for text.
- No bright primary colors as backgrounds. Single subtle accent for interactive states.

### Layout
- Generous whitespace, large hero typography, editorial feel.
- Soft thin borders (`border-border/50`), subtle card backgrounds (`bg-background/40`).
- No heavy drop shadows. Cards feel like surfaces, not boxes.
- Project detail pages: prose-width body, restrained chrome, monospace for tech-stack chips.

### Typography
- **Sans:** Geist Sans for everything default.
- **Mono:** Geist Mono used as accent — metadata, status pills, code blocks, tech chip labels.
- Monospace is deployed sparingly and intentionally; never for body prose.

### Texture / signature
- One subtle visual signature in the hero — choose one:
  - Soft radial gradient backdrop
  - Faint grain/noise SVG overlay
  - Single restrained gradient line under hero text
- Used once or twice on the site, not on every section.

### Animation
- Restrained. `framer-motion` used only where it adds polish (hover lifts, fade-ins).
- No carousels, parallax, scroll-jacking, or auto-playing animations.
- Skip `framer-motion` entirely if it adds noticeable bundle weight without payoff.

### Console / status detail
- A single small "console-y" detail somewhere — e.g., a status dot next to the
  platform chip on writing cards, or a discreet monospace metadata line on
  project detail pages. Signals technical taste without noise.

---

## 6. Iconography rules

| Use case | Library |
|---|---|
| UI: nav, theme toggle, external link, chevrons, search, copy, GitHub icon | **Lucide** (shadcn default) |
| Brand glyphs: tech-stack chips (Next.js, OpenAI, Anthropic, etc.), platform chips (Substack, Medium) | **simple-icons** via `react-icons/si` or inline SVG |
| Anywhere | **No emojis as icons.** None. |

A tech chip renders as `[icon] Next.js`, not `Next.js` alone and not `⚡ Next.js`.

A `tech-stack-icons.ts` map maps canonical stack labels to a `simple-icons`
component. Unknown stacks fall back to a generic placeholder icon (still
Lucide, never an emoji).

Final pre-launch step: emoji audit pass over the entire codebase to catch
any emoji that slipped into 404, empty states, or copy.

---

## 7. File / folder layout

```
portfolio/
├── PLAN.md                          # this doc
├── README.md                        # public OSS README
├── LICENSE                          # MIT
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts               # (or v4 CSS-first config)
├── velite.config.ts
├── postcss.config.js
├── components.json                  # shadcn config
├── .env.example                     # documents required env vars (none in v1 beyond Vercel-provided)
├── .gitignore
│
├── app/
│   ├── layout.tsx                   # root layout: theme provider, fonts, analytics
│   ├── page.tsx                     # homepage
│   ├── about/
│   │   └── page.tsx                 # hand-written JSX
│   ├── projects/
│   │   └── [slug]/
│   │       └── page.tsx             # MDX rendering + layout chrome
│   ├── writing/
│   │   └── page.tsx                 # writing list (link cards)
│   ├── not-found.tsx                # 404
│   ├── sitemap.ts
│   ├── robots.ts
│   └── globals.css
│
├── components/
│   ├── ui/                          # shadcn primitives
│   ├── theme-provider.tsx
│   ├── theme-toggle.tsx
│   ├── nav.tsx
│   ├── footer.tsx
│   ├── project-card.tsx
│   ├── writing-card.tsx
│   ├── tech-chip.tsx
│   ├── platform-chip.tsx
│   ├── hero.tsx                     # project detail hero
│   └── mdx-components.tsx           # MDX prose components (Image, Code, etc.)
│
├── content/
│   ├── projects/
│   │   └── <slug>.mdx
│   └── writing/
│       └── <slug>.mdx
│
├── public/
│   ├── og-default.png
│   ├── projects/
│   │   └── <slug>/
│   │       └── hero.<ext>
│   └── writing/
│       └── <slug>/
│           └── hero.<ext>
│
├── lib/
│   ├── content.ts                   # velite-derived sort/filter helpers
│   ├── tech-stack-icons.ts          # canonical stack -> simple-icons map
│   └── og.ts                        # generateMetadata helpers
│
├── scripts/
│   └── new-project.ts               # `pnpm new-project` scaffolder
│
└── .velite/                         # generated, gitignored
```

---

## 8. Implementation phases

Each phase has a clear "definition of done." Don't skip phases — they're ordered to surface design issues early.

### Phase 0: Repo & infra setup
- [ ] `pnpm create next-app@latest portfolio` (TS, Tailwind, App Router, ESLint, no `src/`)
- [ ] `git init` (already initialized by create-next-app)
- [ ] Create empty GitHub repo (decide: `gh repo create` or web)
- [ ] `git remote add origin <url>` and push initial commit
- [ ] Connect Vercel project to repo (Vercel auto-detects Next 16)
- [ ] Confirm preview deploy works on a draft branch

**DoD:** Push to `main` deploys to production; push to a branch deploys to preview.

### Phase 1: Foundation
- [ ] Tailwind v4 configured (CSS-first config in `app/globals.css`)
- [ ] shadcn/ui initialized (`pnpm dlx shadcn@latest init`) — components.json present
- [ ] Add core shadcn primitives: `button`, `badge`, `card`, `tooltip`, `separator`
- [ ] Install `next-themes` + add `<ThemeProvider>` to root layout
- [ ] Add theme toggle component (shadcn copy-paste)
- [ ] Geist Sans + Geist Mono via `next/font`
- [ ] Base layout: nav (Home / Projects / Writing / About / theme toggle), footer
- [ ] Global styles: typography defaults, prose width, color tokens for both modes
- [ ] Install `@vercel/analytics` and add `<Analytics />` in root layout

**DoD:** Site renders an empty homepage in both light and dark modes with toggle working; nav present; deploys cleanly.

### Phase 2: Content pipeline (Velite)
- [ ] Install `velite` and configure `velite.config.ts` with two collections (`projects`, `writing`)
- [ ] Define Zod schemas matching frontmatter spec in §4
- [ ] Hook into Next: `next.config.ts` Velite integration (or `pnpm velite` build step)
- [ ] Create one example project in `content/projects/` with hero image
- [ ] Create one example writing entry in `content/writing/`
- [ ] Add `lib/content.ts` with sort/filter helpers (drafts gated by `VERCEL_ENV`)

**DoD:** `pnpm dev` shows typed content available in code; bad frontmatter fails the build.

### Phase 3: Public surface — projects
- [ ] Homepage (`app/page.tsx`): brief intro + project grid using `ProjectCard`
  - Featured-first sort, then date desc
  - Cards: hero thumb + title + summary + tech chips, no date
- [ ] Project detail page (`app/projects/[slug]/page.tsx`):
  - Hero from frontmatter + hero image
  - MDX body rendering with `mdx-components.tsx` styling
  - Stack chip rail rendered from `tech_stack`
  - Demo + GitHub CTA buttons
  - `generateStaticParams` from velite output
  - `generateMetadata` for OG image = hero
- [ ] `tech-stack-icons.ts` map with ~15 likely entries (Next.js, OpenAI, Anthropic, Vercel, Python, FastAPI, LangChain, Pydantic, Tailwind, TypeScript, etc.)
- [ ] `<TechChip>` component using simple-icons + Lucide fallback

**DoD:** Homepage shows the example project; detail page renders the MDX with consistent layout; OG card preview shows hero image.

### Phase 4: Public surface — writing
- [ ] `/writing` page listing entries with `WritingCard`
  - Card: hero thumb + title + summary + platform chip + outbound icon
  - Card is a single anchor pointing to `external_url`, `target="_blank"`, `rel="noopener noreferrer"`
- [ ] Sort: date desc
- [ ] Empty state when no writing entries (no emoji)

**DoD:** `/writing` lists the example writing entry; clicking the card opens the external URL in a new tab.

### Phase 5: About page
- [ ] `app/about/page.tsx` hand-written JSX
  - Photo (in `/public/about/avatar.<ext>`)
  - Bio (2–4 short paragraphs)
  - 4–6 social/professional links (LinkedIn, GitHub, X/Bluesky, email — Lucide icons)
  - Optional "Currently" section (1–3 bullets)

**DoD:** `/about` renders, looks good in both themes, no emojis, all links work.

### Phase 6: Polish
- [ ] `rehype-pretty-code` in MDX pipeline with `github-dark` + `github-light`
- [ ] Custom 404 (`app/not-found.tsx`) — minimal, on-brand, no emojis
- [ ] `app/sitemap.ts` and `app/robots.ts`
- [ ] Footer: year + name + repo link (Lucide GitHub icon)
- [ ] One subtle hero signature (gradient backdrop OR grain texture) — choose during build, do not skip
- [ ] Sparingly applied hover/entrance animations (decide after first pass: framer-motion or CSS-only)
- [ ] **Emoji audit pass** — grep codebase for any stray emoji
- [ ] Lighthouse pass: Performance, Accessibility, Best Practices, SEO ≥ 95

**DoD:** Site looks finished at human-scrutiny level; lighthouse green; no emojis anywhere.

### Phase 7: Authoring DX & docs
- [ ] `scripts/new-project.ts` scaffolder — prompts for title/slug/summary, writes MDX skeleton with H2s and a placeholder hero file path
- [ ] `package.json` script: `"new-project": "tsx scripts/new-project.ts"`
- [ ] README:
  - One screenshot (light + dark)
  - "What this is" — 2 paragraphs (audience, design choices)
  - "Local dev" — 3 commands
  - "Adding a project" — 4 steps
  - "Adding a writing entry" — 3 steps
  - "Deploying" — 1 paragraph (Vercel)
  - License (MIT)
- [ ] `LICENSE` file

**DoD:** A stranger could clone the repo and add a project without asking questions.

### Phase 8: Production deploy
- [ ] Push `main`; confirm production deploy is green
- [ ] Verify analytics is recording
- [ ] Verify OG cards render correctly (test with [opengraph.dev](https://www.opengraph.dev))
- [ ] Verify sitemap.xml and robots.txt are served
- [ ] Confirm draft-gating works (a `status: draft` entry should NOT appear on prod, but SHOULD appear on a preview deploy)
- [ ] (Optional) Custom domain pointed at the Vercel project

**DoD:** Live, public, shareable, no broken links, no console errors.

---

## 9. Deferred to v2 (not v1)

These were considered and explicitly cut from v1. Document them so future-Rafael
doesn't re-litigate the decision.

- **Admin UI** with GitHub Contents API. Cost: ~1 day + ongoing risk surface (PAT, password). Re-evaluate when content frequency justifies friction.
- **Dynamic OG images** via `@vercel/og`. Cost: ~half day. Currently using static hero-as-OG, which is fine.
- **`/writing/[slug]` detail page** with optional commentary. Currently writing cards link straight to the external post.
- **Tech-stack filtering** on homepage. With <10 projects, scrolling is fine.
- **RSS feed** for writing. Add when there's enough writing to warrant it.
- **Content tags / categories** beyond `tech_stack` and `platform`.
- **CONTRIBUTING.md / deploy button / template config layer.** Site is "primarily Rafael's, open-sourced honestly" — stays that way.
- **Light-mode-only or dark-mode-only.** Locked at light + dark with toggle (recruiter audience).
- **Image upload from admin.** No admin in v1, so moot. Hero images are committed via git.
- **Backend / database / auth.** None. By design.

---

## 10. Things explicitly NOT chosen

So the decision history is legible:

- **NOT contentlayer** — original is unmaintained; fork bets are fragile. Velite chosen instead.
- **NOT `gray-matter` + `next-mdx-remote` (option A in §10 of the grilling)** — chosen velite once a second collection (writing) was committed.
- **NOT `@next/mdx`** — file-based MDX pages don't fit the collection model.
- **NOT a `site.config.ts`** — site is not a generic template.
- **NOT a CMS or headless backend** — by design.
- **NOT image uploads in admin** — no admin.
- **NOT theme = system-only** — explicit toggle, light default for the moment a recruiter visits during the day.

---

## 11. Open questions / waiting on user

- [ ] **GitHub repo name and creation method** (`gh repo create` from CLI, or user creates via web?)
- [ ] **Custom domain** — does Rafael own one to point at Vercel, or use the default `*.vercel.app` for v1?
- [ ] **Initial project content** — does Rafael have draft content for the first 1–3 projects, or do we ship with placeholder content first and replace?
- [ ] **Bio / about copy** — needs to be written by Rafael; placeholder during scaffold.
- [ ] **Avatar image** — needs a real photo for `/public/about/avatar.<ext>`.
- [ ] **Social links** — LinkedIn URL, GitHub username, X/Bluesky handles, email to display.

---

## 12. Pointers

- **Live design reference set:** anthropic.com, vercel.com, linear.app, claude.ai, v0.dev, perplexity.ai, cursor.sh
- **shadcn/ui:** ui.shadcn.com
- **Velite:** velite.js.org
- **simple-icons:** simpleicons.org
- **Lucide:** lucide.dev
- **Vercel Web Analytics docs:** vercel.com/docs/analytics
- **Next.js 16 App Router:** nextjs.org/docs/app

---

*Last updated: 2026-05-08 — design phase complete, scaffold not yet started.*
