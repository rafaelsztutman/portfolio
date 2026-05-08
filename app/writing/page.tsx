import type { Metadata } from "next";

import { getWriting } from "@/lib/content";
import { WritingCard } from "@/components/writing-card";

export const metadata: Metadata = {
  title: "Writing",
  description: "Posts and essays linked to where they're published.",
};

export default function WritingPage() {
  const entries = getWriting();

  return (
    <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
      <header className="space-y-4">
        <p className="font-mono text-xs text-muted-foreground">// writing</p>
        <h1 className="text-4xl font-medium tracking-tight">Writing</h1>
        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
          Posts and essays. Each card links out to where the writing actually
          lives.
        </p>
      </header>

      <section className="mt-16">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Posts
          </h2>
          <span className="font-mono text-xs text-muted-foreground">
            {entries.length.toString().padStart(2, "0")}
          </span>
        </div>

        {entries.length === 0 ? (
          <p className="font-mono text-xs text-muted-foreground">
            Nothing published yet.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {entries.map((entry) => (
              <WritingCard key={entry.slug} entry={entry} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
