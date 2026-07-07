"use client";

import type React from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollToPlugin);

// Height of the fixed header (h-16), so scrolled-to sections aren't hidden.
const HEADER_OFFSET = 64;

const links = [
  { label: "Jams", href: "/#jams" },
  { label: "Feedback", href: "/#feedback" },
  { label: "About", href: "/#about" },
  { label: "Blog", href: "/blog" },
];

// Smoothly scroll to an in-page target with easing. Returns false (and does
// nothing) when the target isn't on the current page, so the link navigates
// normally instead (e.g. "/#jams" clicked from /blog).
function smoothScrollTo(href: string): boolean {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return false;
  const id = href.slice(hashIndex + 1);
  const target = document.getElementById(id);
  if (!target) return false;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  gsap.to(window, {
    duration: reduce ? 0 : 1,
    ease: "power2.inOut",
    scrollTo: { y: target, offsetY: HEADER_OFFSET },
  });
  history.pushState(null, "", href);
  return true;
}

export function Header() {
  const onNavClick =
    (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (smoothScrollTo(href)) e.preventDefault();
    };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href="/"
          onClick={(e) => {
            if (window.location.pathname === "/") {
              e.preventDefault();
              const reduce = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
              ).matches;
              gsap.to(window, {
                duration: reduce ? 0 : 1,
                ease: "power2.inOut",
                scrollTo: { y: 0 },
              });
              history.pushState(null, "", "/");
            }
          }}
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
              onClick={onNavClick(l.href)}
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
