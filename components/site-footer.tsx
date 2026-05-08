import { SiGithub } from "react-icons/si";

const REPO_URL = "https://github.com/rafaelsztutman/portfolio";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/40">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-8 text-xs text-muted-foreground">
        <span className="font-mono">
          © {year} Rafael Oliveira
        </span>
        <a
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          aria-label="Source on GitHub"
        >
          <SiGithub className="size-3.5" />
          <span className="font-mono">source</span>
        </a>
      </div>
    </footer>
  );
}
