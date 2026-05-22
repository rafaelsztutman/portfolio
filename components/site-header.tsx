import Link from "next/link";
import { FaLinkedin, FaGithub } from "react-icons/fa6";

import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { href: "/", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
];

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/rafaelloliveira/",
    label: "LinkedIn",
    icon: FaLinkedin,
  },
  {
    href: "https://github.com/rafaelsztutman",
    label: "GitHub",
    icon: FaGithub,
  },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="font-mono text-sm tracking-tight text-foreground transition-colors hover:text-foreground/70"
          >
            rafael oliveira
          </Link>
          <div className="flex items-center gap-1">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon className="size-4" aria-hidden />
              </a>
            ))}
          </div>
        </div>
        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
