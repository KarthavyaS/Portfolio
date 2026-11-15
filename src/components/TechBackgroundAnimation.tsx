"use client";

import React from "react";
import { motion } from "framer-motion";

interface TechParticle {
  id: number;
  symbol: string;
  x: string; // percentage
  y: string; // percentage
  size: string;
  duration: number;
  delay: number;
  color: string;
}

const techParticles: TechParticle[] = [
  { id: 1, symbol: "</>", x: "8%", y: "15%", size: "text-xs sm:text-sm", duration: 8, delay: 0, color: "text-purple-400/25" },
  { id: 2, symbol: "{ }", x: "88%", y: "18%", size: "text-sm sm:text-base", duration: 10, delay: 1, color: "text-pink-400/25" },
  { id: 3, symbol: "0101", x: "12%", y: "42%", size: "text-[10px] font-mono", duration: 9, delay: 2, color: "text-emerald-400/20" },
  { id: 4, symbol: "=>", x: "92%", y: "48%", size: "text-xs font-mono", duration: 7, delay: 0.5, color: "text-cyan-400/25" },
  { id: 5, symbol: "AI", x: "5%", y: "72%", size: "text-xs font-bold font-mono", duration: 11, delay: 1.5, color: "text-purple-400/25" },
  { id: 6, symbol: "f(x)", x: "85%", y: "78%", size: "text-[11px] font-mono", duration: 9.5, delay: 2.5, color: "text-amber-400/25" },
  { id: 7, symbol: "&&", x: "18%", y: "90%", size: "text-xs font-mono", duration: 8.5, delay: 3, color: "text-blue-400/25" },
  { id: 8, symbol: "[ ]", x: "80%", y: "92%", size: "text-xs font-mono", duration: 10.5, delay: 1, color: "text-indigo-400/25" },
  { id: 9, symbol: "git", x: "48%", y: "8%", size: "text-[10px] font-mono", duration: 12, delay: 0.8, color: "text-purple-400/20" },
  { id: 10, symbol: "async", x: "52%", y: "96%", size: "text-[10px] font-mono", duration: 11.5, delay: 2, color: "text-pink-400/20" },
];

const circuitNodes = [
  { id: 1, top: "22%", left: "15%", pulseDelay: "0s" },
  { id: 2, top: "28%", right: "12%", pulseDelay: "1.2s" },
  { id: 3, top: "55%", left: "8%", pulseDelay: "2.4s" },
  { id: 4, top: "68%", right: "14%", pulseDelay: "0.6s" },
  { id: 5, top: "85%", left: "12%", pulseDelay: "1.8s" },
];

export default function TechBackgroundAnimation() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden -z-10 select-none"
      aria-hidden="true"
    >
      {/* Subtle Cyber Tech Grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Floating Tech Glyphs with gentle 3D floating animation */}
      {techParticles.map((item) => (
        <motion.div
          key={item.id}
          className={`absolute font-mono select-none ${item.size} ${item.color}`}
          style={{ left: item.x, top: item.y }}
          animate={{
            y: [0, -18, 0],
            rotate: [0, 4, -4, 0],
            opacity: [0.3, 0.85, 0.3],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
        >
          {item.symbol}
        </motion.div>
      ))}

      {/* Pulsing Circuit Micro-Nodes */}
      {circuitNodes.map((node) => (
        <div
          key={node.id}
          className="absolute"
          style={{
            top: node.top,
            left: node.left,
            right: node.right,
          }}
        >
          <span className="relative flex h-2 w-2">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-40"
              style={{ animationDelay: node.pulseDelay, animationDuration: "3s" }}
            />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500/30" />
          </span>
        </div>
      ))}

      {/* Subtle Binary Data Streams on screen edge */}
      <div className="hidden lg:flex flex-col gap-3 absolute left-3 top-1/3 text-[9px] font-mono text-purple-400/15 tracking-widest uppercase">
        <span className="animate-pulse">01001011</span>
        <span className="animate-pulse" style={{ animationDelay: "0.5s" }}>01000001</span>
        <span className="animate-pulse" style={{ animationDelay: "1s" }}>01010010</span>
      </div>

      <div className="hidden lg:flex flex-col gap-3 absolute right-3 top-1/2 text-[9px] font-mono text-pink-400/15 tracking-widest uppercase">
        <span className="animate-pulse" style={{ animationDelay: "0.7s" }}>01010100</span>
        <span className="animate-pulse" style={{ animationDelay: "1.2s" }}>01001000</span>
        <span className="animate-pulse" style={{ animationDelay: "1.7s" }}>01011001</span>
      </div>
    </div>
  );
}

