"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  FolderGit2,
  Layers,
  GraduationCap,
  Mail,
  FileText,
  Briefcase,
  Terminal,
  Copy,
  Check,
  X,
  ExternalLink,
} from "lucide-react";
import { portfolioData } from "@/data/portfolio";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleRecruiterMode: () => void;
  onOpenTerminal: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onToggleRecruiterMode,
  onOpenTerminal,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery("");
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const actions = [
    {
      id: "projects",
      title: "Jump to Projects",
      subtitle: "View case studies & major software systems",
      icon: <FolderGit2 className="w-4 h-4 text-purple-400" />,
      perform: () => {
        window.location.hash = "#projects";
        onClose();
      },
    },
    {
      id: "skills",
      title: "Jump to Skills",
      subtitle: "Explore languages, frameworks & AI concepts",
      icon: <Layers className="w-4 h-4 text-pink-400" />,
      perform: () => {
        window.location.hash = "#skills";
        onClose();
      },
    },
    {
      id: "experience",
      title: "Jump to Experience",
      subtitle: "Review education, IEEE research & milestones",
      icon: <GraduationCap className="w-4 h-4 text-blue-400" />,
      perform: () => {
        window.location.hash = "#experience";
        onClose();
      },
    },
    {
      id: "contact",
      title: "Jump to Contact",
      subtitle: "Send a message or find social links",
      icon: <Mail className="w-4 h-4 text-emerald-400" />,
      perform: () => {
        window.location.hash = "#contact";
        onClose();
      },
    },
    {
      id: "recruiter",
      title: "Toggle Recruiter Mode",
      subtitle: "Switch to a clean single-column ATS resume view",
      icon: <Briefcase className="w-4 h-4 text-amber-400" />,
      perform: () => {
        onToggleRecruiterMode();
        onClose();
      },
    },
    {
      id: "resume",
      title: "Download Resume (PDF)",
      subtitle: "Open official ATS-friendly resume",
      icon: <FileText className="w-4 h-4 text-purple-400" />,
      perform: () => {
        window.open(portfolioData.personal.resumeUrl, "_blank");
        onClose();
      },
    },
    {
      id: "terminal",
      title: "Launch Interactive Mini-Terminal",
      subtitle: "CLI interface with help, skills, projects commands",
      icon: <Terminal className="w-4 h-4 text-cyan-400" />,
      perform: () => {
        onClose();
        onOpenTerminal();
      },
    },
    {
      id: "copy-email",
      title: copiedEmail ? "Email Copied!" : "Copy Email Address",
      subtitle: portfolioData.personal.email,
      icon: copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />,
      perform: () => {
        navigator.clipboard.writeText(portfolioData.personal.email);
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      },
    },
    {
      id: "github",
      title: "Visit GitHub Profile",
      subtitle: portfolioData.personal.github,
      icon: <ExternalLink className="w-4 h-4 text-slate-300" />,
      perform: () => {
        window.open(portfolioData.personal.github, "_blank");
        onClose();
      },
    },
  ];

  const filteredActions = actions.filter((action) =>
    action.title.toLowerCase().includes(query.toLowerCase()) ||
    action.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Command Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -20 }}
          transition={{ duration: 0.15 }}
          className="relative w-full max-w-xl bg-[#0c0f17] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10"
        >
          {/* Search Input */}
          <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or jump to section..."
              autoFocus
              className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
            />
            <button
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Action List */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-1">
            {filteredActions.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">
                No matching commands found.
              </div>
            ) : (
              filteredActions.map((action) => (
                <button
                  key={action.id}
                  onClick={action.perform}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-purple-500/40 transition-colors">
                      {action.icon}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                        {action.title}
                      </div>
                      <div className="text-xs text-slate-400">
                        {action.subtitle}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-mono text-slate-500 group-hover:text-slate-300 transition-colors">
                    Select
                  </span>
                </button>
              ))
            )}
          </div>

          {/* Palette Footer */}
          <div className="px-4 py-2.5 bg-black/40 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-3">
              <span>Navigation: <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">↑</kbd> <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">↓</kbd></span>
              <span>Open: <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">Enter</kbd></span>
            </div>
            <span>Close: <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">Esc</kbd></span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

