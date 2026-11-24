"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import MomentsShowcase from "@/components/MomentsShowcase";
import ContactSection from "@/components/ContactSection";
import RecruiterModeView from "@/components/RecruiterModeView";
import CommandPalette from "@/components/CommandPalette";
import EasterEggTerminal from "@/components/EasterEggTerminal";
import TechBackgroundAnimation from "@/components/TechBackgroundAnimation";
import PixelParticles from "@/components/PixelParticles";
import PixelCursor from "@/components/PixelCursor";
import BootIntro from "@/components/BootIntro";
import ScrollProgress from "@/components/ScrollProgress";
import PageTransition from "@/components/PageTransition";

export default function Home() {
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Load recruiter mode preference from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("recruiter-mode");
      if (saved === "true") setRecruiterMode(true);
    } catch {
      // Local storage not available
    }
  }, []);

  const handleToggleRecruiterMode = () => {
    setRecruiterMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("recruiter-mode", String(next));
      } catch {
        // Local storage error handling
      }
      return next;
    });
  };

  if (recruiterMode) {
    return (
      <RecruiterModeView onExit={() => handleToggleRecruiterMode()} />
    );
  }

  return (
    <div className="flex flex-col min-h-screen text-slate-100 selection:bg-purple-600 selection:text-white overflow-x-hidden relative">
      {/* Cinematic start screen (once per session, skipped for ATS view) */}
      <BootIntro />

      {/* Custom pixel cursor for fine pointers */}
      <PixelCursor />

      {/* Subtle Tech Animated Background (Floating code particles & circuit nodes) */}
      <TechBackgroundAnimation />
      <PixelParticles />

      {/* Sticky Navbar */}
      <Navbar
        recruiterMode={recruiterMode}
        onToggleRecruiterMode={handleToggleRecruiterMode}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Main Portfolio Sections */}
      <main className="flex-1">
        {/* Hero Section with 3D Avatar Parallax */}
        <Hero onOpenTerminal={() => setIsTerminalOpen(true)} />

        {/* Projects Section with 3D Tilt Cards & Deep Dive Modals */}
        <ProjectsSection />

        {/* Skills Section with 2-Row Infinite Marquee */}
        <SkillsSection />

        {/* Experience & Education Vertical Timeline */}
        <ExperienceSection />

        {/* Life in Tech & Hackathon Moments Showcase */}
        <MomentsShowcase />

        {/* Contact Form & Direct Links */}
        <ContactSection onOpenTerminal={() => setIsTerminalOpen(true)} />
      </main>

      {/* Command Palette Spotlight (Ctrl / Cmd + K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onToggleRecruiterMode={handleToggleRecruiterMode}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Easter Egg Interactive Mini-Terminal */}
      <EasterEggTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      {/* Bottom HUD: run progress + score */}
      <ScrollProgress />

      {/* Curtain sweep between sections when navigating */}
      <PageTransition />
    </div>
  );
}
