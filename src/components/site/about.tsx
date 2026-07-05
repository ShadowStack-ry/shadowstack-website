import { Reveal } from "@/components/site/reveal";

const stats = [
  { value: "AI-native", label: "by default" },
  { value: "Joensuu", label: "North Karelia" },
  { value: "Build", label: "by doing" },
];

export function About() {
  return (
    <section id="about" className="border-t border-border/60 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-primary">
            About
          </p>
          <h2 className="mt-4 text-3xl font-semibold uppercase leading-tight tracking-tight sm:text-5xl">
            What is ShadowStack
          </h2>
          <div className="mt-10 grid grid-cols-3 gap-px overflow-hidden border border-border bg-border">
            {stats.map((s) => (
              <div key={s.label} className="bg-card px-4 py-6 text-center">
                <div className="text-sm font-semibold uppercase text-primary">
                  {s.value}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="space-y-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <p>
            ShadowStack is Joensuu&apos;s clan of AI natives — a community of
            builders, developers, and entrepreneurs who believe the next wave of
            startups will be born from people who know how to build with AI, not
            just talk about it.
          </p>
          <p>
            We bring together students, founders, and creators in North Karelia
            to learn by doing: through coding jams, nano-hacks, and events where
            real products get built in real time using tools like Cursor,
            Lovable, and whatever ships next.
          </p>
          <p>
            We exist because Joensuu has the talent — it just needs a place to
            ignite. ShadowStack is that place:{" "}
            <span className="text-foreground">
              part community, part launchpad
            </span>
            , and the closest thing Eastern Finland has to a home base for
            AI-native founders.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
