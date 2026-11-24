"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, ArrowRight, Sparkles, AlertCircle } from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import { Project } from "@/data/portfolio";

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
}

export default function ProjectCard({ project, onOpenModal }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-7, 7]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col justify-between rounded-2xl bg-[#0e1235]/90 border border-indigo-300/20 hover:border-purple-500/50 p-6 sm:p-7 shadow-xl shadow-black/40 hover:shadow-purple-500/10 transition-all duration-300"
    >
      {/* Subtle top gradient glow on card hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Card Content */}
      <div className="relative z-10 flex flex-col">
        {/* Category & Badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300">
            {project.category}
          </span>
          {project.hasPlaceholder && (
            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Active Project
            </span>
          )}
        </div>

        {/* Title & Tagline */}
        <h3 className="text-lg sm:text-xl font-display text-white group-hover:text-purple-300 transition-colors tracking-tight">
          {project.title}
        </h3>
        <p className="text-xs font-semibold text-purple-400/90 tracking-wide mt-0.5">
          {project.tagline}
        </p>

        {/* One-Line Summary */}
        <p className="text-sm text-slate-300 mt-3 leading-relaxed line-clamp-3">
          {project.summary}
        </p>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-2 mt-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs font-medium px-3 py-1.5 rounded-lg bg-indigo-400/10 border border-indigo-300/20 text-slate-200 hover:border-purple-500/40 hover:bg-indigo-400/15 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Actions / Links Bottom Row */}
      <div className="relative z-10 pt-6 mt-6 border-t border-indigo-300/10 flex items-center justify-between gap-3">
        {/* Detail Modal Trigger */}
        <button
          onClick={() => onOpenModal(project)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-purple-400 transition-colors uppercase tracking-wider group/btn"
        >
          <span>Case Study</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </button>

        {/* Links: GitHub & Live Demo */}
        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-indigo-400/10 border border-indigo-300/20 text-slate-300 hover:text-white hover:bg-indigo-400/15 hover:border-purple-500/40 transition-all"
              title="GitHub Repository Placeholder"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-indigo-400/10 border border-indigo-300/20 text-slate-300 hover:text-white hover:bg-indigo-400/15 hover:border-purple-500/40 transition-all"
              title="Live Deployed Application"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
