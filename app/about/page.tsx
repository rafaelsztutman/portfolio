import type { Metadata } from "next";
import Image from "next/image";
import { Mail } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa6";
import type { IconType } from "react-icons";

export const metadata: Metadata = {
  title: "About",
  description:
    "Rafael Oliveira — Group PM at PartnerStack (AppDirect). Building AI products and platform infrastructure for B2B SaaS.",
};

// ─── EDIT ME ──────────────────────────────────────────────────────────────
// Tagline, bio, and links live here as constants. Edit and push.
// ─────────────────────────────────────────────────────────────────────────

const NAME = "Rafael Oliveira";
const TAGLINE = "Using technology to solve real problems for people.";

const BIO: string[] = [
  "I build AI products and platform infrastructure for B2B SaaS. Currently Group PM at PartnerStack (now part of AppDirect), shipping MCP servers, AI agents, and a small GenAI suite. Before that: AI/ML PM at AWS Envision Engineering, Group PM running the integrations ecosystem at Lever, and a longer career in API platforms going back to CDN/edge work in Brazil.",
  "As the skill barrier to building keeps dropping, my question has shifted from “do I know how?” to “what’s valuable to build, and for whom?” This site is where some of that thinking takes shape: side projects, prototypes, experiments, and posts. Partly a learning log, partly a way to give back to the community that taught me.",
  "Brazilian-Canadian, in Calgary. Husband, father of three.",
];

type SocialLink = {
  label: string;
  href: string;
  icon: IconType | typeof Mail;
};

const LINKS: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rafaelloliveira/",
    icon: FaLinkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/rafaelsztutman",
    icon: FaGithub,
  },
  {
    label: "Email",
    href: "mailto:rafael.sztutman@gmail.com",
    icon: Mail,
  },
];

// ─────────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
      <header className="flex items-start gap-6">
        <Image
          src="/about/avatar.jpeg"
          alt={NAME}
          width={64}
          height={64}
          priority
          className="size-16 shrink-0 rounded-full border border-border/60 object-cover"
        />

        <div className="flex flex-col gap-2 pt-1">
          <p className="font-mono text-xs text-muted-foreground">// about</p>
          <h1 className="text-3xl font-medium tracking-tight">{NAME}</h1>
          <p className="text-muted-foreground">{TAGLINE}</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {LINKS.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={
                    href.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-card/40 px-2.5 py-1 text-xs text-muted-foreground transition-all hover:border-border hover:bg-card/60 hover:text-foreground"
                >
                  <Icon className="size-3.5" aria-hidden />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <section className="mt-12 space-y-5">
        {BIO.map((paragraph, i) => (
          <p
            key={i}
            className="text-[15px] leading-7 text-muted-foreground"
          >
            {paragraph}
          </p>
        ))}
      </section>
    </div>
  );
}
