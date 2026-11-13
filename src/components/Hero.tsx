"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Sparkles, Terminal } from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import MagneticButton from "./MagneticButton";
import { portfolioData } from "@/data/portfolio";

interface HeroProps {
  onCtaHoverChange?: (isHovered: boolean) => void;
  onOpenTerminal?: () => void;
}

export default function Hero({ onCtaHoverChange, onOpenTerminal }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canParallax, setCanParallax] = useState(false);
  const [isCtaHovered, setIsCtaHovered] = useState(false);

  // Parallax motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for cursor follow
  const springConfig = { damping: 25, stiffness: 120, mass: 0.2 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // 3D transforms for avatar
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-14, 14]);
  const avatarTranslateX = useTransform(smoothMouseX, [-0.5, 0.5], [-16, 16]);
  const avatarTranslateY = useTransform(smoothMouseY, [-0.5, 0.5], [-12, 12]);

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setCanParallax(!isTouch && !prefersReducedMotion);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canParallax || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(relativeX);
    mouseY.set(relativeY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleCtaHover = (hovered: boolean) => {
    setIsCtaHovered(hovered);
    if (onCtaHoverChange) onCtaHoverChange(hovered);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] flex flex-col justify-center items-center overflow-hidden pt-28 pb-16 px-4 sm:px-6 lg:px-8 select-none"
      style={{ perspective: "1000px" }}
      aria-label="Hero Introduction"
    >
      {/* Atmospheric lighting glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[360px] bg-purple-600/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] bg-blue-600/10 rounded-full blur-[130px]" />
        <div className="absolute top-1/2 right-1/3 w-[360px] h-[360px] bg-pink-600/10 rounded-full blur-[130px]" />
      </div>

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-20">
        {/* Left Side: Name Heading + Intro Text + Credentials (lg:col-span-7) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-purple-300 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Open for Internships &amp; Research Collaborations</span>
          </div>

          {/* Name Heading placed side-along with intro */}
          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl tracking-tight text-white leading-[1.05] uppercase drop-shadow-2xl">
            HI, I&apos;M <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-white bg-clip-text text-transparent">
              KARTHAVYA
            </span>
          </h1>

          {/* Intro Headline */}
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-100 tracking-tight mt-5">
            {portfolioData.personal.introHeadline}
          </h2>

          {/* Bio / Intro Paragraph */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mt-3.5 max-w-xl font-normal">
            {portfolioData.personal.introText}
          </p>

          {/* Credentials / Details */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-slate-400 font-medium mt-6 pt-6 border-t border-white/10 w-full max-w-xl">
            <span className="flex items-center gap-1.5">
              <span>📍</span> {portfolioData.personal.location}
            </span>
            <span className="flex items-center gap-1.5">
              <span>🎓</span> REC Chennai (B.E. CSE &apos;28)
            </span>
            <span className="flex items-center gap-1.5 text-purple-300 font-semibold">
              <span>⚡</span> CGPA {portfolioData.personal.cgpa}/10
            </span>
          </div>
        </motion.div>

        {/* Right Side: Avatar + Contact & Other Buttons Below Avatar (lg:col-span-5) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center order-1 lg:order-2">
          {/* 3D Interactive Avatar */}
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{
              scale: isCtaHovered ? 1.05 : 1,
              y: isCtaHovered ? -6 : 0,
              rotate: isCtaHovered ? -2 : 0,
            }}
            transition={{
              type: "spring",
              damping: 18,
              stiffness: 140,
            }}
            style={
              canParallax
                ? {
                    rotateX,
                    rotateY,
                    x: avatarTranslateX,
                    y: avatarTranslateY,
                    transformStyle: "preserve-3d",
                  }
                : undefined
            }
            whileHover={canParallax ? { scale: 1.03 } : undefined}
            className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[410px] lg:h-[410px] transition-transform"
          >
            {/* Ambient backlight glow behind avatar */}
            <div
              className={`absolute inset-4 rounded-full bg-gradient-to-tr from-purple-600/35 via-pink-500/25 to-transparent blur-2xl -z-10 transition-opacity duration-300 ${
                isCtaHovered ? "opacity-100 scale-110" : "opacity-80"
              }`}
            />

            {/* Avatar playful reaction indicator */}
            {isCtaHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="absolute top-2 right-4 bg-purple-500/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-lg backdrop-blur-md flex items-center gap-1 z-30"
              >
                <Sparkles className="w-3 h-3 text-yellow-300 animate-spin" />
                <span>Let&apos;s talk!</span>
              </motion.div>
            )}

            {/* Avatar Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/avatar.png"
              alt="3D cartoon avatar of Karthavya"
              className="w-full h-full object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)] filter"
            />
          </motion.div>

          {/* Contact and Other Buttons BELOW ME (Below Avatar) */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6 sm:mt-8 z-30">
            {/* Magnetic Contact CTA */}
            <div
              onMouseEnter={() => handleCtaHover(true)}
              onMouseLeave={() => handleCtaHover(false)}
            >
              <MagneticButton href="#contact" strength={0.4}>
                <div className="group relative flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-white glow-gradient-pill transition-all duration-300 shadow-lg shadow-purple-600/20">
                  <span>Contact me</span>
                  <span className="p-1 rounded-full bg-white/20 group-hover:bg-white/30 group-hover:rotate-45 transition-transform duration-300">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </span>
                </div>
              </MagneticButton>
            </div>

            {/* GitHub Button */}
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4.5 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-200 bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 hover:text-white transition-all shadow-sm"
              title="View GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            {/* CLI / Terminal Button */}
            {onOpenTerminal && (
              <button
                onClick={onOpenTerminal}
                className="flex items-center gap-1.5 px-4 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/30 hover:bg-purple-500/20 hover:border-purple-500/50 hover:text-white transition-all shadow-sm"
                title="Launch Interactive Terminal"
              >
                <Terminal className="w-4 h-4 text-purple-400" />
                <span className="font-mono text-xs">&gt;_ CLI</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
