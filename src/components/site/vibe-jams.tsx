import { Reveal } from "@/components/site/reveal";

const formats = [
  {
    title: "Coding Jams",
    body: "A room, a night, and a deadline. Builders pair up and ship a working product live using Cursor, Lovable, and whatever tool ships next.",
  },
  {
    title: "Nano-Hacks",
    body: "Bite-sized sprints under an hour. No slides, no theory — just prompt, build, and demo the thing you made before the timer runs out.",
  },
  {
    title: "Demo Nights",
    body: "First products meet first users. Show what you built, get real feedback, and find the people who want to build the next version with you.",
  },
];

export function VibeJams() {
  return (
    <section id="jams" className="border-t border-border/60 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-primary">
            What we do
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold uppercase leading-tight tracking-tight sm:text-5xl">
            Vibe Coding Jams
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Vibe coding jams are our core ritual: short, high-energy sessions
            where you learn by building, not by watching. You bring an idea (or
            borrow one), sit down with other AI-native builders, and leave with
            something real. No prior experience required — just the willingness
            to ship.
          </p>
        </Reveal>

        <Reveal stagger className="mt-14 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
          {formats.map((f) => (
            <div key={f.title} className="bg-card p-8">
              <h3 className="text-lg font-semibold uppercase tracking-wide text-primary">
                {f.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {f.body}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
