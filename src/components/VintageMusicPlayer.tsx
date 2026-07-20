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

export default function RetroWalkmanPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const isPlayingRef = useRef(false);

  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);

  const track = playlist[trackIndex] || {
    title: "Unknown Track",
    artist: "Unknown Artist",
    src: "",
  };

  /* ── Audio event listeners ── */
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

  /* ── Sync track change ── */
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

  /* ── Volume change handler ── */
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  /* ── Controls ── */
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
    <div className="w-full max-w-xs sm:max-w-sm mx-auto p-2 select-none font-sans">
      <audio ref={audioRef} preload="metadata" />

      <style>{`
        @keyframes spool-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spool {
          animation: spool-spin 2s linear infinite;
        }
      `}</style>

      {/* ── SONY WALKMAN METALLIC BODY ── */}
      <div
        className="relative rounded-3xl p-5 border-2 border-slate-400/50 shadow-2xl overflow-hidden"
        style={{
          background: "linear-gradient(165deg, #1d2b3a 0%, #0f172a 40%, #0b0f19 100%)",
          boxShadow:
            "inset 0 1px 2px rgba(255,255,255,0.3), inset -1px -2px 6px rgba(0,0,0,0.8), 0 25px 50px -12px rgba(0, 0, 0, 0.7)",
        }}
      >
        {/* Top Metallic Silver Header Bar */}
        <div className="absolute top-0 left-0 right-0 h-9 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 border-b border-slate-500/80 flex items-center justify-between px-4">
          <div className="flex items-center gap-1.5">
            <span className="text-[13px] font-black italic tracking-tighter text-slate-900 font-serif">
              SONY
            </span>
            <span className="text-[9px] font-bold tracking-widest text-slate-700 uppercase">
              WALKMAN
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[8px] font-bold text-slate-600 tracking-wider uppercase">
              OPE / BATT
            </span>
            <div
              className={`w-2 h-2 rounded-full border border-slate-600 transition-all duration-300 ${
                isPlaying
                  ? "bg-red-500 shadow-[0_0_6px_#ef4444]"
                  : "bg-red-950"
              }`}
            />
          </div>
        </div>

        <div className="pt-7">
          {/* Audio Spec Badges */}
          <div className="flex items-center justify-between text-[8px] font-mono tracking-widest text-slate-400 mb-3 px-1 uppercase">
            <span>Stereo Cassette Player</span>
            <span className="text-amber-400 font-bold">Auto Reverse</span>
          </div>

          {/* ── CASSETTE DOOR / CLEAR WINDOW ── */}
          <div
            className="relative rounded-xl border-2 border-slate-700/80 p-3 mb-4 overflow-hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(15,23,42,0.95) 0%, rgba(30,41,59,0.9) 100%)",
              boxShadow:
                "inset 0 3px 10px rgba(0,0,0,0.9), 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            {/* Gloss Reflection Accent */}
            <div className="absolute -top-16 -left-16 w-40 h-40 bg-white/5 rotate-45 pointer-events-none" />

            {/* Tape Label Header */}
            <div className="bg-slate-100 rounded border border-slate-300 px-3 py-1.5 mb-3 text-center shadow-inner">
              <p className="font-sans font-bold text-xs text-slate-900 truncate">
                {track.title}
              </p>
              <p className="text-[10px] font-medium text-slate-600 truncate">
                {track.artist}
              </p>
            </div>

            {/* Cassette Mechanical Wheels */}
            <div className="flex justify-between items-center px-4 py-2 bg-black/40 rounded-lg border border-slate-800/80">
              {/* Left Spool */}
              <div className="relative w-12 h-12 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center shadow-inner">
                {/* Tape Pack Outer (shrinks as tape progresses) */}
                <div
                  className="absolute rounded-full bg-amber-950/80 border border-amber-900/50 transition-all duration-300"
                  style={{
                    width: `${Math.max(20, 42 - progress * 0.22)}px`,
                    height: `${Math.max(20, 42 - progress * 0.22)}px`,
                  }}
                />
                {/* Rotating Hub */}
                <div
                  className={`relative z-10 w-7 h-7 rounded-full bg-slate-200 border-2 border-slate-400 flex items-center justify-center ${
                    isPlaying ? "animate-spool" : ""
                  }`}
                >
                  <div className="w-5 h-0.5 bg-slate-700 absolute" />
                  <div className="w-0.5 h-5 bg-slate-700 absolute" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900 z-10" />
                </div>
              </div>

              {/* Tape Center Window / Counter */}
              <div className="flex flex-col items-center">
                <span className="text-[8px] font-mono text-slate-400 tracking-wider mb-0.5">
                  TAPE COUNTER
                </span>
                <div className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-[11px] font-mono text-amber-400 font-bold tracking-widest shadow-inner">
                  {formatTime(currentTime)}
                </div>
              </div>

              {/* Right Spool */}
              <div className="relative w-12 h-12 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center shadow-inner">
                {/* Tape Pack Outer (grows as tape progresses) */}
                <div
                  className="absolute rounded-full bg-amber-950/80 border border-amber-900/50 transition-all duration-300"
                  style={{
                    width: `${Math.min(42, 20 + progress * 0.22)}px`,
                    height: `${Math.min(42, 20 + progress * 0.22)}px`,
                  }}
                />
                {/* Rotating Hub */}
                <div
                  className={`relative z-10 w-7 h-7 rounded-full bg-slate-200 border-2 border-slate-400 flex items-center justify-center ${
                    isPlaying ? "animate-spool" : ""
                  }`}
                >
                  <div className="w-5 h-0.5 bg-slate-700 absolute" />
                  <div className="w-0.5 h-5 bg-slate-700 absolute" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900 z-10" />
                </div>
              </div>
            </div>
          </div>

          {/* ── TRACK TIMELINE SEEKER ── */}
          <div className="mb-4">
            <div className="relative h-1.5 rounded-full bg-slate-950 border border-slate-800 overflow-hidden flex items-center">
              <div
                className="h-full bg-amber-400 transition-all duration-150"
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
            <div className="flex justify-between text-[9px] font-mono text-slate-400 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* ── MECHANICAL SONY PHYSICAL BUTTONS ── */}
          <div className="bg-slate-900/80 rounded-xl p-2 border border-slate-700/60 shadow-inner mb-4">
            <div className="grid grid-cols-4 gap-1.5">
              {/* REW / PREV */}
              <button
                type="button"
                onClick={prevTrack}
                aria-label="Rewind / Previous Track"
                className="group flex flex-col items-center py-2 px-1 rounded-lg border border-slate-500/60 bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500 text-slate-900 active:translate-y-0.5 shadow-md active:shadow-inner"
              >
                {ICONS.prev}
                <span className="text-[7px] font-bold tracking-tighter mt-1 text-slate-800 uppercase">
                  REW
                </span>
              </button>

              {/* PLAY / PAUSE */}
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
                className={`group flex flex-col items-center py-2 px-1 rounded-lg border active:translate-y-0.5 shadow-md active:shadow-inner transition-all ${
                  isPlaying
                    ? "border-amber-400 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 text-slate-900"
                    : "border-slate-500/60 bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500 text-slate-900"
                }`}
              >
                {isPlaying ? ICONS.pause : ICONS.play}
                <span className="text-[7px] font-bold tracking-tighter mt-1 text-slate-800 uppercase">
                  {isPlaying ? "PAUSE" : "PLAY"}
                </span>
              </button>

              {/* STOP */}
              <button
                type="button"
                onClick={stopPlay}
                aria-label="Stop playback"
                className="group flex flex-col items-center py-2 px-1 rounded-lg border border-slate-500/60 bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500 text-slate-900 active:translate-y-0.5 shadow-md active:shadow-inner"
              >
                {ICONS.stop}
                <span className="text-[7px] font-bold tracking-tighter mt-1 text-slate-800 uppercase">
                  STOP
                </span>
              </button>

              {/* FF / NEXT */}
              <button
                type="button"
                onClick={nextTrack}
                aria-label="Fast Forward / Next Track"
                className="group flex flex-col items-center py-2 px-1 rounded-lg border border-slate-500/60 bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500 text-slate-900 active:translate-y-0.5 shadow-md active:shadow-inner"
              >
                {ICONS.next}
                <span className="text-[7px] font-bold tracking-tighter mt-1 text-slate-800 uppercase">
                  FF
                </span>
              </button>
            </div>
          </div>

          {/* ── BOTTOM/SIDE VOLUME SLIDER ── */}
          <div className="flex items-center justify-between pt-1 px-1">
            <span className="text-[9px] font-mono font-bold text-slate-400 tracking-wider">
              VOLUME
            </span>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-28 h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-400 border border-slate-800"
                aria-label="Volume level"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}