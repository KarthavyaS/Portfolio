"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ShieldCheck, CheckCircle2, User, Cpu, FileCode2 } from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import { Project } from "@/data/portfolio";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0e1235] border border-indigo-300/25 rounded-2xl shadow-2xl p-6 sm:p-8 z-10"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-indigo-400/10 border border-indigo-300/20 text-slate-400 hover:text-white hover:bg-indigo-400/15 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="pr-12">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-wider font-bold px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300">
                {project.category}
              </span>
              <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Case Study
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-display text-white tracking-tight leading-relaxed">
              {project.title}
            </h2>
            <p className="text-sm font-semibold text-purple-400 mt-1">
              {project.tagline}
            </p>
          </div>

          {/* My Role & Summary Banner */}
          <div className="mt-5 p-4 rounded-xl bg-indigo-400/[0.06] border border-indigo-300/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <User className="w-4 h-4 text-purple-400" />
              <span><strong>Role:</strong> {project.role}</span>
            </div>
            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-400/10 border border-indigo-300/20 text-xs font-semibold text-slate-200 hover:text-white hover:bg-indigo-400/15 transition-all"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 text-xs font-semibold text-white hover:bg-purple-500 transition-all shadow-md"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live App</span>
                </a>
              )}
            </div>
          </div>

          {/* Structured Deep Dive: Problem, Approach, Result */}
          <div className="mt-6 space-y-6 text-sm">
            {/* Problem Statement */}
            <div className="p-4 rounded-xl bg-red-500/[0.04] border border-red-500/20">
              <h4 className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5 mb-2">
                <ShieldCheck className="w-4 h-4" />
                The Problem
              </h4>
              <p className="text-slate-300 leading-relaxed">
                {project.problem}
              </p>
            </div>

            {/* Solution */}
            <div className="p-4 rounded-xl bg-purple-500/[0.04] border border-purple-500/20">
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5 mb-2">
                <Cpu className="w-4 h-4" />
                Solution
              </h4>
              <p className="text-slate-300 leading-relaxed">
                {project.approach}
              </p>
            </div>

            {/* Key Results & Impact */}
            <div className="p-4 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/20">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-2">
                <CheckCircle2 className="w-4 h-4" />
                Key Results &amp; Impact
              </h4>
              <p className="text-slate-300 leading-relaxed">
                {project.result}
              </p>
            </div>

            {/* Tech Stack Chips */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-3">
                <FileCode2 className="w-4 h-4 text-purple-400" />
                Technologies &amp; Tools Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-medium px-3 py-1.5 rounded-lg bg-indigo-400/10 border border-indigo-300/20 text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
