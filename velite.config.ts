import { defineConfig, defineCollection, s } from "velite";
import rehypePrettyCode, {
  type Options as RehypePrettyCodeOptions,
} from "rehype-pretty-code";

const prettyCodeOptions: RehypePrettyCodeOptions = {
  theme: {
    dark: "github-dark",
    light: "github-light",
  },
  keepBackground: false,
};

const projects = defineCollection({
  name: "Project",
  pattern: "projects/**/*.mdx",
  schema: s
    .object({
      title: s.string(),
      slug: s.slug("projects"),
      summary: s.string(),
      tags: s.array(s.string()),
      tech_stack: s.array(s.string()),
      demo_url: s.string().url().optional(),
      github_url: s.string().url().optional(),
      date: s.isodate(),
      status: s.enum(["draft", "published"]).default("published"),
      featured: s.boolean().default(false),
      order: s.number().optional(),
      body: s.mdx(),
    })
    .transform((data) => ({
      ...data,
      url: `/projects/${data.slug}`,
    })),
});

const writing = defineCollection({
  name: "Writing",
  pattern: "writing/**/*.mdx",
  schema: s.object({
    title: s.string(),
    slug: s.slug("writing"),
    summary: s.string(),
    external_url: s.string().url(),
    platform: s.string(),
    date: s.isodate(),
    status: s.enum(["draft", "published"]).default("published"),
  }),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/.velite-assets",
    base: "/.velite-assets/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { projects, writing },
  mdx: {
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
  },
});
