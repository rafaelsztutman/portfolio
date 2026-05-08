import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import type { Writing } from "@/lib/content";
import { findHeroImage } from "@/lib/hero-image";
import { getPlatformIcon } from "@/lib/platform-icons";

export function WritingCard({ entry }: { entry: Writing }) {
  const hero = findHeroImage("writing", entry.slug);
  const PlatformIcon = getPlatformIcon(entry.platform);

  return (
    <a
      href={entry.external_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-5 rounded-lg border border-border/50 bg-card/40 p-4 transition-all hover:border-border hover:bg-card/60"
    >
      {hero ? (
        <div className="relative aspect-[4/3] w-32 shrink-0 overflow-hidden rounded-md bg-muted sm:w-40">
          <Image
            src={hero}
            alt={entry.title}
            fill
            sizes="(min-width: 640px) 160px, 128px"
            className="object-cover"
          />
        </div>
      ) : (
        <div
          className="aspect-[4/3] w-32 shrink-0 rounded-md bg-muted/40 sm:w-40"
          aria-hidden
        />
      )}

      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-medium tracking-tight text-foreground transition-colors group-hover:text-foreground/90">
            {entry.title}
          </h3>
          <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
        </div>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {entry.summary}
        </p>
        <div className="mt-auto pt-2">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
            {PlatformIcon ? (
              <PlatformIcon className="size-3" aria-hidden />
            ) : null}
            {entry.platform}
          </span>
        </div>
      </div>
    </a>
  );
}
