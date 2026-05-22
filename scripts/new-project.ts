#!/usr/bin/env tsx
/**
 * Scaffolds a new project entry: writes content/projects/<slug>.mdx with the
 * skeleton sections and creates an empty public/projects/<slug>/ folder ready
 * for the hero image.
 *
 * Usage:  pnpm new-project
 */

import { mkdir, writeFile, access } from "node:fs/promises";
import { join } from "node:path";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const ROOT = process.cwd();

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

async function exists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const rl = createInterface({ input, output });
  const ask = async (q: string, def?: string) => {
    const suffix = def ? ` (${def})` : "";
    const answer = (await rl.question(`${q}${suffix}: `)).trim();
    return answer || def || "";
  };

  console.log("\nNew project\n");

  const title = await ask("Title");
  if (!title) {
    console.error("Title is required.");
    rl.close();
    process.exit(1);
  }

  const slug = await ask("Slug", slugify(title));
  if (!slug) {
    console.error("Slug is required.");
    rl.close();
    process.exit(1);
  }

  const mdxPath = join(ROOT, "content", "projects", `${slug}.mdx`);
  if (await exists(mdxPath)) {
    console.error(`\n✗ content/projects/${slug}.mdx already exists.`);
    rl.close();
    process.exit(1);
  }

  const summary = await ask("Summary (one line)");
  const tagsRaw = await ask("Tags (comma-separated, 2-4 domain/theme keywords)");
  const tags = tagsRaw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const techRaw = await ask("Tech stack (comma-separated)");
  const techStack = techRaw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const demoUrl = await ask("Demo URL (optional, leave blank)");
  const githubUrl = await ask("GitHub URL (optional, leave blank)");

  rl.close();

  const tagsYaml =
    tags.length === 0
      ? "  []"
      : tags.map((t) => `  - ${JSON.stringify(t)}`).join("\n");

  const techYaml =
    techStack.length === 0
      ? "  []"
      : techStack.map((t) => `  - ${JSON.stringify(t)}`).join("\n");

  const frontmatter = `---
title: ${JSON.stringify(title)}
slug: ${JSON.stringify(slug)}
summary: ${JSON.stringify(summary)}
tags:
${tagsYaml}
tech_stack:
${techYaml}
${demoUrl ? `demo_url: ${JSON.stringify(demoUrl)}\n` : ""}${
    githubUrl ? `github_url: ${JSON.stringify(githubUrl)}\n` : ""
  }date: ${JSON.stringify(todayISO())}
status: "draft"
featured: false
---
`;

  const body = `
## What it does

One short paragraph: what this project does at a glance.

## Why I built it

The PM framing — what problem, who for, what hypothesis.

## How it works

A short technical paragraph at stack level.

## What I learned

The most important section. What surprised you, what generalises.
`;

  await mkdir(join(ROOT, "content", "projects"), { recursive: true });
  await writeFile(mdxPath, frontmatter + body, "utf8");

  const publicDir = join(ROOT, "public", "projects", slug);
  await mkdir(publicDir, { recursive: true });

  console.log(`\n✓ content/projects/${slug}.mdx`);
  console.log(`✓ public/projects/${slug}/  (drop hero.png|jpg|webp here)`);
  console.log(`\nStatus is "draft" — visible on previews, hidden in production.`);
  console.log(`Flip to "published" when ready.\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
