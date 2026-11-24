"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const STORAGE_KEY = "karthavya-intro-seen";

const BOOT_LINES = [
  "BIOS v1.0 .............. OK",
  "MEMORY CHECK 640K ...... OK",
  "LOADING NEURAL MODULES . OK",
  "MOUNTING PROJECT ARCHIVE OK",
  "CALIBRATING PIXELS ..... OK",
  "PLAYER 1 CONNECTED",
];

export default function BootIntro() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<"idle" | "booting" | "done">("idle");
  const [lineCount, setLineCount] = useState(0);
  const [progress, setProgress] = useState(0);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const finish = useCallback(() => {
    setProgress(100);
    setPhase("done");
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // Storage unavailable — intro will simply replay next visit
    }
  }, []);

  const start = useCallback(() => {
    if (prefersReducedMotion) {
      finish();
      return;
    }
    setPhase("booting");
    setLineCount(0);
    setProgress(4);

    let line = 0;
    let pct = 4;
    intervalRef.current = setInterval(() => {
      line += 1;
      pct = Math.min(94, pct + 15);
      setLineCount(line);
      setProgress(pct);
      if (line >= BOOT_LINES.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setTimeout(() => {
          setProgress(100);
          setTimeout(finish, 320);
        }, 320);
      }
    }, 280);
  }, [finish, prefersReducedMotion]);

  // Decide on mount whether to show the intro at all.
  useEffect(() => {
    setMounted(true);
    if (prefersReducedMotion) {
      setPhase("done");
      return;
    }
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      seen = false;
    }
    const recruiterMode =
      typeof window !== "undefined" &&
      (() => {
        try {
          return localStorage.getItem("recruiter-mode") === "true";
        } catch {
          return false;
        }
      })();

    if (seen || recruiterMode) setPhase("done");
  }, [prefersReducedMotion]);

  // Lock scrolling while the screen is up.
  useEffect(() => {
    if (phase === "done") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [phase]);

  // Enter / Escape / Space start or skip.
  useEffect(() => {
    if (phase === "done") return;
    const onKey = (event: KeyboardEvent) => {
      if (phase === "idle" && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        start();
      } else if (event.key === "Escape") {
        finish();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, start, finish]);

  useEffect(
    () => () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    },
    []
  );

  return (
    <AnimatePresence>
      {mounted && phase !== "done" && (
        <motion.div
          key="boot"
          role="dialog"
          aria-modal="true"
          aria-label="Arcade start screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="boot-screen fixed inset-0 z-[200] flex flex-col items-center justify-center px-5 text-center"
        >
          {/* Scanlines + vignette */}
          <div className="crt-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_180px_60px_rgba(3,4,16,0.9)]" aria-hidden="true" />

          <button
            type="button"
            onClick={finish}
            className="absolute right-4 top-4 z-20 border-2 border-indigo-400/40 bg-[#0a0e2c]/80 px-3 py-1.5 font-display text-[10px] uppercase tracking-wider text-indigo-200 transition-colors hover:border-pink-400/70 hover:text-white"
          >
            Skip
          </button>

          <div className="relative z-10 w-full max-w-lg">
            <p className="font-display text-[10px] uppercase tracking-[0.3em] text-cyan-300/80">
              Karthavya Systems
            </p>
            <h1 className="boot-logo mt-4 text-xl text-white sm:text-2xl">
              PORTFOLIO<span className="text-pink-400">.EXE</span>
            </h1>
            <p className="mt-2 font-display text-[9px] uppercase tracking-[0.25em] text-indigo-300/70">
              AI / Data Systems · Player 1
            </p>

            {phase === "idle" ? (
              <div className="mt-10">
                <button
                  type="button"
                  onClick={start}
                  autoFocus
                  className="pixel-btn pixel-corners border-2 border-purple-400/70 bg-purple-600/20 px-6 py-3 font-display text-xs uppercase tracking-wider text-white hover:border-pink-300 hover:bg-purple-600/35 sm:text-sm"
                >
                  ▶ Press Start
                </button>
                <p className="mt-4 font-mono text-sm text-indigo-300/70">
                  <span className="animate-pixel-blink">▮</span> click or press enter
                </p>
              </div>
            ) : (
              <div className="mt-8 text-left">
                <div className="min-h-[9.5rem] space-y-1.5 font-mono text-sm text-cyan-200/90 sm:text-base">
                  {BOOT_LINES.slice(0, lineCount).map((line) => (
                    <p key={line} className="flex gap-2">
                      <span className="text-purple-400">&gt;</span>
                      <span>{line}</span>
                    </p>
                  ))}
                  {lineCount < BOOT_LINES.length && (
                    <p className="flex gap-2 text-pink-300">
                      <span>&gt;</span>
                      <span className="animate-pixel-blink">▮</span>
                    </p>
                  )}
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <div className="xp-track flex-1">
                    <div className="boot-progress-fill h-full" style={{ width: `${progress}%` }} />
                  </div>
                  <span className="w-10 text-right font-mono text-sm text-indigo-200">
                    {progress}%
                  </span>
                </div>
                <p className="mt-3 font-mono text-xs text-indigo-300/60">
                  initializing arcade interface...
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
