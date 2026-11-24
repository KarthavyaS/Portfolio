"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  drift: number;
  phase: number;
  color: string;
}

const COLORS = [
  "rgba(196, 181, 253, 0.85)",
  "rgba(249, 168, 212, 0.8)",
  "rgba(103, 232, 249, 0.75)",
  "rgba(255, 255, 255, 0.8)",
];

/** Deterministic pseudo-random so repeats are stable within a session. */
function makeParticles(width: number, height: number): Particle[] {
  let seed = 20261124;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const density = Math.min(46, Math.round((width * height) / 42000));
  return Array.from({ length: density }, () => ({
    x: rand() * width,
    y: rand() * height,
    size: rand() > 0.8 ? 3 : 2,
    speedY: 0.08 + rand() * 0.22,
    drift: (rand() - 0.5) * 0.18,
    phase: rand() * Math.PI * 2,
    color: COLORS[Math.floor(rand() * COLORS.length)],
  }));
}

export default function PixelParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frame = 0;
    let last = 0;
    let running = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = makeParticles(width, height);
    };

    const draw = (time: number) => {
      if (!running) return;
      // Throttle to ~30fps: this layer is decorative only.
      if (time - last < 33) {
        frame = requestAnimationFrame(draw);
        return;
      }
      const delta = Math.min((time - last) / 16.67, 3);
      last = time;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.y -= p.speedY * delta;
        p.x += p.drift * delta;
        if (p.y < -6) {
          p.y = height + 6;
          p.x = Math.random() * width;
        }
        if (p.x < -6) p.x = width + 6;
        if (p.x > width + 6) p.x = -6;

        const twinkle = 0.55 + Math.sin(time / 900 + p.phase) * 0.45;
        ctx.globalAlpha = Math.max(0.12, twinkle);
        ctx.fillStyle = p.color;
        ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
      }
      ctx.globalAlpha = 1;
      frame = requestAnimationFrame(draw);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(frame);
      } else if (!running) {
        running = true;
        last = 0;
        frame = requestAnimationFrame(draw);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    if (!document.hidden) frame = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-70"
    />
  );
}
