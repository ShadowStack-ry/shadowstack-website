"use client";

import { useEffect } from "react";

/**
 * Applies a very subtle blur to page content while scrolling, scaled to scroll
 * velocity, then eases back to zero when the page settles — a light "moving
 * fast" motion-blur cue. Sets the `--scroll-blur` CSS variable that
 * `main`/`footer` read in globals.css. The fixed header is intentionally left
 * out so its positioning isn't affected.
 */
export function ScrollMotionBlur() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    // Keep it subtle: cap the blur low and scale velocity down gently.
    const MAX_BLUR = 1.6;
    const VELOCITY_SCALE = 0.045;

    let lastY = window.scrollY;
    let current = 0;
    let raf = 0;
    let idle = 0;

    const tick = () => {
      const y = window.scrollY;
      const velocity = Math.abs(y - lastY);
      lastY = y;

      const target = Math.min(velocity * VELOCITY_SCALE, MAX_BLUR);
      current += (target - current) * 0.3;
      if (current < 0.04) current = 0;

      root.style.setProperty("--scroll-blur", `${current.toFixed(2)}px`);

      if (target === 0 && current === 0) idle += 1;
      else idle = 0;

      if (idle > 8) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (!raf) {
        lastY = window.scrollY;
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
      root.style.removeProperty("--scroll-blur");
    };
  }, []);

  return null;
}
