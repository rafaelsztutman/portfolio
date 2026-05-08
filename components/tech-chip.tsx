import { getTechIcon } from "@/lib/tech-stack-icons";

export function TechChip({ label }: { label: string }) {
  const Icon = getTechIcon(label);

  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
      {Icon ? <Icon className="size-3" aria-hidden /> : null}
      {label}
    </span>
  );
}
