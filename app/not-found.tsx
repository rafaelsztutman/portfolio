import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-1 flex-col justify-center px-6 py-32">
      <div className="space-y-6">
        <p className="font-mono text-xs text-muted-foreground">// 404</p>
        <h1 className="text-4xl font-medium tracking-tight">
          Not found
        </h1>
        <p className="max-w-md text-muted-foreground">
          That page doesn&apos;t exist. It may have moved, or never existed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3" />
          back to projects
        </Link>
      </div>
    </div>
  );
}
