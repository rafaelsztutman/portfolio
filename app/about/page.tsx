import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa6";
import type { IconType } from "react-icons";

export const metadata: Metadata = {
  title: "About",
  description: "About Rafael Oliveira — building product and AI things.",
};

// ─── EDIT ME ──────────────────────────────────────────────────────────────
// Real values live here. Replace the bio copy, the "currently" bullets, and
// fill in the social link URLs. The avatar is rendered as initials by default;
// swap to <Image src="/about/avatar.jpg" /> once you drop a photo in.
// ─────────────────────────────────────────────────────────────────────────

const NAME = "Rafael Oliveira";
const TAGLINE = "Building product and AI things.";

const BIO: string[] = [
  "Product manager working on AI-shaped products. I like the bit where ambiguous problems start collapsing into a shippable shape, and I'm allergic to demos that don't work.",
  "This site is the running record of what I'm building, what I'm learning, and where I got things wrong. It's also the source-available reference implementation for any other PM/AI builder who wants the same.",
];

const CURRENTLY: string[] = [
  "Shipping AI features at $WORK.",
  "Writing about evals, agent design, and PM-AI fluency.",
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
        <div
          aria-hidden
          className="flex size-16 shrink-0 items-center justify-center rounded-full border border-border/60 bg-muted/40 font-mono text-sm tracking-wider text-muted-foreground"
        >
          RO
        </div>
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

      <section className="mt-16">
        <h2 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Currently
        </h2>
        <ul className="space-y-2">
          {CURRENTLY.map((item, i) => (
            <li
              key={i}
              className="flex gap-3 text-[15px] leading-7 text-muted-foreground"
            >
              <span aria-hidden className="select-none text-border">
                —
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
