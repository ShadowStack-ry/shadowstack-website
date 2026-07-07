import { Reveal } from "@/components/site/reveal";
import { testimonials } from "@/lib/testimonials";

export function Feedback() {
  return (
    <section
      id="feedback"
      className="border-t border-border/60 bg-card/30 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-primary">
            From the community
          </p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
            <h2 className="text-3xl font-semibold uppercase leading-tight tracking-tight sm:text-5xl">
              What ninjas
              <sup className="align-super text-[0.5em] text-primary">*</sup> say
            </h2>
            <p className="pb-1 text-xs uppercase tracking-widest text-muted-foreground">
              <span className="text-primary">*</span> A ninja is a member of
              the ShadowStack clan
            </p>
          </div>
        </Reveal>

        <Reveal stagger className="mt-14 grid gap-6 sm:grid-cols-2">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col justify-between border border-border bg-card p-8"
            >
              <blockquote className="text-sm leading-relaxed text-foreground sm:text-base">
                <span className="mr-1 text-primary">&ldquo;</span>
                {t.quote}
                <span className="ml-0.5 text-primary">&rdquo;</span>
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <div className="text-sm font-semibold uppercase tracking-wide">
                  {t.name}
                </div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
