"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

const SRC = "/music/background.mp3";
const VOLUME_KEY = "portfolio-music-volume";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const userPausedRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [muted, setMuted] = useState(false);
  const [needsInteraction, setNeedsInteraction] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let savedVolume = 0.4;
    try {
      const raw = localStorage.getItem(VOLUME_KEY);
      if (raw !== null) {
        const parsed = parseFloat(raw);
        if (Number.isFinite(parsed)) savedVolume = Math.min(1, Math.max(0, parsed));
      }
    } catch {
      // ignore storage errors
    }
    setVolume(savedVolume);
    audio.volume = savedVolume;
    audio.loop = true;

    const tryPlay = async () => {
      if (userPausedRef.current) return;
      try {
        await audio.play();
        setPlaying(true);
        setNeedsInteraction(false);
      } catch {
        setPlaying(false);
        setNeedsInteraction(true);
      }
    };

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    // Attempt autoplay on mount.
    tryPlay();

    const handleInteraction = () => {
      if (audio.paused && !userPausedRef.current) {
        tryPlay();
      }
    };
    const events: (keyof WindowEventMap)[] = [
      "click",
      "keydown",
      "touchstart",
      "pointerdown",
    ];
    events.forEach((event) =>
      window.addEventListener(event, handleInteraction, { passive: true })
    );

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      events.forEach((event) =>
        window.removeEventListener(event, handleInteraction)
      );
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      userPausedRef.current = false;
      audio
        .play()
        .then(() => {
          setPlaying(true);
          setNeedsInteraction(false);
        })
        .catch(() => {
          setPlaying(false);
          setNeedsInteraction(true);
        });
    } else {
      userPausedRef.current = true;
      audio.pause();
      setPlaying(false);
    }
  };

  const handleVolume = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const clamped = Math.min(1, Math.max(0, value));
    setVolume(clamped);
    audio.volume = clamped;
    try {
      localStorage.setItem(VOLUME_KEY, String(clamped));
    } catch {
      // ignore
    }
    if (clamped === 0) setMuted(true);
    else setMuted(false);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (muted) {
      audio.muted = false;
      setMuted(false);
      if (audio.volume === 0) handleVolume(0.4);
    } else {
      audio.muted = true;
      setMuted(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={SRC} preload="auto" />
      <div
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full border border-white/10 bg-[#070a24]/85 px-3 py-2 shadow-lg backdrop-blur-md"
        role="group"
        aria-label="Background music controls"
      >
        <button
          type="button"
          onClick={togglePlay}
          className="flex h-8 w-8 items-center justify-center rounded-full text-slate-100 transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-400/60"
          aria-label={playing ? "Pause background music" : "Play background music"}
          title={needsInteraction ? "Click to start music" : undefined}
        >
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <button
          type="button"
          onClick={toggleMute}
          className="flex h-8 w-8 items-center justify-center rounded-full text-slate-100 transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-400/60"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={muted ? 0 : volume}
          onChange={(e) => handleVolume(parseFloat(e.target.value))}
          className="h-1 w-20 cursor-pointer accent-purple-500"
          aria-label="Volume"
        />
      </div>
    </>
  );
}
