import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "ShadowStack" },
  description: "Cool ShadowStack site will be here soon...",
  keywords: null,
  openGraph: {
    title: "ShadowStack",
    description: "Cool ShadowStack site will be here soon...",
  },
  twitter: {
    title: "ShadowStack",
    description: "Cool ShadowStack site will be here soon...",
  },
  robots: { index: false, follow: false },
};

// Temporary placeholder shown on every route while the site isn't ready.
// See src/proxy.ts — delete it to put the real site back.
export default function ComingSoon() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[680px] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[130px]"
      />
      <h1 className="text-balance text-center text-3xl font-semibold uppercase leading-tight tracking-tight sm:text-5xl">
        Cool <span className="text-primary">ShadowStack</span> site will be
        here soon...
      </h1>
    </main>
  );
}
