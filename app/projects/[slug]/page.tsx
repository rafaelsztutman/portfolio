import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { SiGithub } from "react-icons/si";

import { getProject, getProjects } from "@/lib/content";
import { findHeroImage } from "@/lib/hero-image";
import { MDXContent } from "@/components/mdx-content";
import { mdxComponents } from "@/components/mdx-components";
import { TagChip } from "@/components/tag-chip";
import { TechChip } from "@/components/tech-chip";
import { buttonVariants } from "@/components/ui/button";

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const hero = findHeroImage("projects", project.slug);
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
      ...(hero ? { images: [{ url: hero }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
      ...(hero ? { images: [hero] } : {}),
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const hero = findHeroImage("projects", project.slug);

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <header className="space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3" />
          projects
        </Link>
        <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">
          {project.title}
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {project.summary}
        </p>
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((label) => (
              <TagChip key={label} label={label} />
            ))}
          </div>
        )}
        {(project.demo_url || project.github_url) && (
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants()}
              >
                <ArrowUpRight className="size-4" />
                Demo
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "outline" })}
              >
                <SiGithub className="size-4" />
                Source
              </a>
            )}
          </div>
        )}
      </header>

      {hero && (
        <div className="my-12 overflow-hidden rounded-lg border border-border/40">
          <Image
            src={hero}
            alt={project.title}
            width={1200}
            height={630}
            className="h-auto w-full"
            priority
          />
        </div>
      )}

      <div className={hero ? "" : "mt-12"}>
        <MDXContent code={project.body} components={mdxComponents} />
      </div>

      <section className="mt-16 border-t border-border/40 pt-8">
        <h2 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Stack
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.tech_stack.map((label) => (
            <TechChip key={label} label={label} />
          ))}
        </div>
      </section>
    </article>
  );
}
