import Link from "next/link";
import Image from "next/image";

import type { Project } from "@/lib/content";
import { findHeroImage } from "@/lib/hero-image";
import { TechChip } from "@/components/tech-chip";

const MAX_CHIPS = 4;

export function ProjectCard({ project }: { project: Project }) {
  const hero = findHeroImage("projects", project.slug);
  const visibleChips = project.tech_stack.slice(0, MAX_CHIPS);
  const overflow = project.tech_stack.length - visibleChips.length;

  return (
    <Link
      href={project.url}
      className="group flex flex-col overflow-hidden rounded-lg border border-border/50 bg-card/40 transition-all hover:border-border hover:bg-card/60"
    >
      {hero ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
          <Image
            src={hero}
            alt={project.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      ) : (
        <div className="aspect-[16/9] w-full bg-muted/40" aria-hidden />
      )}

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="space-y-1.5">
          <h3 className="text-base font-medium tracking-tight text-foreground">
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {project.summary}
          </p>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-2">
          {visibleChips.map((label) => (
            <TechChip key={label} label={label} />
          ))}
          {overflow > 0 && (
            <span className="font-mono text-[11px] text-muted-foreground">
              +{overflow}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
