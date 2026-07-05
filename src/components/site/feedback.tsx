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
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold uppercase leading-tight tracking-tight sm:text-5xl">
            What builders say
          </h2>
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
