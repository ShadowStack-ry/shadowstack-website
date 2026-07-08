import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SmileGallery } from "@/components/site/smile-gallery";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section id="top" className="relative min-h-[94vh] pt-28">
      {/* clips only the ambient glow, not the gallery which is allowed to
          overflow the section and sit on top of the next one */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-1/2 top-[38%] h-[520px] w-[820px] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[130px]" />
      </div>

      {/* headline sits in the open space above the smile's dip.
          The wrapper stays pointer-events-none so the gallery behind it can be
          hovered; individual text elements opt back in so they're selectable. */}
      <div className="pointer-events-none absolute left-1/2 top-[18%] z-20 w-full -translate-x-1/2 px-6 text-center">
        <h1 className="pointer-events-auto mx-auto max-w-5xl text-balance text-5xl font-semibold uppercase leading-[1.02] tracking-tight sm:text-7xl lg:text-8xl">
          Joensuu&apos;s clan of{" "}
          <span className="text-primary">AI natives</span>
        </h1>
        <p className="pointer-events-auto mx-auto mt-6 max-w-xl text-pretty text-sm text-muted-foreground sm:text-base">
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

      {/* infinite smile gallery, pinned to the bottom and allowed to overflow
          the section (on top of the next one) so images are never clipped */}
      <div className="absolute inset-x-0 bottom-0 z-30 translate-y-[22%]">
        <SmileGallery />
      </div>
    </section>
  );
}
