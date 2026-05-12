import * as React from "react";

type Props<T extends keyof React.JSX.IntrinsicElements> =
  React.ComponentPropsWithoutRef<T>;

export const mdxComponents = {
  h1: (props: Props<"h1">) => (
    <h1
      className="mt-12 mb-6 text-3xl font-medium tracking-tight"
      {...props}
    />
  ),
  h2: (props: Props<"h2">) => (
    <h2
      className="mt-12 mb-4 text-xl font-medium tracking-tight text-foreground first:mt-0"
      {...props}
    />
  ),
  h3: (props: Props<"h3">) => (
    <h3
      className="mt-8 mb-3 text-base font-medium tracking-tight"
      {...props}
    />
  ),
  p: (props: Props<"p">) => (
    <p
      className="my-4 text-[15px] leading-7 text-muted-foreground"
      {...props}
    />
  ),
  a: (props: Props<"a">) => (
    <a
      className="underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),
  ul: (props: Props<"ul">) => (
    <ul
      className="my-4 ml-6 list-disc text-[15px] leading-7 text-muted-foreground marker:text-border"
      {...props}
    />
  ),
  ol: (props: Props<"ol">) => (
    <ol
      className="my-4 ml-6 list-decimal text-[15px] leading-7 text-muted-foreground marker:text-border"
      {...props}
    />
  ),
  li: (props: Props<"li">) => <li className="mb-1" {...props} />,
  blockquote: (props: Props<"blockquote">) => (
    <blockquote
      className="my-6 border-l-2 border-border pl-4 italic text-muted-foreground"
      {...props}
    />
  ),
  code: (props: Props<"code">) => (
    <code
      className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em] text-foreground"
      {...props}
    />
  ),
  pre: (props: Props<"pre">) => (
    <pre
      className="my-6 overflow-x-auto rounded-lg border border-border/50 bg-muted/40 p-4 font-mono text-sm leading-relaxed"
      {...props}
    />
  ),
  hr: (props: Props<"hr">) => (
    <hr className="my-10 border-border/50" {...props} />
  ),
  img: (props: Props<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img className="my-6 rounded-lg border border-border/50" {...props} />
  ),
} as const;
