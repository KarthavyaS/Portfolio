"use client";

import { useEffect, useRef } from "react";

/**
 * Pixel-art cursor for fine pointers. The native cursor is hidden only while
 * this component is active, and never when reduced motion is requested.
 */
export default function PixelCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    document.body.classList.add("pixel-cursor-active");
    cursor.style.opacity = "0";
    ring.style.opacity = "0";

    let targetX = 0;
    let targetY = 0;
    let ringX = 0;
    let ringY = 0;
    let started = false;
    let frame = 0;

    const isTextInput = (target: EventTarget | null) => {
      const el = target as HTMLElement | null;
      if (!el || !el.tagName) return false;
      return ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName) || el.isContentEditable;
    };

    const isInteractive = (target: EventTarget | null) => {
      const el = target as HTMLElement | null;
      return !!el?.closest?.('a, button, [role="button"], summary, label[for]');
    };

    const onMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (!started) {
        started = true;
        ringX = targetX;
        ringY = targetY;
        cursor.style.opacity = "1";
        ring.style.opacity = "1";
      }

      const text = isTextInput(event.target);
      cursor.style.opacity = text ? "0" : "1";
      ring.style.opacity = text ? "0" : "1";

      const hot = !text && isInteractive(event.target) ? "true" : "false";
      cursor.dataset.hot = hot;
      ring.dataset.hot = hot;
    };

    const onLeave = () => {
      cursor.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const loop = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      cursor.style.transform = `translate3d(${targetX - 2}px, ${targetY - 2}px, 0)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.body.classList.remove("pixel-cursor-active");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="pixel-cursor-ring" aria-hidden="true" />
      <div ref={cursorRef} className="pixel-cursor" data-hot="false" aria-hidden="true" />
    </>
  );
}
