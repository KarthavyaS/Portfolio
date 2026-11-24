"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Award,
  Users,
  Flame,
  Sparkles,
  Trophy,
  Quote,
} from "lucide-react";
import confetti from "canvas-confetti";
import { portfolioData, GalleryMoment } from "@/data/portfolio";

export default function MomentsShowcase() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [lightboxMoment, setLightboxMoment] = useState<GalleryMoment | null>(null);

  const moments = portfolioData.galleryMoments;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % moments.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + moments.length) % moments.length);
  };

  // Keyboard arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxMoment) {
        if (e.key === "Escape") setLightboxMoment(null);
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "ArrowLeft") handlePrev();
        return;
      }
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const currentMoment = moments[currentIndex] || moments[0];

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#a855f7", "#ec4899", "#fbbf24", "#3b82f6"],
    });
  };

  return (
    <section id="moments" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative select-none">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-pink-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-xs font-bold text-pink-300 mb-3">
          <Camera className="w-4 h-4 text-pink-400" />
          <span>Moments &bull; Life in Tech</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-display text-white uppercase pixel-text-glow">
          Moments
        </h2>
        <div className="pixel-divider w-20 mx-auto mt-4" aria-hidden="true" />
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mt-2.5">
          A stacked gallery of hackathon sprints, team brainstorms, and stage honors. Slide or swipe through the deck to explore memories.
        </p>
      </div>

      {/* 3D Stacked Photos Deck Stage */}
      <div className="relative max-w-4xl mx-auto z-10">
        {/* Navigation Arrows (Flanking Stack) */}
        <button
          onClick={handlePrev}
          className="absolute -left-2 sm:-left-6 md:-left-12 top-1/2 -translate-y-1/2 z-50 p-2.5 sm:p-3.5 rounded-full bg-black/80 hover:bg-purple-600 text-white backdrop-blur-md border border-indigo-300/30 transition-all cursor-pointer shadow-xl hover:scale-110 active:scale-95"
          aria-label="Previous photo in stack"
          title="Slide Previous (◄)"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute -right-2 sm:-right-6 md:-right-12 top-1/2 -translate-y-1/2 z-50 p-2.5 sm:p-3.5 rounded-full bg-black/80 hover:bg-purple-600 text-white backdrop-blur-md border border-indigo-300/30 transition-all cursor-pointer shadow-xl hover:scale-110 active:scale-95"
          aria-label="Next photo in stack"
          title="Slide Next (►)"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* The Card Stack Container */}
        <div className="relative h-[280px] sm:h-[380px] md:h-[440px] w-full max-w-[340px] sm:max-w-[540px] md:max-w-[660px] mx-auto flex items-center justify-center">
          {moments.map((moment, idx) => {
            // Calculate offset relative to currentIndex (0 = top, 1 = behind, 2 = further behind)
            const offset = (idx - currentIndex + moments.length) % moments.length;
            const isTop = offset === 0;

            // Only render top 4 cards for optimal DOM performance
            if (offset > 3) return null;

            // Stack transform presets
            const scale = 1 - offset * 0.055;
            const translateY = offset * 14;
            const rotate = offset === 0 ? 0 : offset === 1 ? 3 : offset === 2 ? -3.5 : 2;
            const opacity = offset === 0 ? 1 : 1 - offset * 0.22;
            const zIndex = 40 - offset * 10;

            return (
              <motion.div
                key={moment.id}
                layout
                style={{
                  zIndex,
                  transformOrigin: "bottom center",
                }}
                animate={{
                  scale,
                  y: translateY,
                  rotate,
                  opacity,
                }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 24,
                }}
                drag={isTop ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.65}
                onDragEnd={(_e, { offset: dragOffset, velocity }) => {
                  if (dragOffset.x < -45 || velocity.x < -350) {
                    handleNext();
                  } else if (dragOffset.x > 45 || velocity.x > 350) {
                    handlePrev();
                  }
                }}
                onClick={() => {
                  if (!isTop) {
                    setCurrentIndex(idx);
                  }
                }}
                className={`absolute inset-0 w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0e1235] border border-indigo-300/30 shadow-2xl transition-shadow ${
                  isTop
                    ? "cursor-grab active:cursor-grabbing shadow-purple-950/60 ring-1 ring-white/25"
                    : "cursor-pointer hover:border-purple-400/50"
                }`}
              >
                {/* Photo Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={moment.image}
                  alt={moment.title}
                  draggable={false}
                  className="w-full h-full object-cover object-center pointer-events-none select-none"
                />

                {/* Subtle top vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

                {/* Top Badges */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between pointer-events-auto">
                  <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-indigo-300/30 text-[11px] sm:text-xs font-bold text-white shadow-lg flex items-center gap-1.5">
                    {moment.category === "Solo & Honors" && <Award className="w-3.5 h-3.5 text-amber-400" />}
                    {moment.category === "Team Hackathons" && <Users className="w-3.5 h-3.5 text-purple-400" />}
                    {moment.category === "Moments" && <Flame className="w-3.5 h-3.5 text-pink-400" />}
                    <span>{moment.tag}</span>
                  </span>

                  {isTop && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxMoment(moment);
                      }}
                      className="p-2 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md border border-indigo-300/30 text-white transition-transform hover:scale-110 active:scale-95 shadow-md cursor-pointer"
                      title="Enlarge fullscreen"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Bottom title pill on card */}
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between pointer-events-none">
                  <div className="bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-indigo-300/25 max-w-[85%]">
                    <p className="text-xs sm:text-sm font-bold text-white truncate">
                      {moment.title}
                    </p>
                  </div>
                  <div className="bg-purple-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-purple-500/30 text-[11px] font-mono text-purple-200">
                    {idx + 1}/{moments.length}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Small Description Below in Quotes Format */}
        {currentMoment && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMoment.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="mt-8 sm:mt-10 max-w-2xl mx-auto text-center px-4 space-y-3"
            >
              {/* Quote Block */}
              <div className="relative inline-flex items-center justify-center px-4 sm:px-8 py-3 rounded-2xl bg-indigo-400/[0.06] border border-indigo-300/20 shadow-lg">
                <Quote className="w-4 h-4 text-purple-400 shrink-0 self-start mt-0.5 mr-2 opacity-75" />
                <p className="text-sm sm:text-base md:text-lg font-medium italic text-slate-100 tracking-wide leading-relaxed font-sans">
                  &ldquo;{currentMoment.caption}&rdquo;
                </p>
                <Quote className="w-4 h-4 text-purple-400 shrink-0 self-end mb-0.5 ml-2 opacity-75 rotate-180" />
              </div>

              {/* Attribution and Context Details */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-0.5 text-xs">
                <span className="font-bold text-white tracking-wide">
                  {currentMoment.title}
                </span>
                <span className="text-slate-500">&bull;</span>
                <span className="text-purple-400 font-semibold">
                  {currentMoment.tag}
                </span>

                {currentMoment.id === "solo-tcs-award" && (
                  <button
                    onClick={triggerConfetti}
                    className="ml-2 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[11px] font-bold inline-flex items-center gap-1 hover:bg-amber-500/30 transition-all cursor-pointer"
                    title="Celebrate Rank 1"
                  >
                    <Trophy className="w-3 h-3 text-amber-400" />
                    <span>Celebrate 🏆</span>
                  </button>
                )}
              </div>

              <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">
                {currentMoment.details}
              </p>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Fullscreen Modal Lightbox */}
      <AnimatePresence>
        {lightboxMoment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-xl">
            {/* Close Button */}
            <button
              onClick={() => setLightboxMoment(null)}
              className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-indigo-400/15 hover:bg-white/20 text-white transition-all cursor-pointer"
              aria-label="Close fullscreen modal"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left / Right Navigation in Lightbox */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/60 hover:bg-purple-600 text-white backdrop-blur-md border border-indigo-300/30 transition-all cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/60 hover:bg-purple-600 text-white backdrop-blur-md border border-indigo-300/30 transition-all cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="max-w-4xl max-h-[92vh] flex flex-col items-center justify-center relative z-40"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative max-h-[70vh] rounded-2xl overflow-hidden border border-indigo-300/30 shadow-2xl bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentMoment.image}
                  alt={currentMoment.title}
                  className="max-h-[70vh] w-auto object-contain mx-auto"
                />
              </div>

              <div className="mt-4 text-center max-w-xl px-4 space-y-1.5">
                <blockquote className="text-sm sm:text-base font-medium italic text-slate-100">
                  &ldquo;{currentMoment.caption}&rdquo;
                </blockquote>
                <div className="text-xs text-purple-300 font-semibold">
                  {currentMoment.title} &bull; {currentMoment.tag}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
