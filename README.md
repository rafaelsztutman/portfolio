# portfolio

Source for [my personal portfolio](https://github.com/rafaelsztutman/portfolio) —
a single Next.js app showcasing AI/PM projects and writing.

This is **my** portfolio, open-sourced honestly. It's not a generic
template, but the structure is straightforward enough that you can fork it,
swap the content, and have your own. There's no setup wizard and no CMS —
adding a project is editing an MDX file and pushing.

## What's in here

- **Next.js 16** App Router, TypeScript, Tailwind v4, shadcn/ui
- **Velite** for typed content collections (projects + writing) with Zod
- **Modern AI aesthetic** — restrained palette, monospace accents, subtle
  signature on the hero. Lucide for UI icons, simple-icons for tech
  brands. No emojis.
- **Light + dark themes** with toggle
- **Static** — no database, no auth, no admin. Adding content is a git push.
- **MIT** licensed

The full design and architecture decisions live in [`PLAN.md`](./PLAN.md).

## Local dev

```bash
pnpm install
pnpm dev
```

Velite runs once before `dev` and `build` to generate typed content. To live
reload content changes during dev, run `pnpm velite:watch` in a second
terminal.

## Adding a project

```bash
pnpm new-project
```

Walks you through title / slug / summary / tech stack / URLs and writes
`content/projects/<slug>.mdx` with the section skeleton plus an empty
`public/projects/<slug>/` folder for the hero image.

Then:

1. Drop a hero image at `public/projects/<slug>/hero.{png,jpg,webp,svg}`.
2. Fill in the four MDX sections.
3. Flip frontmatter `status` from `"draft"` to `"published"` when ready.
4. Push. Vercel deploys it.

Drafts are visible in `pnpm dev` and on Vercel preview deploys, hidden in
production.

## Adding a writing entry

Writing entries are link cards — they point to where the post actually
lives (Substack, Medium, etc.). To add one:

1. Create `content/writing/<slug>.mdx` with frontmatter only:

   ```yaml
   ---
   title: "Post title"
   slug: "post-slug"
   summary: "One-line blurb."
   external_url: "https://example.substack.com/p/..."
   platform: "Substack"
   date: "2026-05-08"
   status: "published"
   ---
   ```

2. Drop a hero image at `public/writing/<slug>/hero.{png,jpg,webp,svg}`
   (typically the social preview image from the post).
3. Push.

## Deploying

Connect the repo to Vercel and push to `main`. No env vars are required for
v1. Push to a branch to get a free preview URL with drafts visible — useful
for sharing in-progress projects before publishing.

## License

[MIT](./LICENSE) © Rafael Oliveira
