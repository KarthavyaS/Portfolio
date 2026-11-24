"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface TypewriterProps {
  words: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  holdTime?: number;
  prefix?: string;
}

/** Terminal-style cycling typewriter. Renders statically for reduced motion. */
export default function Typewriter({
  words,
  className = "",
  typeSpeed = 70,
  deleteSpeed = 35,
  holdTime = 1600,
  prefix = "",
}: TypewriterProps) {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const word = words[index % words.length];

    if (!deleting && text === word) {
      const hold = setTimeout(() => setDeleting(true), holdTime);
      return () => clearTimeout(hold);
    }

    if (deleting && text === "") {
      const next = setTimeout(() => {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      }, 120);
      return () => clearTimeout(next);
    }

    const timer = setTimeout(
      () =>
        setText((prev) =>
          deleting ? word.slice(0, prev.length - 1) : word.slice(0, prev.length + 1)
        ),
      deleting ? deleteSpeed : typeSpeed
    );
    return () => clearTimeout(timer);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, holdTime, prefersReducedMotion]);

  const display = prefersReducedMotion ? words[0] : text;

  return (
    <span className={className} aria-live="off">
      {prefix}
      {display}
      <span
        className="ml-0.5 inline-block h-[0.9em] w-[0.5em] translate-y-[0.1em] bg-pink-400 animate-pixel-blink"
        aria-hidden="true"
      />
    </span>
  );
}
