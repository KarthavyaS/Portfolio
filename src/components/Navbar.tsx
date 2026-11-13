"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Menu, X, Briefcase, Search, Sparkles, Terminal } from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import { portfolioData } from "@/data/portfolio";

interface NavbarProps {
  recruiterMode?: boolean;
  onToggleRecruiterMode?: () => void;
  onOpenCommandPalette?: () => void;
  onOpenTerminal?: () => void;
}

export default function Navbar({
  recruiterMode = false,
  onToggleRecruiterMode,
  onOpenCommandPalette,
  onOpenTerminal,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#06070a]/85 backdrop-blur-md border-b border-white/10 py-3 shadow-lg shadow-black/40"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#"
          className="group flex items-center gap-2.5 text-slate-100 no-underline font-display tracking-wider text-lg sm:text-xl font-extrabold"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="group-hover:text-purple-400 transition-colors uppercase">
            {portfolioData.personal.nickname}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          {portfolioData.navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="hover:text-white transition-colors relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-purple-500 after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions (GitHub, Resume, Recruiter Mode, Cmd+K, CLI) */}
        <div className="hidden sm:flex items-center gap-2.5 md:gap-3">
          {/* CLI Button */}
          {onOpenTerminal && (
            <button
              onClick={onOpenTerminal}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono text-purple-300 bg-purple-500/10 border border-purple-500/30 hover:border-purple-500/60 hover:bg-purple-500/20 hover:text-white transition-all shadow-sm"
              title="Launch Interactive Terminal"
            >
              <Terminal className="w-3.5 h-3.5 text-purple-400" />
              <span>&gt;_ CLI</span>
            </button>
          )}

          {/* Command Palette Trigger */}
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-slate-400 bg-white/5 border border-white/10 hover:border-purple-500/40 hover:text-slate-200 transition-all"
              title="Quick Search (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="font-mono text-[10px] bg-white/10 px-1 py-0.5 rounded">⌘K</span>
            </button>
          )}

          {/* Recruiter Mode Toggle */}
          {onToggleRecruiterMode && (
            <button
              onClick={onToggleRecruiterMode}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border ${
                recruiterMode
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm shadow-emerald-500/20"
                  : "bg-white/5 text-slate-300 border-white/10 hover:border-emerald-500/40 hover:text-white"
              }`}
              title="Toggle Clean ATS Resume View"
            >
              <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
              <span>{recruiterMode ? "Standard View" : "Recruiter Mode"}</span>
            </button>
          )}

          {/* GitHub Button */}
          <a
            href={portfolioData.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-slate-200 bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 hover:text-white transition-all shadow-sm"
            title="View GitHub Profile"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>

          {/* Resume Pill */}
          <a
            href={portfolioData.personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-slate-200 bg-purple-500/10 border border-purple-500/30 hover:border-purple-500/60 hover:bg-purple-500/20 hover:text-white transition-all shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-purple-400" />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          {onOpenTerminal && (
            <button
              onClick={onOpenTerminal}
              className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300"
              title="Launch Terminal"
            >
              <Terminal className="w-4 h-4" />
            </button>
          )}
          {onToggleRecruiterMode && (
            <button
              onClick={onToggleRecruiterMode}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-emerald-400"
              title="Toggle Recruiter Mode"
            >
              <Briefcase className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-200 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden border-b border-white/10 bg-[#0c0f17]/95 backdrop-blur-xl px-4 py-6"
          >
            <div className="flex flex-col gap-4">
              {portfolioData.navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-semibold text-slate-200 hover:text-white py-1"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
                <a
                  href={portfolioData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-white"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub Profile</span>
                </a>
                <a
                  href={portfolioData.personal.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-purple-600 text-sm font-semibold text-white"
                >
                  <FileText className="w-4 h-4" />
                  <span>Download Resume PDF</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
