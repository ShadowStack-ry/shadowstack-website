"use client";

import type React from "react";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { galleryItems } from "@/lib/gallery-data";

gsap.registerPlugin(useGSAP);

// Horizontal scroll speed in px/second.
const SPEED = 42;
// How many times the base set is repeated to guarantee edge-to-edge overflow
// on ultrawide screens. Duplicate URLs are fetched once (browser cache).
const COPIES = 4;

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

// Repeated node list: each node maps back to one of the base gallery items.
const nodes = Array.from({ length: galleryItems.length * COPIES }, (_, j) => ({
  key: j,
  item: galleryItems[j % galleryItems.length],
}));

export function SmileGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemEls = useRef<Array<HTMLDivElement | null>>([]);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const progressRef = useRef(0);

  const [size, setSize] = useState({ itemW: 180, itemH: 240, containerH: 380 });
  const [ready, setReady] = useState(false);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      // Layout is derived from viewport width and recomputed on resize.
      const layout = { spacing: 0, amp: 0, stripWidth: 0, vw: 0, itemW: 0 };

      const computeLayout = () => {
        const vw = container.clientWidth;
        const itemW = Math.round(clamp(vw / 5, 168, 268));
        const itemH = Math.round(itemW * 1.34);
        // Negative gap => neighbouring images overlap for a layered stack look.
        const gap = Math.round(itemW * -0.14);
        const spacing = itemW + gap;
        const amp = Math.min(vw * 0.12, 150);
        const containerH = Math.round(itemH + amp + 8);

        layout.spacing = spacing;
        layout.amp = amp;
        layout.stripWidth = spacing * nodes.length;
        layout.vw = vw;
        layout.itemW = itemW;

        setSize({ itemW, itemH, containerH });
      };

      // Places every node along the fixed smile curve for the current progress.
      const render = () => {
        const { spacing, amp, stripWidth, vw, itemW } = layout;
        if (!vw) return;
        const center = vw / 2;
        const halfW = vw / 2;
        for (let j = 0; j < nodes.length; j++) {
          const el = itemEls.current[j];
          if (!el) continue;
          const baseX = j * spacing;
          const x = gsap.utils.wrap(
            -spacing,
            stripWidth - spacing,
            baseX - progressRef.current
          );
          // t in [-1, 1] across the viewport; smile => center sits lowest.
          const t = (x + itemW / 2 - center) / halfW;
          const y = amp * (1 - t * t);
          el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
      };

      computeLayout();
      render();
      setReady(true);

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const tick = (_time: number, deltaTime: number) => {
        // Auto-advance only when the user isn't hovering or dragging.
        if (!pausedRef.current && !draggingRef.current) {
          progressRef.current += (deltaTime / 1000) * SPEED;
        }
        render();
      };

      if (!reduce) gsap.ticker.add(tick);

      const ro = new ResizeObserver(() => {
        computeLayout();
        render();
      });
      ro.observe(container);

      return () => {
        gsap.ticker.remove(tick);
        ro.disconnect();
      };
    },
    { scope: containerRef }
  );

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    lastXRef.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    // Drag right => strip moves right => progress decreases.
    progressRef.current -= dx;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  };

  // Horizontal wheel / trackpad swipe scrolls the strip; vertical wheel is
  // left to the page so it never traps scrolling.
  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(e.deltaX) < 1) return;
    progressRef.current += e.deltaX;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full cursor-grab touch-pan-y overflow-hidden active:cursor-grabbing"
      style={{ height: size.containerH }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onWheel={onWheel}
      aria-hidden="true"
    >
      {nodes.map((n, j) => (
        <div
          key={n.key}
          ref={(el) => {
            itemEls.current[j] = el;
          }}
          onMouseEnter={() => (pausedRef.current = true)}
          onMouseLeave={() => (pausedRef.current = false)}
          className="group absolute left-0 top-0 will-change-transform hover:z-50"
          style={{
            width: size.itemW,
            height: size.itemH,
            opacity: ready ? 1 : 0,
            transition: "opacity 500ms ease",
          }}
        >
          <div className="relative h-full w-full origin-center transition-transform duration-300 ease-out group-hover:scale-[1.12]">
            <div className="h-full w-full overflow-hidden border border-border bg-card shadow-lg shadow-black/40 ring-1 ring-black/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={n.item.src}
                alt={`${n.item.eventName} — ${n.item.description}`}
                loading="lazy"
                draggable={false}
                className="h-full w-full select-none object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
              />
            </div>

            {/* Caption, bottom-left, revealed on hover */}
            <figcaption className="pointer-events-none absolute bottom-0 left-0 max-w-[92%] translate-y-1 bg-background/90 px-3 py-2 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                {n.item.eventName}
              </div>
              <div className="text-[11px] text-muted-foreground">
                {n.item.date} · {n.item.description}
              </div>
            </figcaption>
          </div>
        </div>
      ))}
    </div>
  );
}
