import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

const links = [
  { label: "Jams", href: "#jams" },
  { label: "Feedback", href: "#feedback" },
  { label: "About", href: "#about" },
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href="#top"
          className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em]"
        >
          <span className="inline-block size-3 bg-primary" aria-hidden />
          {site.name}
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <Button asChild size="sm">
          <a href={site.lumaUrl} target="_blank" rel="noopener noreferrer">
            Explore Events
          </a>
        </Button>
      </div>
    </header>
  );
}
