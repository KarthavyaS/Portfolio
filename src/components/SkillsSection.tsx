"use client";

import React from "react";
import { Code2, Cpu, Database, Globe, Wrench, Layers } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export default function SkillsSection() {
  const groupIcons = [
    <Code2 key="lang" className="w-5 h-5 text-purple-400" />,
    <Cpu key="ai" className="w-5 h-5 text-pink-400" />,
    <Database key="data" className="w-5 h-5 text-blue-400" />,
    <Globe key="web" className="w-5 h-5 text-emerald-400" />,
    <Wrench key="tools" className="w-5 h-5 text-amber-400" />,
  ];

  return (
    <section id="skills" className="py-24 border-t border-white/5 bg-[#080b12]/50 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300 mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>Core Capabilities</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight uppercase">
          Technical Skills &amp; Stack
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto mt-3">
          Foundational languages, AI inference algorithms, analytical frameworks, and engineering toolsets.
        </p>
      </div>

      {/* Categorized Group Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.skillGroups.map((group, idx) => (
            <div
              key={group.name}
              className="p-6 rounded-2xl bg-[#0c0f17]/90 border border-white/10 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300"
            >
              <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-white/5">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                  {groupIcons[idx % groupIcons.length]}
                </div>
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  {group.name}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-200 font-medium hover:border-purple-500/30 hover:bg-white/10 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
