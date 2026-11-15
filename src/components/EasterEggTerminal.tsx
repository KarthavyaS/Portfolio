"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Minus, Square } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

interface EasterEggTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandHistory {
  command: string;
  output: string | React.ReactNode;
}

export default function EasterEggTerminal({ isOpen, onClose }: EasterEggTerminalProps) {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: "welcome",
      output: (
        <div>
          <p className="text-emerald-400 font-bold">Karthavya Portfolio CLI [Version 2.4.0]</p>
          <p className="text-slate-400 text-xs mt-1">
            Type <span className="text-purple-300 font-bold">&apos;help&apos;</span> to see available commands or <span className="text-purple-300 font-bold">&apos;exit&apos;</span> to close.
          </p>
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    let output: React.ReactNode = "";

    switch (cmd) {
      case "help":
        output = (
          <div className="space-y-1 text-xs text-slate-300">
            <p className="text-purple-300 font-bold">Available Commands:</p>
            <p><span className="text-emerald-400 font-mono w-24 inline-block">help</span> Show this manual</p>
            <p><span className="text-emerald-400 font-mono w-24 inline-block">about</span> Candidate bio &amp; background</p>
            <p><span className="text-emerald-400 font-mono w-24 inline-block">projects</span> List all engineering projects</p>
            <p><span className="text-emerald-400 font-mono w-24 inline-block">skills</span> Display languages &amp; AI toolsets</p>
            <p><span className="text-emerald-400 font-mono w-24 inline-block">education</span> Display universities &amp; scores</p>
            <p><span className="text-emerald-400 font-mono w-24 inline-block">contact</span> Print direct communication channels</p>
            <p><span className="text-emerald-400 font-mono w-24 inline-block">sudo</span> Gain root access</p>
            <p><span className="text-emerald-400 font-mono w-24 inline-block">clear</span> Clear terminal buffer</p>
            <p><span className="text-emerald-400 font-mono w-24 inline-block">exit</span> Close terminal window</p>
          </div>
        );
        break;

      case "about":
      case "bio":
        output = (
          <div className="text-xs text-slate-300 space-y-1">
            <p className="text-purple-300 font-bold">{portfolioData.personal.name}</p>
            <p>{portfolioData.personal.introHeadline}</p>
            <p className="text-slate-400 mt-1">{portfolioData.personal.introText}</p>
            <p className="text-emerald-400 mt-1">Status: Open for Internships.</p>
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="text-xs text-slate-300 space-y-2">
            <p className="text-purple-300 font-bold">Featured Projects:</p>
            {portfolioData.projects.map((p) => (
              <div key={p.id} className="border-l-2 border-purple-500/50 pl-2">
                <span className="text-white font-bold">{p.title}</span> &bull; <span className="text-slate-400">{p.tagline}</span>
                <p className="text-slate-400 text-[11px] mt-0.5">{p.summary}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="text-xs text-slate-300 space-y-1.5">
            <p className="text-purple-300 font-bold">Skills Matrix:</p>
            {portfolioData.skillGroups.map((g) => (
              <p key={g.name}>
                <span className="text-slate-400 font-semibold">{g.name}:</span> {g.skills.join(", ")}
              </p>
            ))}
          </div>
        );
        break;

      case "education":
        output = (
          <div className="text-xs text-slate-300 space-y-1">
            <p className="text-purple-300 font-bold">Academic Background:</p>
            {portfolioData.education.map((e, idx) => (
              <p key={idx}>
                &bull; <span className="text-white">{e.degree}</span> &mdash; {e.institution} ({e.period}) [{e.score}]
              </p>
            ))}
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="text-xs text-slate-300 space-y-1">
            <p className="text-purple-300 font-bold">Get In Touch:</p>
            <p>Email: <span className="text-emerald-400">{portfolioData.personal.email}</span></p>
            <p>GitHub: <span className="text-blue-400">{portfolioData.personal.github}</span></p>
            <p>LeetCode: <span className="text-amber-400">{portfolioData.personal.leetcode}</span></p>
            <p>LinkedIn: <span className="text-blue-400">{portfolioData.personal.linkedin}</span></p>
          </div>
        );
        break;

      case "sudo":
        output = (
          <p className="text-amber-300 text-xs">
            [ACCESS GRANTED]: You are recognized as a super-recruiter! Feel free to download my resume or drop me an email directly.
          </p>
        );
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      case "exit":
      case "quit":
        onClose();
        setInputVal("");
        return;

      default:
        output = (
          <p className="text-red-400 text-xs">
            command not found: {cmd}. Type &apos;help&apos; for list of valid commands.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: inputVal, output }]);
    setInputVal("");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#090c14] border border-white/20 rounded-xl shadow-2xl overflow-hidden font-mono z-10"
        >
          {/* Title Bar */}
          <div className="bg-[#0f1422] px-4 py-2.5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block cursor-pointer" onClick={onClose} />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-xs text-slate-400 font-bold ml-2 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-purple-400" />
                karthavya@portfolio: ~ (bash)
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded"
              aria-label="Close terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Console Body */}
          <div className="p-4 sm:p-5 max-h-[60vh] overflow-y-auto space-y-3 text-xs leading-relaxed">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-emerald-400 font-bold">karthavya@dev:~$</span>
                  <span className="text-white font-bold">{item.command}</span>
                </div>
                <div className="pl-4">{item.output}</div>
              </div>
            ))}

            {/* Input Prompt */}
            <form onSubmit={handleCommand} className="flex items-center gap-2 pt-2">
              <span className="text-emerald-400 font-bold shrink-0">karthavya@dev:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="type 'help' or command..."
                className="w-full bg-transparent text-white focus:outline-none text-xs caret-emerald-400"
              />
            </form>
            <div ref={bottomRef} />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

