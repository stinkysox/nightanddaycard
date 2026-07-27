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
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z" />
    </svg>
  ),
  next: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z" />
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
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
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

  // Calculate magnetic tape roll size to simulate reel transfer
  const leftTapeRadius = 22 + (1 - progress / 100) * 16;
  const rightTapeRadius = 22 + (progress / 100) * 16;

  return (
    <div className="w-full max-w-sm mx-auto p-2 select-none font-sans relative z-10 my-8">
      <audio ref={audioRef} preload="metadata" />

      <style>{`
        @keyframes walkman-spool {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-walkman-spool {
          animation: walkman-spool 2.2s linear infinite;
        }
      `}</style>

      {/* ── WALKMAN MAIN CHASSIS ── */}
      <div
        className="rounded-3xl p-5 border-2 border-slate-700/80 shadow-2xl relative overflow-hidden"
        style={{
          background:
            "linear-gradient(165deg, #333d4c 0%, #1e2430 40%, #12161f 100%)",
          boxShadow:
            "0 25px 50px -12px rgba(0, 0, 0, 0.6), inset 0 2px 2px rgba(255, 255, 255, 0.15), inset 0 -3px 5px rgba(0, 0, 0, 0.8)",
        }}
      >
        {/* Metallic Bezel Top Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-slate-500 via-slate-300 to-slate-600 opacity-40" />

        {/* Brand Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
          <div>
            <span className="text-[12px] font-black tracking-[0.25em] text-slate-100 uppercase italic font-sans block leading-none">
              WALKMAN
            </span>
            <span className="text-[7px] font-bold text-amber-500 tracking-[0.3em] uppercase block mt-1">
              STEREO CASSETTE PLAYER
            </span>
          </div>

          {/* Operation Indicator LED */}
          <div className="flex items-center gap-1.5 bg-slate-950/80 px-2 py-1 rounded-full border border-slate-800">
            <span className="text-[7px] font-mono text-slate-400 font-bold tracking-wider">
              BATT
            </span>
            <div
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                isPlaying
                  ? "bg-red-500 shadow-[0_0_8px_#ef4444]"
                  : "bg-red-950/60"
              }`}
            />
          </div>
        </div>

        {/* ── CASSETTE DOOR WINDOW ── */}
        <div
          className="rounded-2xl border-2 border-slate-900 p-3 mb-4 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(15, 20, 28, 0.95) 0%, rgba(8, 10, 15, 0.98) 100%)",
            boxShadow:
              "inset 0 4px 15px rgba(0,0,0,0.9), 0 1px 1px rgba(255,255,255,0.08)",
          }}
        >
          {/* Transparent Window Glass Reflection */}
          <div className="absolute -inset-[100%] bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent transform -rotate-45 pointer-events-none" />

          {/* Track Label Badge */}
          <div className="bg-gradient-to-r from-amber-100 via-amber-50 to-orange-100 border border-amber-200/80 rounded px-3 py-1.5 mb-3 text-center shadow-sm relative z-10">
            <p className="font-bold text-xs text-slate-900 truncate tracking-tight">
              {track.title}
            </p>
            <p className="text-[9px] font-semibold text-slate-600 truncate mt-0.5 uppercase tracking-wider">
              {track.artist}
            </p>
          </div>

          {/* Magnetic Tape Spools Area */}
          <div className="flex justify-around items-center py-2 relative z-10">
            {/* Left Reel */}
            <div className="relative w-14 h-14 rounded-full bg-slate-950 border-2 border-slate-800 flex items-center justify-center shadow-inner">
              {/* Dynamic Tape Mass */}
              <div
                className="absolute rounded-full bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 opacity-90 transition-all duration-300"
                style={{
                  width: `${leftTapeRadius * 2}%`,
                  height: `${leftTapeRadius * 2}%`,
                }}
              />
              {/* Spool Teeth */}
              <div
                className={`w-7 h-7 rounded-full bg-slate-200 border-2 border-slate-400 flex items-center justify-center relative z-10 ${
                  isPlaying ? "animate-walkman-spool" : ""
                }`}
              >
                <div className="w-5 h-1 bg-slate-800 absolute" />
                <div className="w-1 h-5 bg-slate-800 absolute" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-300 z-10" />
              </div>
            </div>

            {/* Tape Center Window / Counter */}
            <div className="text-center px-1">
              <div className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1 shadow-inner">
                <span className="font-mono text-[11px] text-amber-500 font-bold tracking-widest block">
                  {formatTime(currentTime)}
                </span>
              </div>
              <span className="text-[7px] font-mono text-slate-500 tracking-tighter uppercase block mt-1">
                TAPE CNT
              </span>
            </div>

            {/* Right Reel */}
            <div className="relative w-14 h-14 rounded-full bg-slate-950 border-2 border-slate-800 flex items-center justify-center shadow-inner">
              {/* Dynamic Tape Mass */}
              <div
                className="absolute rounded-full bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 opacity-90 transition-all duration-300"
                style={{
                  width: `${rightTapeRadius * 2}%`,
                  height: `${rightTapeRadius * 2}%`,
                }}
              />
              {/* Spool Teeth */}
              <div
                className={`w-7 h-7 rounded-full bg-slate-200 border-2 border-slate-400 flex items-center justify-center relative z-10 ${
                  isPlaying ? "animate-walkman-spool" : ""
                }`}
              >
                <div className="w-5 h-1 bg-slate-800 absolute" />
                <div className="w-1 h-5 bg-slate-800 absolute" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-300 z-10" />
              </div>
            </div>
          </div>
        </div>

        {/* Seek Progress Bar */}
        <div className="mb-4 px-1">
          <div className="relative h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800/80 flex items-center">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-400"
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
          <div className="flex justify-between text-[8px] font-mono text-slate-400 mt-1 font-semibold">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* ── MECHANICAL WALKMAN BUTTONS ── */}
        <div className="grid grid-cols-4 gap-2 mb-4 bg-slate-950/60 p-2 rounded-xl border border-slate-800/80">
          {/* REW Button */}
          <button
            type="button"
            onClick={prevTrack}
            className="group flex flex-col items-center py-2 rounded border-t border-l border-slate-500 border-r-2 border-b-2 border-r-slate-950 border-b-slate-950 bg-gradient-to-b from-slate-600 to-slate-800 text-slate-200 active:translate-y-0.5 active:border-r active:border-b transition-all shadow-md"
            aria-label="Previous Track"
          >
            {ICONS.prev}
            <span className="text-[7px] font-black tracking-wider mt-1 text-slate-300 group-hover:text-white">
              REW
            </span>
          </button>

          {/* PLAY / PAUSE Button */}
          <button
            type="button"
            onClick={togglePlay}
            className={`group flex flex-col items-center py-2 rounded border-t border-l border-r-2 border-b-2 active:translate-y-0.5 active:border-r active:border-b transition-all shadow-md ${
              isPlaying
                ? "border-amber-400 border-r-amber-950 border-b-amber-950 bg-gradient-to-b from-amber-500 to-amber-700 text-slate-950"
                : "border-slate-500 border-r-slate-950 border-b-slate-950 bg-gradient-to-b from-slate-600 to-slate-800 text-slate-200"
            }`}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? ICONS.pause : ICONS.play}
            <span className="text-[7px] font-black tracking-wider mt-1">
              {isPlaying ? "PAUSE" : "PLAY"}
            </span>
          </button>

          {/* STOP Button */}
          <button
            type="button"
            onClick={stopPlay}
            className="group flex flex-col items-center py-2 rounded border-t border-l border-slate-500 border-r-2 border-b-2 border-r-slate-950 border-b-slate-950 bg-gradient-to-b from-slate-600 to-slate-800 text-slate-200 active:translate-y-0.5 active:border-r active:border-b transition-all shadow-md"
            aria-label="Stop Playback"
          >
            {ICONS.stop}
            <span className="text-[7px] font-black tracking-wider mt-1 text-slate-300 group-hover:text-white">
              STOP
            </span>
          </button>

          {/* FF Button */}
          <button
            type="button"
            onClick={nextTrack}
            className="group flex flex-col items-center py-2 rounded border-t border-l border-slate-500 border-r-2 border-b-2 border-r-slate-950 border-b-slate-950 bg-gradient-to-b from-slate-600 to-slate-800 text-slate-200 active:translate-y-0.5 active:border-r active:border-b transition-all shadow-md"
            aria-label="Next Track"
          >
            {ICONS.next}
            <span className="text-[7px] font-black tracking-wider mt-1 text-slate-300 group-hover:text-white">
              FF
            </span>
          </button>
        </div>

        {/* Bottom Control Strip (Volume Wheel & Jack Accent) */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 px-1">
          {/* Headphone Jack Decor */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
            </div>
            <span className="text-[7px] font-mono font-bold text-slate-400 tracking-wider">
              PHONES
            </span>
          </div>

          {/* Volume Control Slider */}
          <div className="flex items-center gap-2">
            <span className="text-[7px] font-mono font-bold text-slate-400 tracking-wider">
              VOL
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-20 h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-500 border border-slate-800"
              aria-label="Volume level"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
