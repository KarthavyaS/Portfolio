"use client";

import React from "react";

interface PixelStar {
  id: number;
  left: string;
  top: string;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

const STAR_COLORS = ["#ffffff", "#c4b5fd", "#f9a8d4", "#a5b4fc", "#fbcfe8"];

/** Deterministic star layout so server and client markup match. */
const pixelStars: PixelStar[] = (() => {
  let seed = 20261124;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };

  return Array.from({ length: 90 }, (_, index) => ({
    id: index,
    left: `${(random() * 100).toFixed(2)}%`,
    top: `${(random() * 100).toFixed(2)}%`,
    size: random() > 0.82 ? 3 : 2,
    color: STAR_COLORS[Math.floor(random() * STAR_COLORS.length)],
    duration: 2.6 + random() * 3.8,
    delay: random() * 5,
  }));
})();

const techGlyphs = [
  { id: 1, symbol: "</>", x: "9%", y: "22%", tone: "text-purple-300/20" },
  { id: 2, symbol: "{ }", x: "88%", y: "30%", tone: "text-pink-300/20" },
  { id: 3, symbol: "0101", x: "14%", y: "63%", tone: "text-indigo-300/20" },
  { id: 4, symbol: "=>", x: "90%", y: "71%", tone: "text-fuchsia-300/20" },
  { id: 5, symbol: "AI", x: "78%", y: "88%", tone: "text-purple-300/20" },
];

export default function TechBackgroundAnimation() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden -z-10 select-none"
      aria-hidden="true"
    >
      {/* Soft nebula washes (purple → pink) */}
      <div className="absolute top-[8%] left-[18%] h-[420px] w-[520px] rounded-full bg-purple-600/20 blur-[130px]" />
      <div className="absolute top-[42%] right-[10%] h-[380px] w-[440px] rounded-full bg-pink-600/15 blur-[140px]" />
      <div className="absolute bottom-[6%] left-[38%] h-[300px] w-[520px] rounded-full bg-indigo-600/20 blur-[150px]" />

      {/* Pixel grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(190, 200, 255, 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(190, 200, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Starfield */}
      {pixelStars.map((star) => (
        <span
          key={star.id}
          className="pixel-star"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            boxShadow: `0 0 6px ${star.color}66`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* A few larger 8-bit sparkles */}
      {[
        { left: "22%", top: "16%", delay: "0.8s" },
        { left: "72%", top: "26%", delay: "2.4s" },
        { left: "46%", top: "74%", delay: "1.6s" },
      ].map((sparkle) => (
        <span
          key={sparkle.left}
          className="pixel-star"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            width: "5px",
            height: "5px",
            backgroundColor: "#f5d0fe",
            boxShadow: "0 0 10px rgba(240, 171, 252, 0.8)",
            animationDuration: "4.5s",
            animationDelay: sparkle.delay,
          }}
        />
      ))}

      {/* Floating tech glyphs */}
      {techGlyphs.map((glyph) => (
        <span
          key={glyph.id}
          className={`absolute text-[10px] font-mono tracking-widest ${glyph.tone}`}
          style={{ left: glyph.x, top: glyph.y }}
        >
          {glyph.symbol}
        </span>
      ))}

      {/* Binary data streams on the edges */}
      <div className="absolute left-3 top-1/3 hidden flex-col gap-3 font-mono text-[9px] tracking-widest text-purple-300/15 uppercase lg:flex">
        <span className="animate-pixel-blink">01001011</span>
        <span className="animate-pixel-blink" style={{ animationDelay: "0.4s" }}>
          01000001
        </span>
        <span className="animate-pixel-blink" style={{ animationDelay: "0.8s" }}>
          01010010
        </span>
      </div>

      <div className="absolute right-3 top-1/2 hidden flex-col gap-3 font-mono text-[9px] tracking-widest text-pink-300/15 uppercase lg:flex">
        <span className="animate-pixel-blink" style={{ animationDelay: "0.2s" }}>
          01010100
        </span>
        <span className="animate-pixel-blink" style={{ animationDelay: "0.6s" }}>
          01001000
        </span>
        <span className="animate-pixel-blink" style={{ animationDelay: "1s" }}>
          01011001
        </span>
      </div>

      {/* CRT scanlines + slow sweeping scan bar */}
      <div className="crt-lines absolute inset-0 opacity-30" />
      <div className="animate-pixel-scan absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-purple-300/[0.04] to-transparent" />
    </div>
  );
}
