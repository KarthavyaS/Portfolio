"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Code2, Cpu, Database, Globe, Wrench, Layers } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

/**
 * Skill mastery shown as arcade XP. Levels are static, intentional estimates
 * of where each stack sits rather than computed values.
 */
const GROUP_LEVELS: Record<string, { level: number; xp: number }> = {
  "Languages & Frameworks": { level: 8, xp: 84 },
  "AI & Machine Learning": { level: 7, xp: 74 },
  "Data & Analytics": { level: 6, xp: 66 },
  "Web & App Development": { level: 6, xp: 62 },
  "Tools & Platforms": { level: 5, xp: 58 },
};

export default function SkillsSection() {
  const prefersReducedMotion = useReducedMotion();

  const groupIcons = [
    <Code2 key="lang" className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />,
    <Cpu key="ai" className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400" />,
    <Database key="data" className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />,
    <Globe key="web" className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />,
    <Wrench key="tools" className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />,
  ];

  return (
    <section id="skills" className="py-24 border-t border-indigo-300/10 bg-[#0a0e2c]/50 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300 mb-3">
          <Layers className="w-4 h-4" />
          <span className="font-display text-[9px] tracking-wider text-purple-400/80">02</span>
          <span className="text-slate-500/60">{"//"}</span>
          <span>Core Capabilities</span>
        </div>
        <h2 className="text-lg sm:text-xl md:text-2xl font-display text-white uppercase pixel-text-glow">
          <span className="glitch" data-text="Technical Skills">
            Technical Skills
          </span>
        </h2>
        <div className="pixel-divider w-20 mx-auto mt-4" aria-hidden="true" />
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto mt-3">
          Foundational languages, AI inference algorithms, analytical frameworks, and engineering toolsets.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
          {portfolioData.skillGroups.map((group, idx) => {
            const stats = GROUP_LEVELS[group.name] ?? { level: 5, xp: 55 };
            return (
              <motion.div
                key={group.name}
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 26 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                className="pixel-panel group relative p-6 sm:p-8 bg-[#0e1235]/90 border border-indigo-300/20 hover:border-purple-500/50 transition-colors duration-300 flex flex-col justify-between"
              >
                {/* Corner ticks */}
                <span className="pointer-events-none absolute left-1.5 top-1.5 h-2 w-2 border-l-2 border-t-2 border-purple-400/40 group-hover:border-pink-400/70" />
                <span className="pointer-events-none absolute right-1.5 top-1.5 h-2 w-2 border-r-2 border-t-2 border-purple-400/40 group-hover:border-pink-400/70" />

                <div>
                  <div className="flex items-center gap-3.5 mb-5 pb-3.5 border-b border-indigo-300/10">
                    <div className="p-2.5 sm:p-3 bg-indigo-400/10 border border-indigo-300/20 group-hover:border-purple-400/40 transition-colors shrink-0">
                      {groupIcons[idx % groupIcons.length]}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm sm:text-base font-display text-white uppercase tracking-wide leading-relaxed">
                        {group.name}
                      </h3>
                      <p className="font-mono text-xs text-purple-300/70 mt-1">
                        LVL {String(stats.level).padStart(2, "0")} · {stats.xp} / 100 XP
                      </p>
                    </div>
                  </div>

                  {/* XP meter */}
                  <div className="mb-5">
                    <div className="xp-track">
                      <motion.div
                        className="xp-fill"
                        initial={prefersReducedMotion ? { width: `${stats.xp}%` } : { width: 0 }}
                        whileInView={{ width: `${stats.xp}%` }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 1, delay: 0.15 + idx * 0.06, ease: "easeOut" }}
                        role="progressbar"
                        aria-valuenow={stats.xp}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${group.name} proficiency`}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs sm:text-sm px-3 py-1.5 bg-indigo-400/10 border border-indigo-300/20 text-slate-200 font-medium hover:border-cyan-400/50 hover:bg-indigo-400/15 hover:text-white transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
