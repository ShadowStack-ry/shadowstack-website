import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SmileGallery } from "@/components/site/smile-gallery";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[94vh] flex-col justify-end overflow-hidden pt-28"
    >
      {/* ambient green glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[38%] -z-10 h-[520px] w-[820px] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[130px]"
      />

      {/* headline sits in the open space above the smile's dip */}
      <div className="pointer-events-none absolute left-1/2 top-[20%] z-20 w-full -translate-x-1/2 px-6 text-center">
        <p className="mb-5 text-xs uppercase tracking-[0.35em] text-muted-foreground">
          {site.name} · {site.location.split("·")[0].trim()}
        </p>
        <h1 className="mx-auto max-w-4xl text-balance text-4xl font-semibold uppercase leading-[1.05] tracking-tight sm:text-6xl">
          Joensuu&apos;s clan of{" "}
          <span className="text-primary">AI natives</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-sm text-muted-foreground sm:text-base">
          A community of builders shipping real products in real time — coding
          jams, nano-hacks, and events where the next wave of AI-native startups
          gets built.
        </p>
        <div className="pointer-events-auto mt-8 flex justify-center">
          <Button asChild size="lg">
            <a href={site.lumaUrl} target="_blank" rel="noopener noreferrer">
              Explore Events
              <ArrowUpRight />
            </a>
          </Button>
        </div>
      </div>

      {/* infinite smile gallery, pinned to the bottom of the hero */}
      <div className="relative z-10 pb-10">
        <SmileGallery />
      </div>
    </section>
  );
}
