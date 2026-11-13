"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Send, CheckCircle2, Copy, Check, Terminal, ExternalLink } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { portfolioData } from "@/data/portfolio";

interface ContactSectionProps {
  onOpenTerminal?: () => void;
}

export default function ContactSection({ onOpenTerminal }: ContactSectionProps) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [resultData, setResultData] = useState<{
    deliveredViaService?: boolean;
    mailtoUrl?: string;
    recipientEmail?: string;
  } | null>(null);
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
        setResultData(data);
        if (!data.deliveredViaService && data.mailtoUrl) {
          // Open user's email client directly with drafted message
          window.location.href = data.mailtoUrl;
        }
        setFormData({ name: "", email: "", message: "" });
      } else {
        setErrorMsg(data.error || "Failed to send message. Please try again.");
      }
    } catch {
      setErrorMsg("Could not reach the server. Please try emailing directly.");
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
        <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight uppercase">
          Get In Touch
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mt-3">
          Have an internship opportunity, project collaboration, or tech discussion? Drop a line below!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Direct Info & Quick Links */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="p-7 rounded-2xl bg-[#0c0f17]/90 border border-white/10 space-y-5 shadow-lg">
            <h3 className="text-lg font-bold text-white tracking-tight">
              Direct Contact Channels
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Feel free to reach out directly via email, connect on LinkedIn, or review my repositories on GitHub.
            </p>

            {/* Email pill with copy button */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="text-xs font-mono text-slate-200 truncate">
                  {portfolioData.personal.email}
                </span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors shrink-0 ml-2"
                title="Copy email address"
              >
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-slate-200 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition-all uppercase tracking-wider"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>

              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-slate-200 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all uppercase tracking-wider"
              >
                <LinkedinIcon className="w-4 h-4 text-blue-400" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Quick Terminal Trigger Hint */}
          {onOpenTerminal && (
            <div
              onClick={onOpenTerminal}
              className="p-4 rounded-xl bg-black/40 border border-white/5 hover:border-purple-500/30 cursor-pointer flex items-center justify-between text-xs text-slate-400 group transition-all"
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

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-7 sm:p-9 rounded-2xl bg-[#0c0f17]/90 border border-white/10 shadow-xl relative">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center flex flex-col items-center space-y-4"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white font-display">
                  {resultData?.deliveredViaService
                    ? "Message Delivered to Karthavya's Inbox!"
                    : "Message Prepared for Karthavya's Inbox!"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed">
                  {resultData?.deliveredViaService ? (
                    <>
                      Your message has been delivered directly to{" "}
                      <span className="text-purple-300 font-mono">
                        {portfolioData.personal.email}
                      </span>
                      . Karthavya will review it and reply to your email address shortly.
                    </>
                  ) : (
                    <>
                      Your message has been addressed to{" "}
                      <span className="text-purple-300 font-mono">
                        {portfolioData.personal.email}
                      </span>
                      . If your email app did not open automatically, click the button below to send it directly!
                    </>
                  )}
                </p>

                {resultData?.mailtoUrl && (
                  <a
                    href={resultData.mailtoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white glow-gradient-pill transition-all mt-2 shadow-lg"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send via Email Client</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                <button
                  onClick={() => {
                    setSubmitted(false);
                    setResultData(null);
                  }}
                  className="mt-3 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. rahul@company.com"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hi Karthavya, I'd like to discuss an internship or project collaboration..."
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors resize-none"
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
                    <span>Dispatching message...</span>
                  ) : (
                    <>
                      <span>Send Message to Karthavya</span>
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
      <footer className="mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <p>&copy; 2026 Karthavya S. All rights reserved.</p>
        <p className="flex items-center gap-2">
          <span>Built with Next.js 16, Tailwind CSS &amp; Framer Motion.</span>
        </p>
      </footer>
    </section>
  );
}
