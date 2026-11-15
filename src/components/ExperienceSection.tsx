"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen, Calendar, MapPin } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export default function ExperienceSection() {
  const getIcon = (type: string) => {
    switch (type) {
      case "Education":
        return <GraduationCap className="w-5 h-5 text-purple-400" />;
      case "Research":
        return <BookOpen className="w-5 h-5 text-pink-400" />;
      case "Hackathon":
        return <Award className="w-5 h-5 text-amber-400" />;
      default:
        return <Award className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative">
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300 mb-3">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Timeline &amp; Milestones</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight uppercase">
          Education &amp; Experience
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mt-3">
          Academic foundation at Rajalakshmi Engineering College, published research, and hackathon accomplishments.
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative border-l border-white/10 ml-4 sm:ml-32 md:ml-40 space-y-12">
        {portfolioData.experience.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-6 sm:pl-8 group"
          >
            {/* Timeline Node Dot */}
            <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-[#0c0f17] border border-purple-500/50 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:border-purple-400 transition-transform">
              {getIcon(item.type)}
            </div>

            {/* Left Date pill for Desktop */}
            <div className="hidden sm:block absolute -left-36 top-2 text-right w-28">
              <span className="text-xs font-bold text-purple-400 font-mono tracking-wider">
                {item.period}
              </span>
            </div>

            {/* Card Content with Touch Highlight & Pop Animation */}
            <motion.div
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              className="p-6 rounded-2xl bg-[#0c0f17]/90 border border-white/10 group-hover:border-purple-500/40 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/10 active:border-purple-400 transition-all duration-300 cursor-pointer"
            >
              {/* Mobile Period */}
              <div className="sm:hidden flex items-center gap-2 text-xs font-bold text-purple-400 font-mono mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>{item.period}</span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {item.title}
                </h3>
                <span className="text-[11px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                  {item.type}
                </span>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-purple-300 mb-3 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                {item.organization}
              </p>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {item.description}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mt-4">
                {item.badges.map((b) => (
                  <span
                    key={b}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-slate-300"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}

        {/* Education Breakdown: Schooling */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative pl-6 sm:pl-8 group"
        >
          <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-[#0c0f17] border border-blue-500/50 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:border-blue-400 transition-transform">
            <GraduationCap className="w-5 h-5 text-blue-400" />
          </div>

          <div className="hidden sm:block absolute -left-36 top-2 text-right w-28">
            <span className="text-xs font-bold text-blue-400 font-mono tracking-wider">
              2020 – 2022
            </span>
          </div>

          <motion.div
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            className="p-6 rounded-2xl bg-[#0c0f17]/90 border border-white/10 group-hover:border-purple-500/40 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/10 active:border-purple-400 transition-all duration-300 cursor-pointer"
          >
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2">
              Schooling &amp; Academic Honors
            </h3>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <div>
                  <div className="font-semibold text-white">Higher Secondary Certificate (HSC)</div>
                  <div className="text-slate-400 text-xs">Ananthavalli Mat Hr Sec School (2022)</div>
                </div>
                <div className="font-mono font-bold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded">
                  91%
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-white">Secondary School Leaving Certificate (SSLC)</div>
                  <div className="text-slate-400 text-xs">ST. Vincent Mat Hr Sec School (2020)</div>
                </div>
                <div className="font-mono font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded">
                  96%
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

