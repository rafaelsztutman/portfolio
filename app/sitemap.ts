import type { MetadataRoute } from "next";

import { getProjects } from "@/lib/content";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly" },
    {
      url: `${SITE_URL}/writing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = getProjects().map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: new Date(project.date),
    changeFrequency: "monthly",
  }));

  return [...staticRoutes, ...projectRoutes];
}
