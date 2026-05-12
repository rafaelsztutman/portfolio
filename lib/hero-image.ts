import { existsSync } from "node:fs";
import { join } from "node:path";

const EXTS = ["png", "jpg", "jpeg", "webp", "svg"];

export function findHeroImage(
  folder: "projects" | "writing",
  slug: string
): string | null {
  for (const ext of EXTS) {
    const filePath = join(
      process.cwd(),
      "public",
      folder,
      slug,
      `hero.${ext}`
    );
    if (existsSync(filePath)) {
      return `/${folder}/${slug}/hero.${ext}`;
    }
  }
  return null;
}
