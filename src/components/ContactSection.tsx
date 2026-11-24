"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Send, CheckCircle2, Copy, Check, Terminal } from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from "./SocialIcons";
import { portfolioData } from "@/data/portfolio";

interface ContactSectionProps {
  onOpenTerminal?: () => void;
}

export default function ContactSection({ onOpenTerminal }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }
    if (!formData.email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg("Please enter your contact number / phone.");
      return;
    }
    if (formData.message.trim().length < 5) {
      setErrorMsg("Please enter a message with at least 5 characters.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", linkedin: "", message: "" });
      } else {
        setErrorMsg(data.error || "Failed to send message. Please try again.");
      }
    } catch {
      setErrorMsg("Could not reach the server. Please try again or reach out directly on LinkedIn / GitHub.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative">
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300 mb-3">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Let&apos;s Connect</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-display text-white uppercase pixel-text-glow">
          Get In Touch
        </h2>
        <div className="pixel-divider w-20 mx-auto mt-4" aria-hidden="true" />
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mt-3">
          Have an internship opportunity, project collaboration, or tech discussion? Drop a line below!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Direct Info & Quick Links */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="p-7 rounded-2xl bg-[#0e1235]/90 border border-indigo-300/20 space-y-5 shadow-lg">
            <h3 className="text-lg font-bold text-white tracking-tight">
              Direct Contact Channels
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Feel free to reach out directly via email, connect on LinkedIn, or review my code on GitHub &amp; LeetCode.
            </p>

            {/* Email pill with copy button */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-indigo-400/[0.06] border border-indigo-300/10">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="text-xs font-mono text-slate-200 truncate">
                  {portfolioData.personal.email}
                </span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-1.5 rounded-lg bg-indigo-400/10 hover:bg-indigo-400/15 text-slate-300 hover:text-white transition-colors shrink-0 ml-2"
                title="Copy email address"
              >
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Social Links: GitHub, LeetCode, LinkedIn */}
            <div className="grid grid-cols-3 gap-2.5 pt-2">
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-3 rounded-xl bg-indigo-400/10 border border-indigo-300/20 text-xs font-bold text-slate-200 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition-all uppercase tracking-wider"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>

              <a
                href={portfolioData.personal.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-3 rounded-xl bg-indigo-400/10 border border-indigo-300/20 text-xs font-bold text-amber-300 hover:text-white hover:border-amber-500/50 hover:bg-amber-500/10 transition-all uppercase tracking-wider"
              >
                <LeetcodeIcon className="w-3.5 h-3.5 text-amber-400" />
                <span>LeetCode</span>
              </a>

              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-3 rounded-xl bg-indigo-400/10 border border-indigo-300/20 text-xs font-bold text-slate-200 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all uppercase tracking-wider"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-blue-400" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Quick Terminal Trigger Hint */}
          {onOpenTerminal && (
            <div
              onClick={onOpenTerminal}
              className="p-4 rounded-xl bg-black/40 border border-indigo-300/10 hover:border-purple-500/30 cursor-pointer flex items-center justify-between text-xs text-slate-400 group transition-all"
            >
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-purple-400 group-hover:animate-pulse" />
                <span>Interactive CLI terminal available</span>
              </div>
              <span className="font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded text-[11px] group-hover:bg-purple-500/20">
                Launch &gt;_
              </span>
            </div>
          )}
        </div>

        {/* Right Column: In-Browser Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-7 sm:p-9 rounded-2xl bg-[#0e1235]/90 border border-indigo-300/20 shadow-xl relative">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center flex flex-col items-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-xl font-display text-white">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed">
                  Thank you for reaching out! Your message has been received. Karthavya will review your note and respond to your email promptly.
                </p>

                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-400/15 hover:bg-white/15 text-slate-200 border border-indigo-300/25 transition-all shadow-sm"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Your Name <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Priya Sharma"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-indigo-400/[0.06] border border-indigo-300/20 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Email Address <span className="text-purple-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. priya@company.com"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-indigo-400/[0.06] border border-indigo-300/20 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Contact Number <span className="text-purple-400">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-indigo-400/[0.06] border border-indigo-300/20 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                      LinkedIn Profile
                    </label>
                    <span className="text-[11px] font-medium text-slate-500">Optional</span>
                  </div>
                  <input
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    placeholder="https://linkedin.com/in/your-profile"
                    className="w-full px-4 py-3 rounded-xl bg-indigo-400/[0.06] border border-indigo-300/20 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Message <span className="text-purple-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hi Karthavya, I'd like to discuss an internship or project collaboration..."
                    required
                    className="w-full px-4 py-3 rounded-xl bg-indigo-400/[0.06] border border-indigo-300/20 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors resize-none"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs text-red-400 font-semibold">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white glow-gradient-pill flex items-center justify-center gap-2 hover:opacity-95 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Sending message...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-indigo-300/10 text-center text-xs text-slate-500">
        <p>&copy; 2026 Karthavya S. All rights reserved.</p>
      </footer>
    </section>
  );
}
