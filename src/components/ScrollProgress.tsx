"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";

/** Bottom HUD: run-progress bar plus an arcade score readout. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });
  const [score, setScore] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.round(Math.min(1, Math.max(0, value)) * 999999);
    // Only update when the visible digits would actually change.
    setScore((prev) => (Math.floor(prev / 240) === Math.floor(next / 240) ? prev : next));
  });

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40" aria-hidden="true">
      <div className="mx-auto flex max-w-7xl items-end justify-end px-3 pb-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-indigo-300/50">
          score {String(score).padStart(6, "0")}
        </span>
      </div>
      <div className="h-1.5 w-full bg-[#05071b]">
        <motion.div
          className="h-full origin-left bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-400 shadow-[0_0_12px_rgba(236,72,153,0.7)]"
          style={{ scaleX }}
        />
      </div>
    </div>
  );
}
