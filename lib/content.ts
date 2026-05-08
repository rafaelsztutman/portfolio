import { projects as allProjects, writing as allWriting } from "#site/content";
import type { Project, Writing } from "#site/content";

const includeDrafts = process.env.VERCEL_ENV !== "production";

function isVisible(entry: { status: string }) {
  return includeDrafts || entry.status === "published";
}

export function getProjects(): Project[] {
  const visible = allProjects.filter(isVisible);
  const featured = visible
    .filter((p) => p.featured)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  const rest = visible
    .filter((p) => !p.featured)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
  return [...featured, ...rest];
}

export function getProject(slug: string): Project | undefined {
  return allProjects.find((p) => p.slug === slug && isVisible(p));
}

export function getWriting(): Writing[] {
  return allWriting
    .filter(isVisible)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export type { Project, Writing };
