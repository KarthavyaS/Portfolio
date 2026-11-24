"use client";

import React from "react";
import { Download, Mail, MapPin, ArrowLeft, Printer, Award, ExternalLink } from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from "./SocialIcons";
import { portfolioData } from "@/data/portfolio";

interface RecruiterModeViewProps {
  onExit: () => void;
}

export default function RecruiterModeView({ onExit }: RecruiterModeViewProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="recruiter-ats min-h-screen bg-slate-100 text-slate-900 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 print:bg-white print:p-0">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Control Bar (Hidden during Print) */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm print:hidden">
          <button
            onClick={onExit}
            className="flex items-center gap-2 text-xs font-bold text-purple-700 hover:text-purple-900 transition-colors uppercase tracking-wider cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Interactive Portfolio</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-300 transition-colors cursor-pointer"
              title="Print ATS Resume"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>Print / Save PDF</span>
            </button>
            <a
              href={portfolioData.personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-purple-700 hover:bg-purple-800 text-white transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Official Resume</span>
            </a>
          </div>
        </div>

        {/* Clean White ATS Resume Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-12 shadow-xl print:shadow-none print:border-none print:p-0 space-y-8">
          
          {/* Header / Candidate Overview */}
          <div className="border-b border-slate-200 pb-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {portfolioData.personal.name}
              </h1>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                ● Open for Internships
              </span>
            </div>

            <p className="text-sm sm:text-base text-purple-800 font-semibold">
              {portfolioData.personal.formalHeadline}
            </p>

            {/* Contact details */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-600 pt-1">
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {portfolioData.personal.location}
              </span>
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="flex items-center gap-1.5 font-medium hover:text-purple-700 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                {portfolioData.personal.email}
              </a>
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-medium hover:text-purple-700 transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5 text-slate-500" />
                GitHub
              </a>
              <a
                href={portfolioData.personal.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-medium hover:text-amber-700 transition-colors"
              >
                <LeetcodeIcon className="w-3.5 h-3.5 text-amber-500" />
                LeetCode
              </a>
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-medium hover:text-blue-700 transition-colors"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-blue-500" />
                LinkedIn
              </a>
            </div>
          </div>

          {/* Formal Professional Summary */}
          <section className="space-y-2.5">
            <h2 className="text-xs uppercase tracking-widest font-bold text-slate-500 pb-1 border-b border-slate-200">
              Professional Summary
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed font-normal">
              {portfolioData.personal.formalSummary}
            </p>
          </section>

          {/* Education */}
          <section className="space-y-4">
            <h2 className="text-xs uppercase tracking-widest font-bold text-slate-500 pb-1 border-b border-slate-200">
              Education
            </h2>
            <div className="space-y-3">
              {portfolioData.education.map((edu, idx) => (
                <div key={idx} className="flex justify-between items-start text-sm">
                  <div>
                    <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                    <p className="text-xs text-slate-600 font-medium">{edu.institution}</p>
                    {edu.details && <p className="text-xs text-slate-500 mt-0.5">{edu.details}</p>}
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-purple-700 block">{edu.score}</span>
                    <span className="text-xs text-slate-500">{edu.period}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Technical Skills */}
          <section className="space-y-3">
            <h2 className="text-xs uppercase tracking-widest font-bold text-slate-500 pb-1 border-b border-slate-200">
              Technical Core Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {portfolioData.skillGroups.map((grp) => (
                <div key={grp.name} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1 uppercase tracking-wide text-[11px]">
                    {grp.name}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {grp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-medium text-[11px]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Key Engineering Projects & Research */}
          <section className="space-y-5">
            <h2 className="text-xs uppercase tracking-widest font-bold text-slate-500 pb-1 border-b border-slate-200">
              Key Projects &amp; Research
            </h2>
            <div className="space-y-5">
              {portfolioData.projects.map((proj) => (
                <div key={proj.id} className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 space-y-2 text-sm">
                  <div className="flex flex-wrap justify-between items-baseline gap-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-base">{proj.title}</h3>
                      <span className="text-xs text-slate-500 font-medium">({proj.tagline})</span>
                    </div>
                    <span className="text-xs font-semibold text-purple-800 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full">
                      {proj.role}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    <strong>Solution &amp; Architecture:</strong> {proj.approach}
                  </p>

                  <p className="text-xs text-slate-600">
                    <strong>Impact:</strong> {proj.result}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <div className="flex flex-wrap gap-1">
                      {proj.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-700 hover:text-purple-900 font-semibold flex items-center gap-1"
                        >
                          <span>Repository</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-700 hover:text-purple-900 font-semibold flex items-center gap-1"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Honors, Hackathons & Research Achievements */}
          <section className="space-y-3">
            <h2 className="text-xs uppercase tracking-widest font-bold text-slate-500 pb-1 border-b border-slate-200">
              Honors, Hackathons &amp; Publications
            </h2>
            <div className="space-y-3 text-xs">
              {portfolioData.experience.map((exp, idx) => (
                <div key={idx} className="flex justify-between items-start p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{exp.title}</span>
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5 font-medium">{exp.organization}</p>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{exp.description}</p>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <span className="text-xs font-mono text-purple-700 font-semibold block">{exp.period}</span>
                    <span className="text-[10px] uppercase font-bold text-slate-500">{exp.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
