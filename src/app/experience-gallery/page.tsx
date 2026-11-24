"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles, X, ChevronLeft, ChevronRight, Award, Users, Flame, Heart, Camera } from "lucide-react";
import confetti from "canvas-confetti";
import { portfolioData, GalleryMoment } from "@/data/portfolio";

export default function ExperienceGalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedMoment, setSelectedMoment] = useState<GalleryMoment | null>(null);

  const categories = [
    { label: "All", count: portfolioData.galleryMoments.length },
    { label: "Solo & Honors", count: 2 },
    { label: "Team Hackathons", count: 3 },
    { label: "Moments", count: 2 },
  ];

  const filteredMoments =
    activeCategory === "All"
      ? portfolioData.galleryMoments
      : portfolioData.galleryMoments.filter((m) => m.category === activeCategory);

  const handleCardClick = (moment: GalleryMoment) => {
    setSelectedMoment(moment);
    if (moment.id === "solo-tcs-award") {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#a855f7", "#ec4899", "#3b82f6", "#eab308"],
      });
    }
  };

  const handleNext = () => {
    if (!selectedMoment) return;
    const currentIndex = portfolioData.galleryMoments.findIndex((m) => m.id === selectedMoment.id);
    const nextIndex = (currentIndex + 1) % portfolioData.galleryMoments.length;
    setSelectedMoment(portfolioData.galleryMoments[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedMoment) return;
    const currentIndex = portfolioData.galleryMoments.findIndex((m) => m.id === selectedMoment.id);
    const prevIndex = (currentIndex - 1 + portfolioData.galleryMoments.length) % portfolioData.galleryMoments.length;
    setSelectedMoment(portfolioData.galleryMoments[prevIndex]);
  };

  return (
    <div className="min-h-screen text-slate-100 selection:bg-purple-600 selection:text-white py-10 px-4 sm:px-6 lg:px-8">
      {/* Background ambient lighting */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[360px] bg-purple-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[400px] bg-pink-600/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Navigation Bar */}
        <header className="flex items-center justify-between pb-6 border-b border-indigo-300/20">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-purple-400 hover:text-white transition-colors bg-indigo-400/10 hover:bg-indigo-400/15 border border-indigo-300/20 px-4 py-2 rounded-full"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </a>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">
              Live Memories &bull; REC Chennai
            </span>
          </div>
        </header>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-bold text-purple-300">
            <Camera className="w-4 h-4 text-pink-400 animate-bounce" />
            <span>Captured Live &amp; Unfiltered</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display text-white uppercase pixel-text-glow">
            Experience &amp; <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
              Hackathon Moments
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Real snapshots from 24-hour sprints, lab debugging marathons, winning awards on stage, and building intelligent software with passionate teammates.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-4">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.label;
              return (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(cat.label)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/30 scale-105"
                      : "bg-indigo-400/10 text-slate-300 hover:text-white hover:bg-indigo-400/15 border border-indigo-300/20"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className="ml-1.5 text-[10px] opacity-75">({cat.count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Playful Moments Grid: Solo Pictures First -> Team Pictures -> Moments */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          <AnimatePresence>
            {filteredMoments.map((moment, index) => {
              // Playful tilt rotations
              const tilts = ["rotate-1", "-rotate-1", "rotate-2", "-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];
              const tiltClass = tilts[index % tilts.length];

              return (
                <motion.div
                  key={moment.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  onClick={() => handleCardClick(moment)}
                  className={`group cursor-pointer rounded-2xl bg-[#0e1235] border border-indigo-300/25 p-4 pb-5 shadow-2xl transition-all duration-300 hover:scale-[1.03] hover:rotate-0 hover:border-purple-500/50 hover:shadow-purple-500/10 ${tiltClass}`}
                >
                  {/* Image container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={moment.image}
                      alt={moment.title}
                      className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Category sticker pill */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-indigo-300/30 text-[11px] font-bold text-white shadow-md flex items-center gap-1.5">
                      {moment.category === "Solo & Honors" && <Award className="w-3.5 h-3.5 text-amber-400" />}
                      {moment.category === "Team Hackathons" && <Users className="w-3.5 h-3.5 text-purple-400" />}
                      {moment.category === "Moments" && <Flame className="w-3.5 h-3.5 text-pink-400" />}
                      <span>{moment.tag}</span>
                    </div>

                    {/* Order indicator */}
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-purple-600/90 text-white text-[11px] font-bold flex items-center justify-center shadow">
                      {index + 1}
                    </div>
                  </div>

                  {/* Card Caption */}
                  <div className="mt-4 px-1 space-y-1.5">
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-300 transition-colors tracking-tight">
                      {moment.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                      {moment.caption}
                    </p>
                  </div>

                  {/* Footer hint */}
                  <div className="mt-3 pt-3 border-t border-indigo-300/10 flex items-center justify-between text-[11px] font-semibold text-purple-400">
                    <span>Click for full memory &amp; details</span>
                    <Sparkles className="w-3.5 h-3.5 text-yellow-300 group-hover:rotate-45 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Fullscreen Lightbox Modal */}
        <AnimatePresence>
          {selectedMoment && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedMoment(null)}
                className="fixed inset-0 bg-black/90 backdrop-blur-md"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#0e1235] border border-indigo-300/30 rounded-2xl shadow-2xl p-6 sm:p-8 z-10"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedMoment(null)}
                  className="absolute top-5 right-5 p-2 rounded-full bg-indigo-400/15 hover:bg-white/20 text-white transition-colors"
                  aria-label="Close lightbox"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Left/Right Navigation */}
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-indigo-300/30 transition-all z-20"
                  aria-label="Previous moment"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-indigo-300/30 transition-all z-20"
                  aria-label="Next moment"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Main Photo View */}
                <div className="w-full max-h-[60vh] rounded-xl overflow-hidden bg-black flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedMoment.image}
                    alt={selectedMoment.title}
                    className="max-h-[60vh] w-auto max-w-full object-contain mx-auto"
                  />
                </div>

                {/* Photo Story & Details */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {selectedMoment.category}
                    </span>
                    <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                      {selectedMoment.tag}
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-display text-white">
                    {selectedMoment.title}
                  </h2>

                  <p className="text-sm sm:text-base text-slate-200 font-medium">
                    {selectedMoment.caption}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-2 border-t border-indigo-300/20">
                    {selectedMoment.details}
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
