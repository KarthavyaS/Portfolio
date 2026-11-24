"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { GithubIcon, LeetcodeIcon } from "./SocialIcons";
import Typewriter from "./Typewriter";
import { portfolioData } from "@/data/portfolio";

const HERO_ROLES = [
  "LOGIC ENGINE TINKERER",
  "PROBLEM SOLVER",
];

interface HeroProps {
  onCtaHoverChange?: (isHovered: boolean) => void;
  onOpenTerminal?: () => void;
}

export default function Hero({ onCtaHoverChange, onOpenTerminal }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canParallax, setCanParallax] = useState(false);
  const [isCtaHovered, setIsCtaHovered] = useState(false);
  const [isReacting, setIsReacting] = useState(false);
  const reactionTimerRef = useRef<NodeJS.Timeout | null>(null);

  const triggerReaction = () => {
    setIsReacting(true);
    if (reactionTimerRef.current) clearTimeout(reactionTimerRef.current);
    reactionTimerRef.current = setTimeout(() => {
      setIsReacting(false);
    }, 2800);
  };

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
  const avatarTranslateX = useTransform(smoothMouseX, [-0.5, 0.5], [-14, 14]);
  const avatarTranslateY = useTransform(smoothMouseY, [-0.5, 0.5], [-10, 10]);

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
    if (hovered) triggerReaction();
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
      {/* Pixel-art lighting glows and twinkling sparks */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[360px] bg-purple-600/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] bg-indigo-600/15 rounded-full blur-[130px]" />
        <div className="absolute top-1/2 right-1/3 w-[360px] h-[360px] bg-pink-600/15 rounded-full blur-[130px]" />

        {/* 8-bit sparks */}
        <div className="absolute top-20 left-1/4 w-1 h-1 bg-purple-300 animate-pixel-blink" />
        <div className="absolute top-48 right-[18%] w-1.5 h-1.5 bg-cyan-300 animate-pixel-blink [animation-delay:0.6s]" />
        <div className="absolute bottom-32 left-1/3 w-1 h-1 bg-pink-300 animate-pixel-blink [animation-delay:1.1s]" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-yellow-300 animate-pixel-blink [animation-delay:1.6s]" />
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/15 border border-purple-400/40 text-xs sm:text-sm font-bold uppercase tracking-wider text-purple-200 mb-5 shadow-md">
            <span className="w-2 h-2 bg-emerald-400 animate-pixel-blink" />
            <span>Open for Internships &amp; Research</span>
          </div>

          {/* Name Heading placed side-along with intro */}
          <h1 className="font-hero text-2xl sm:text-3xl md:text-4xl xl:text-5xl text-white uppercase pixel-text-glow">
            HI, I&apos;M <br />
            <span
              className="glitch bg-gradient-to-r from-purple-300 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent"
              data-text="KARTHAVYA"
              title="Karthavya"
            >
              KARTHAVYA
            </span>
          </h1>

          {/* Intro Headline */}
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-indigo-50 tracking-tight mt-5">
            {portfolioData.personal.introHeadline}
          </h2>

          {/* Bio / Intro Paragraph */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mt-3.5 max-w-xl font-normal">
            {portfolioData.personal.introText}
          </p>

          {/* Credentials / Details */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-slate-400 font-medium mt-6 pt-6 border-t border-indigo-300/20 w-full max-w-xl">
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

          {/* Terminal role ticker */}
          <div className="mt-4 flex items-center gap-2 font-mono text-sm sm:text-base text-cyan-200/90">
            <span className="text-purple-400">&gt;_</span>
            <span className="text-indigo-400/80">role:</span>
            <Typewriter words={HERO_ROLES} className="text-cyan-200" />
          </div>

          {/* Action Buttons: 3 buttons in one div in one line below intro in phone mode (lg:hidden) */}
          <div className="flex lg:hidden flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-6 z-30 w-full max-w-xl">
            {/* Explore Projects Button */}
            <a
              href="#projects"
              onTouchStart={triggerReaction}
              onClick={triggerReaction}
              className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-purple-600 to-indigo-600 border border-purple-400/40 hover:from-purple-500 hover:to-indigo-500 hover:border-purple-300 shadow-md shadow-purple-500/20 transition-all cursor-pointer group shrink-0"
              title="Jump to Featured Projects"
            >
              <span>Explore Projects</span>
              <ArrowDown className="w-3.5 h-3.5 text-purple-200 group-hover:translate-y-0.5 transition-transform" />
            </a>

            {/* GitHub Button */}
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-slate-200 bg-indigo-400/10 border border-indigo-300/20 hover:border-white/30 hover:bg-indigo-400/15 hover:text-white transition-all shadow-sm shrink-0"
              title="View GitHub Profile (@KarthavyaS)"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            {/* LeetCode Button */}
            <a
              href={portfolioData.personal.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-amber-300 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 hover:border-amber-500/50 hover:text-white transition-all shadow-sm shrink-0"
              title="View LeetCode Profile (@karthavya_s)"
            >
              <LeetcodeIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>LeetCode</span>
            </a>
          </div>
        </motion.div>

        {/* Right Side: Avatar with Interactive Animation Above Head + Buttons Below Avatar on Desktop (lg:col-span-5) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center order-1 lg:order-2">
          {/* Avatar Container */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[410px] lg:h-[410px] flex items-center justify-center">
            
            {/* Animated Floating Speech Badge Above Head (Always visible & animated on Mobile & Desktop) */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{
                opacity: 1,
                y: isReacting ? -10 : [0, -6, 0],
                scale: isReacting ? 1.08 : 1,
              }}
              transition={
                isReacting
                  ? { type: "spring", stiffness: 350, damping: 15 }
                  : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
              }
              onClick={triggerReaction}
              onTouchStart={triggerReaction}
              className="absolute -top-4 sm:-top-6 left-1/2 -translate-x-1/2 z-30 cursor-pointer pointer-events-auto"
              title="Click or tap to react!"
            >
              <div
                className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full shadow-xl backdrop-blur-md border text-[11px] sm:text-xs font-bold flex items-center gap-1.5 transition-all duration-300 ${
                  isReacting
                    ? "bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white border-white/40 shadow-purple-500/50 scale-105"
                    : "bg-[#0e1235]/90 text-purple-200 border-purple-500/40 shadow-black/80 hover:border-purple-400"
                }`}
              >
                <Sparkles
                  className={`w-3.5 h-3.5 ${
                    isReacting
                      ? "text-yellow-300 animate-spin"
                      : "text-yellow-400 animate-pulse"
                  }`}
                />
                <span className="whitespace-nowrap">
                  {isReacting ? "Let's explore! 🚀" : "Explore my work! ✨"}
                </span>
              </div>
              {/* Bubble pointer */}
              <div
                className={`w-2 h-2 rotate-45 mx-auto -mt-1 border-r border-b transition-colors duration-300 ${
                  isReacting
                    ? "bg-pink-600 border-white/40"
                    : "bg-[#0e1235] border-purple-500/40"
                }`}
              />
            </motion.div>

            {/* 3D Interactive Avatar */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{
                scale: isReacting || isCtaHovered ? 1.05 : 1,
                y: isReacting || isCtaHovered ? -6 : 0,
                rotate: isReacting || isCtaHovered ? -2 : 0,
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
              onClick={triggerReaction}
              onTouchStart={triggerReaction}
              className="relative w-full h-full transition-transform z-10 cursor-pointer"
            >
              {/* Ambient backlight glow behind avatar */}
              <div
                className={`absolute inset-4 rounded-full bg-gradient-to-tr from-purple-600/35 via-pink-500/25 to-transparent blur-2xl -z-10 transition-opacity duration-300 ${
                  isReacting || isCtaHovered ? "opacity-100 scale-110" : "opacity-80"
                }`}
              />

              {/* Pixel corner markers framing the avatar */}
              <span className="pointer-events-none absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-purple-300/60" />
              <span className="pointer-events-none absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-pink-300/60" />
              <span className="pointer-events-none absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-pink-300/60" />
              <span className="pointer-events-none absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-purple-300/60" />

              {/* Avatar Image with an always-on RGB glitch */}
              <span className="glitch-avatar w-full h-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/avatar.png"
                  alt="3D cartoon avatar of Karthavya"
                  className="w-full h-full object-contain drop-shadow-[6px_10px_0_rgba(5,7,30,0.55)] filter"
                />
              </span>
            </motion.div>

            {/* Terminal greeting beside the avatar */}
            <div className="absolute bottom-1 left-0 sm:-left-2 z-30 pixel-corners border-2 border-purple-400/50 bg-[#080b28]/95 px-2.5 py-2 shadow-[3px_3px_0_rgba(4,6,26,0.9)] backdrop-blur-sm select-none">
              <span className="font-mono text-[11px] sm:text-xs text-pink-300">&gt;_</span>
              <span className="font-mono text-[11px] sm:text-xs text-indigo-100"> hello world</span>
              <span className="ml-1 inline-block h-2.5 w-1.5 align-middle bg-pink-300 animate-pixel-blink" aria-hidden="true" />
            </div>
          </div>

          {/* Action Buttons: 3 buttons in one div in one line below avatar on desktop (hidden on phone, lg:flex) */}
          <div className="hidden lg:flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-6 sm:mt-8 z-30">
            {/* Explore Projects Button */}
            <a
              href="#projects"
              onMouseEnter={() => handleCtaHover(true)}
              onMouseLeave={() => handleCtaHover(false)}
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-purple-600 to-indigo-600 border border-purple-400/40 hover:from-purple-500 hover:to-indigo-500 hover:border-purple-300 shadow-md shadow-purple-500/20 transition-all cursor-pointer group shrink-0"
              title="Jump to Featured Projects"
            >
              <span>Explore Projects</span>
              <ArrowDown className="w-3.5 h-3.5 text-purple-200 group-hover:translate-y-0.5 transition-transform" />
            </a>

            {/* GitHub Button */}
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-slate-200 bg-indigo-400/10 border border-indigo-300/20 hover:border-white/30 hover:bg-indigo-400/15 hover:text-white transition-all shadow-sm shrink-0"
              title="View GitHub Profile (@KarthavyaS)"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            {/* LeetCode Button */}
            <a
              href={portfolioData.personal.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-amber-300 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 hover:border-amber-500/50 hover:text-white transition-all shadow-sm shrink-0"
              title="View LeetCode Profile (@karthavya_s)"
            >
              <LeetcodeIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>LeetCode</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
