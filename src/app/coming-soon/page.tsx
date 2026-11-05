import Image from "next/image";
import type { Metadata } from "next";

import { site } from "@/lib/site";

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
    <main className="flex min-h-screen items-center justify-center bg-[#111111]">
      <a
        href={site.lumaUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full"
      >
        <Image
          src="/coming-soon.png"
          alt="ShadowStack — luma.com/shadowstack"
          width={1920}
          height={1080}
          priority
          sizes="100vw"
          className="h-auto max-h-screen w-full object-contain"
        />
      </a>
    </main>
  );
}
