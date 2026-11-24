"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, FolderGit2 } from "lucide-react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { portfolioData, Project } from "@/data/portfolio";

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    activeCategory === "All"
      ? portfolioData.projects
      : portfolioData.projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300 mb-3">
          <FolderGit2 className="w-4 h-4" />
          <span className="font-display text-[9px] tracking-wider text-purple-400/80">01</span>
          <span className="text-slate-500/60">{"//"}</span>
          <span>Engineering Showcase</span>
        </div>
        <h2 className="text-lg sm:text-xl md:text-2xl font-display text-white uppercase pixel-text-glow">
          <span className="glitch" data-text="Projects & Research">
            Projects &amp; Research
          </span>
        </h2>
        <div className="pixel-divider w-20 mx-auto mt-4" aria-hidden="true" />
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mt-3">
          Deep dives into AI models, accessibility platforms, logic engines, and data analytics systems.
        </p>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {portfolioData.projectCategories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-2 text-xs font-bold uppercase tracking-wider border-2 transition-all duration-150 active:translate-y-0.5 ${
                  isActive
                    ? "bg-purple-600 text-white border-purple-300/60 shadow-[3px_3px_0_rgba(5,7,27,0.9)]"
                    : "bg-indigo-400/10 text-slate-300 border-indigo-300/15 hover:text-white hover:bg-indigo-400/20 hover:border-purple-400/40"
                }`}
                aria-pressed={isActive}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid (Balanced 2x2 Layout) */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto"
      >
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpenModal={(p) => setSelectedProject(p)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

