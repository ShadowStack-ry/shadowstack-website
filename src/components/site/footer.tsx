import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-border bg-card/40 py-16"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-md">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em]">
              <span className="inline-block size-3 bg-primary" aria-hidden />
              {site.name}
            </div>
            <p className="mt-5 text-2xl font-semibold uppercase leading-tight tracking-tight sm:text-3xl">
              Come build with us.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              The next event is always on our calendar. Bring an idea or just
              your curiosity.
            </p>
            <div className="mt-6">
              <Button asChild>
                <a
                  href={site.lumaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Explore Events
                  <ArrowUpRight />
                </a>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-8 text-sm sm:grid-cols-2">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                Contact
              </div>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-foreground transition-colors hover:text-primary"
                  >
                    {site.email}
                  </a>
                </li>
                <li className="text-muted-foreground">{site.location}</li>
              </ul>
            </div>

            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                Social
              </div>
              <ul className="mt-4 space-y-2">
                {site.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground transition-colors hover:text-primary"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name}. Built in Joensuu.
          </span>
          <span className="uppercase tracking-widest">
            AI natives · build by doing
          </span>
        </div>
      </div>
    </footer>
  );
}
