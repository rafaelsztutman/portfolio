# CLAUDE.md

Repo-specific guidance for any Claude session working in this codebase.
Read this first before making changes — it captures the rules a previous
session or design discussion already settled.

Design rationale lives in [`PLAN.md`](./PLAN.md). This file is the
operational rulebook; PLAN.md is the why-it-is-this-way.

## What this repo is

Personal portfolio site for Rafael Oliveira. Next.js 16 + Velite +
shadcn/ui, deployed to Vercel Hobby. Source-available, MIT, intentionally
minimal — no admin, no database, no template config layer. Adding content
is a git push.

## Adding a project — preferred path

1. **Use the script.** `pnpm new-project` walks through the prompts and
   writes the MDX file with the correct frontmatter and the four-section
   skeleton. Don't hand-write the file when the script exists — it's the
   single source of truth for frontmatter shape.

2. **Drop a hero image** at `public/projects/<slug>/hero.<ext>`
   (png/jpg/webp/svg). Convention is enforced — the layout looks up by
   slug. There is no `hero_image` frontmatter field.

3. **Fill in the four MDX sections.** Conventional H2s, in order:
   `What it does`, `Why I built it`, `How it works`, `What I learned`.
   Do **not** add `## Stack` to the body — the layout renders the chip
   rail from the `tech_stack` frontmatter array.

4. **Frontmatter contract** (authoritative schema in `velite.config.ts`):
   - `slug` must match the filename (without `.mdx`).
   - `date` is used only for ordering — never displayed.
   - `status: "draft"` hides the project in production, shows it in `pnpm
     dev` and on Vercel preview deploys. Default new entries to draft
     until ready.
   - `featured: true` + numeric `order` pins to the top of the homepage.
     Use sparingly.

5. **Push to a branch first.** Vercel preview URL is the place to validate
   layout end-to-end. Merge to `main` only when the project reads well.

## Adding a writing entry

Same intent, simpler shape:
- File: `content/writing/<slug>.mdx`
- Frontmatter only — no body content. Writing entries are link cards that
  point to the canonical external post.
- Required fields: `title`, `slug`, `summary`, `external_url`, `platform`,
  `date`, `status`.
- Hero at `public/writing/<slug>/hero.<ext>` — typically a copy of the
  external post's social preview image.

## Don't touch without asking

- **`velite.config.ts`** — Zod schema changes ripple across `lib/content.
  ts`, the page components, and PLAN §4. Don't add or rename frontmatter
  fields without updating all three together.
- **`lib/content.ts` draft-gate logic** — `VERCEL_ENV !== 'production'` is
  the documented gate (PLAN §4, §10). Don't change which env var or
  invert the logic.
- **`app/about/page.tsx` constants block** (`NAME`, `BIO`, `LINKS`, etc.)
  — that's Rafael's personal copy. Don't rewrite. Ask before editing.
- **Color tokens in `app/globals.css`** — the neutral palette is
  intentional (PLAN §5). Don't introduce bright primary colors.
- **Hero signature in `app/page.tsx`** — the radial gradient + grid is
  scoped to the homepage hero deliberately. Don't repeat it on other
  pages (PLAN §5: "used once or twice on the site, not on every section").

## Iconography rules (PLAN §6)

- **UI icons** (nav, theme toggle, external link, chevrons, copy, etc.):
  Lucide via `lucide-react`.
- **Tech-stack brand glyphs** (Next.js, OpenAI, Vercel, etc.):
  simple-icons via `react-icons/si`. Map in `lib/tech-stack-icons.ts`.
- **Personal/social brand glyphs** (LinkedIn, X, Bluesky, GitHub, etc.):
  FontAwesome 6 via `react-icons/fa6` (simple-icons doesn't have
  LinkedIn).
- **No emojis as icons. Anywhere.** Phase 6 emoji audit enforces this —
  re-run `grep -RP "[\x{1F000}-\x{1FFFF}]|[\x{2600}-\x{27BF}]"` over the
  source if in doubt.

## Verification before shipping

- `pnpm build` must succeed — that runs Velite, Next build, and
  TypeScript check.
- For UI changes: push to a branch, verify on the Vercel preview URL.
- For content additions: spot-check that the entry appears on the listing
  and renders on the detail route (if applicable).

## Ground truth pointers

- **Design + scope:** [`PLAN.md`](./PLAN.md)
- **Frontmatter schema:** [`velite.config.ts`](./velite.config.ts)
- **Filtering/sorting + draft gate:** [`lib/content.ts`](./lib/content.ts)
- **MDX runtime renderer:** [`components/mdx-content.tsx`](./components/mdx-content.tsx)
- **MDX prose styling:** [`components/mdx-components.tsx`](./components/mdx-components.tsx)
- **Build pipeline:** `prebuild` and `predev` npm scripts run Velite
  before Next.
