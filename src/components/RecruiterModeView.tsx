"use client";

import React from "react";
import { Download, ExternalLink, Mail, Phone, MapPin, ArrowLeft, Printer } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { portfolioData } from "@/data/portfolio";

interface RecruiterModeViewProps {
  onExit: () => void;
}

export default function RecruiterModeView({ onExit }: RecruiterModeViewProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <button
            onClick={onExit}
            className="flex items-center gap-2 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Interactive Portfolio</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <a
              href={portfolioData.personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF Resume</span>
            </a>
          </div>
        </div>

        {/* Header / Candidate Overview */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {portfolioData.personal.name}
          </h1>
          <p className="text-base text-purple-400 font-semibold">
            {portfolioData.personal.headline} &bull; B.E. Computer Science &amp; Engineering
          </p>

          <div className="flex flex-wrap gap-4 text-xs text-slate-400 pt-1">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              {portfolioData.personal.location}
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-slate-500" />
              {portfolioData.personal.phone}
            </span>
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="flex items-center gap-1 hover:text-purple-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              {portfolioData.personal.email}
            </a>
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-purple-400 transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5 text-slate-500" />
              GitHub
            </a>
            <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-purple-400 transition-colors"
            >
              <LinkedinIcon className="w-3.5 h-3.5 text-slate-500" />
              LinkedIn
            </a>
          </div>
        </div>

        {/* Professional Summary */}
        <section className="space-y-2">
          <h2 className="text-xs uppercase tracking-widest font-bold text-slate-400 pb-1 border-b border-slate-800">
            Professional Summary
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            {portfolioData.personal.introHeadline} {portfolioData.personal.introText}
          </p>
        </section>

        {/* Education */}
        <section className="space-y-4">
          <h2 className="text-xs uppercase tracking-widest font-bold text-slate-400 pb-1 border-b border-slate-800">
            Education
          </h2>
          <div className="space-y-3">
            {portfolioData.education.map((edu, idx) => (
              <div key={idx} className="flex justify-between items-start text-sm">
                <div>
                  <h3 className="font-bold text-white">{edu.degree}</h3>
                  <p className="text-xs text-slate-400">{edu.institution}</p>
                  {edu.details && <p className="text-xs text-slate-400 mt-0.5">{edu.details}</p>}
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-mono text-purple-400 font-bold block">{edu.score}</span>
                  <span className="text-xs text-slate-400">{edu.period}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Projects */}
        <section className="space-y-5">
          <h2 className="text-xs uppercase tracking-widest font-bold text-slate-400 pb-1 border-b border-slate-800">
            Key Projects &amp; Research
          </h2>
          <div className="space-y-5">
            {portfolioData.projects.map((proj) => (
              <div key={proj.id} className="space-y-1.5 text-sm">
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <span>{proj.title}</span>
                    <span className="text-xs font-normal text-slate-400">({proj.tagline})</span>
                  </h3>
                  <span className="text-xs font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded">
                    {proj.role}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {proj.summary}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Skills */}
        <section className="space-y-3">
          <h2 className="text-xs uppercase tracking-widest font-bold text-slate-400 pb-1 border-b border-slate-800">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {portfolioData.skillGroups.map((grp) => (
              <div key={grp.name} className="p-3 rounded-lg bg-slate-800/50">
                <span className="font-bold text-white block mb-1">{grp.name}:</span>
                <span className="text-slate-300">{grp.skills.join(", ")}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
