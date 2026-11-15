"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Cpu, Database, Globe, Wrench, Layers } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export default function SkillsSection() {
  const groupIcons = [
    <Code2 key="lang" className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />,
    <Cpu key="ai" className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400" />,
    <Database key="data" className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />,
    <Globe key="web" className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />,
    <Wrench key="tools" className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />,
  ];

  return (
    <section id="skills" className="py-24 border-t border-white/5 bg-[#080b12]/50 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300 mb-3">
          <Layers className="w-4 h-4" />
          <span>Core Capabilities</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight uppercase">
          Technical Skills
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto mt-3">
          Foundational languages, AI inference algorithms, analytical frameworks, and engineering toolsets.
        </p>
      </div>

      {/* 2 Boxes in First Line, 2 Boxes in Second Line (Generously Sized) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
          {portfolioData.skillGroups.map((group, idx) => (
            <motion.div
              key={group.name}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              className="p-6 sm:p-8 rounded-3xl bg-[#0c0f17]/90 border border-white/10 hover:border-purple-500/40 hover:shadow-2xl hover:shadow-purple-500/10 active:border-purple-400 transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center gap-3.5 mb-5 pb-3.5 border-b border-white/5">
                  <div className="p-2.5 sm:p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-105 group-hover:border-purple-400/40 transition-transform shrink-0">
                    {groupIcons[idx % groupIcons.length]}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider">
                    {group.name}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs sm:text-sm px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-200 font-medium hover:border-purple-500/40 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
