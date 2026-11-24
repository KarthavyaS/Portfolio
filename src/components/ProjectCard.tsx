"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import { Project } from "@/data/portfolio";

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
  index?: number;
}

export default function ProjectCard({ project, onOpenModal, index = 0 }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();

  // 3D Tilt values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-7, 7]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 30 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      style={
        prefersReducedMotion
          ? undefined
          : { rotateX, rotateY, transformStyle: "preserve-3d" }
      }
      whileHover={prefersReducedMotion ? undefined : { y: -6 }}
      className="group pixel-corners relative flex flex-col justify-between bg-[#0e1235]/90 border-2 border-indigo-300/20 hover:border-purple-400/60 p-6 sm:p-7 shadow-xl shadow-black/40 hover:shadow-purple-500/15 transition-colors duration-300"
    >
      {/* Pixel frame corners */}
      <span className="pointer-events-none absolute left-1.5 top-1.5 h-2.5 w-2.5 border-l-2 border-t-2 border-cyan-300/40 group-hover:border-cyan-300/90 transition-colors" />
      <span className="pointer-events-none absolute right-1.5 top-1.5 h-2.5 w-2.5 border-r-2 border-t-2 border-pink-300/40 group-hover:border-pink-300/90 transition-colors" />
      <span className="pointer-events-none absolute bottom-1.5 left-1.5 h-2.5 w-2.5 border-b-2 border-l-2 border-pink-300/40 group-hover:border-pink-300/90 transition-colors" />
      <span className="pointer-events-none absolute bottom-1.5 right-1.5 h-2.5 w-2.5 border-b-2 border-r-2 border-cyan-300/40 group-hover:border-cyan-300/90 transition-colors" />

      {/* Hover wash + scan sweep */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="card-sweep absolute inset-x-0 -top-16 h-16 bg-gradient-to-b from-transparent via-cyan-300/10 to-transparent" />
        <div className="crt-lines absolute inset-0 opacity-25" />
      </div>

      {/* Card Content */}
      <div className="relative z-10 flex flex-col">
        {/* Category & Badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] uppercase tracking-wider font-bold px-2.5 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-300">
            {project.category}
          </span>
          {project.hasPlaceholder ? (
            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 animate-pixel-blink" />
              Active
            </span>
          ) : (
            <span className="font-mono text-[11px] text-indigo-300/50">
              #{String(index + 1).padStart(2, "0")}
            </span>
          )}
        </div>

        {/* Title & Tagline */}
        <h3 className="text-sm sm:text-base font-display text-white leading-relaxed group-hover:text-purple-200 transition-colors">
          <span className="glitch" data-text={project.title}>
            {project.title}
          </span>
        </h3>
        <p className="text-xs font-semibold text-cyan-300/80 tracking-wide mt-1.5 font-mono">
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
              className="text-xs font-medium px-2.5 py-1 bg-indigo-400/10 border border-indigo-300/20 text-slate-200 hover:border-cyan-400/50 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Actions / Links Bottom Row */}
      <div className="relative z-10 pt-5 mt-6 border-t border-indigo-300/10 flex items-center justify-between gap-3">
        {/* Detail Modal Trigger */}
        <button
          onClick={() => onOpenModal(project)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-cyan-300 transition-colors uppercase tracking-wider group/btn"
          aria-label={`Open case study for ${project.title}`}
        >
          <span className="text-purple-400 group-hover/btn:text-cyan-300">▶</span>
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
              className="p-2 bg-indigo-400/10 border border-indigo-300/20 text-slate-300 hover:text-white hover:bg-indigo-400/15 hover:border-purple-500/50 transition-colors"
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
              className="p-2 bg-indigo-400/10 border border-indigo-300/20 text-slate-300 hover:text-white hover:bg-indigo-400/15 hover:border-purple-500/50 transition-colors"
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
