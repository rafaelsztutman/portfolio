import { getProjects } from "@/lib/content";
import { ProjectCard } from "@/components/project-card";

export default function Home() {
  const projects = getProjects();

  return (
    <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
      <section className="space-y-6">
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

      <section className="mt-20 sm:mt-24">
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
          <div className="grid gap-5 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
