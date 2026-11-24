import Link from "next/link";
import { ArrowLeft, Home, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#070a24] text-slate-100 flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mb-6">
        <Compass className="w-8 h-8 text-purple-400 animate-spin" />
      </div>

      <h1 className="font-display text-4xl sm:text-6xl text-white pixel-text-glow">
        404
      </h1>

      <h2 className="text-xl sm:text-2xl font-bold text-slate-200 mt-3">
        Page Not Found
      </h2>

      <p className="text-sm text-slate-400 max-w-md mt-2 leading-relaxed">
        The route you are navigating to does not exist or has moved. Let&apos;s get you back to the main portfolio.
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white glow-gradient-pill transition-all"
      >
        <Home className="w-4 h-4" />
        <span>Back to Homepage</span>
      </Link>
    </div>
  );
}

