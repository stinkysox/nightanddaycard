"use client";

import { useEffect, useRef, useState } from "react";
import { playlist } from "@/data/weddingData";

function formatTime(s: number) {
  if (!Number.isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, "0")}`;
}

const ICONS = {
  prev: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 6h2v12H6V6zm3.5 6 8.5 6V6l-8.5 6z" />
    </svg>
  ),
  next: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 18l8.5-6L6 6v12zm2.5-6 5.5 4V8l-5.5 4zM16 6h2v12h-2V6z" />
    </svg>
  ),
  play: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  ),
  pause: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  ),
  stop: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="6" width="12" height="12" rx="1" />
    </svg>
  ),
};

export default function VintageMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const isPlayingRef = useRef(false);

  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);

  const track = playlist[trackIndex] || {
    title: "Unknown Track",
    artist: "Unknown Artist",
    src: "",
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration);
    const onEnded = () => {
      isPlayingRef.current = true;
      setTrackIndex((i) => (i + 1) % playlist.length);
    };
    const onPlay = () => {
      setIsPlaying(true);
      isPlayingRef.current = true;
    };
    const onPause = () => {
      setIsPlaying(false);
      isPlayingRef.current = false;
    };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("durationchange", onMeta);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("durationchange", onMeta);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const wasPlaying = isPlayingRef.current;

    setCurrentTime(0);
    setDuration(0);
    audio.src = track.src;
    audio.load();

    if (wasPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }
  }, [trackIndex, track.src]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => setIsPlaying(false));
    }
  };

  const stopPlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    isPlayingRef.current = false;
  };

  const prevTrack = () => {
    isPlayingRef.current = true;
    setTrackIndex((i) => (i - 1 + playlist.length) % playlist.length);
  };

  const nextTrack = () => {
    isPlayingRef.current = true;
    setTrackIndex((i) => (i + 1) % playlist.length);
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(duration)) return;
    audio.currentTime = (Number(e.target.value) / 100) * duration;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full max-w-sm mx-auto p-4 select-none font-sans relative z-10 my-8">
      <audio ref={audioRef} preload="metadata" />

      <style>{`
        @keyframes spool-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spool {
          animation: spool-spin 3s linear infinite;
        }
      `}</style>

      {/* ── PREMIUM BRUSHED METALLIC CASSETTE CARD ── */}
      <div
        className="rounded-3xl p-6 border border-slate-700/30 shadow-xl overflow-hidden relative"
        style={{
          background: "linear-gradient(135deg, #1e2530 0%, #0f131a 100%)",
          boxShadow: "0 20px 45px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.05)",
        }}
      >
        {/* Decorative metal shine overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[var(--accent)] uppercase font-serif">
              ✦ RETRO INVITATION PLAYER
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[8px] font-bold text-slate-500 tracking-wider">
              AUTO REVERSE
            </span>
            <div
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                isPlaying ? "bg-amber-400 shadow-[0_0_6px_#f59e0b]" : "bg-slate-800"
              }`}
            />
          </div>
        </div>

        {/* Cassette clear window */}
        <div
          className="rounded-xl border border-slate-800/80 p-3.5 mb-4 relative"
          style={{
            background: "rgba(10, 12, 16, 0.6)",
            boxShadow: "inset 0 3px 10px rgba(0,0,0,0.8)",
          }}
        >
          {/* Label area */}
          <div className="bg-slate-900 border border-slate-800 rounded px-3 py-2 mb-3 text-center">
            <p className="font-serif italic text-xs text-slate-200 truncate leading-tight">
              {track.title}
            </p>
            <p className="text-[9px] font-mono text-slate-500 truncate mt-0.5 uppercase tracking-wider">
              {track.artist}
            </p>
          </div>

          {/* Rotating Spools */}
          <div className="flex justify-between items-center px-4 py-1.5">
            {/* Left Hub */}
            <div className="relative w-10 h-10 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center shadow-inner">
              <div
                className={`w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center ${
                  isPlaying ? "animate-spool" : ""
                }`}
              >
                <div className="w-4 h-0.5 bg-slate-600 absolute" />
                <div className="w-0.5 h-4 bg-slate-600 absolute" />
                <div className="w-1.5 h-1.5 rounded-full bg-slate-950 z-10" />
              </div>
            </div>

            {/* Tape Counter */}
            <div className="text-center">
              <div className="bg-black px-2 py-0.5 rounded border border-slate-800/80 text-[10px] font-mono text-amber-400 font-bold tracking-widest">
                {formatTime(currentTime)}
              </div>
            </div>

            {/* Right Hub */}
            <div className="relative w-10 h-10 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center shadow-inner">
              <div
                className={`w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center ${
                  isPlaying ? "animate-spool" : ""
                }`}
              >
                <div className="w-4 h-0.5 bg-slate-600 absolute" />
                <div className="w-0.5 h-4 bg-slate-600 absolute" />
                <div className="w-1.5 h-1.5 rounded-full bg-slate-950 z-10" />
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Slider */}
        <div className="mb-4">
          <div className="relative h-1 bg-slate-950 rounded-full overflow-hidden flex items-center">
            <div
              className="h-full bg-amber-400"
              style={{ width: `${progress}%` }}
            />
            <input
              type="range"
              min={0}
              max={100}
              value={progress || 0}
              onChange={seek}
              className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
              aria-label="Seek position"
            />
          </div>
          <div className="flex justify-between text-[9px] font-mono text-slate-500 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Mechanical Controls */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {/* REW */}
          <button
            type="button"
            onClick={prevTrack}
            className="flex flex-col items-center py-2.5 rounded-lg border border-slate-700 bg-gradient-to-b from-slate-800 to-slate-900 text-slate-300 hover:text-white hover:border-slate-600 active:scale-[0.97] transition-all"
            aria-label="Previous Track"
          >
            {ICONS.prev}
            <span className="text-[7px] font-bold tracking-wider mt-1 text-slate-500">REW</span>
          </button>

          {/* PLAY / PAUSE */}
          <button
            type="button"
            onClick={togglePlay}
            className={`flex flex-col items-center py-2.5 rounded-lg border active:scale-[0.97] transition-all ${
              isPlaying
                ? "border-amber-500 bg-gradient-to-b from-amber-500/20 to-amber-500/5 text-amber-400"
                : "border-slate-700 bg-gradient-to-b from-slate-800 to-slate-900 text-slate-300 hover:text-white"
            }`}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? ICONS.pause : ICONS.play}
            <span className="text-[7px] font-bold tracking-wider mt-1">
              {isPlaying ? "PAUSE" : "PLAY"}
            </span>
          </button>

          {/* STOP */}
          <button
            type="button"
            onClick={stopPlay}
            className="flex flex-col items-center py-2.5 rounded-lg border border-slate-700 bg-gradient-to-b from-slate-800 to-slate-900 text-slate-300 hover:text-white hover:border-slate-600 active:scale-[0.97] transition-all"
            aria-label="Stop Playback"
          >
            {ICONS.stop}
            <span className="text-[7px] font-bold tracking-wider mt-1 text-slate-500">STOP</span>
          </button>

          {/* FF */}
          <button
            type="button"
            onClick={nextTrack}
            className="flex flex-col items-center py-2.5 rounded-lg border border-slate-700 bg-gradient-to-b from-slate-800 to-slate-900 text-slate-300 hover:text-white hover:border-slate-600 active:scale-[0.97] transition-all"
            aria-label="Next Track"
          >
            {ICONS.next}
            <span className="text-[7px] font-bold tracking-wider mt-1 text-slate-500">FF</span>
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center justify-between px-1">
          <span className="text-[8px] font-mono text-slate-500 tracking-widest">
            VOLUME
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-24 h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-400"
            aria-label="Volume level"
          />
        </div>
      </div>
    </div>
  );
}