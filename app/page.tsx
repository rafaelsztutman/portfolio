import { getProjects } from "@/lib/content";
import { ProjectCard } from "@/components/project-card";

export default function Home() {
  const projects = getProjects();

  return (
    <div className="relative">
      {/* Hero signature: soft radial gradient + faint grid, scoped to the
          hero region. Used once on the site, not repeated elsewhere. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 50% at 50% 0%, color-mix(in oklch, var(--foreground) 5%, transparent), transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.18] dark:opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse 60% 50% at 50% 0%, black, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 50% at 50% 0%, black, transparent 70%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <p className="font-mono text-xs text-muted-foreground">
            // portfolio.v0.1
          </p>
          <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">
            Rafael Oliveira
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            Building product and AI things. This site is the work — projects,
            writing, and how each one came together.
          </p>
        </section>

        <section className="mt-20 sm:mt-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Projects
            </h2>
            <span className="font-mono text-xs text-muted-foreground">
              {projects.length.toString().padStart(2, "0")}
            </span>
          </div>

          {projects.length === 0 ? (
            <p className="font-mono text-xs text-muted-foreground">
              No projects published yet.
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
