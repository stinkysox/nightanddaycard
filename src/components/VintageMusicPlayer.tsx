"use client";

import { useEffect, useRef, useState } from "react";

const playlist = [
  {
    title: "Wedding Song",
    artist: "Special Melody",
    src: "/audio/audio.mp3",
  },
];

function formatTime(s: number) {
  if (!Number.isFinite(s) || s < 0) return "000";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  // Simulating a 3-digit mechanical tape counter
  return `${String(m).padStart(1, "0")}${String(sec).padStart(2, "0")}`;
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
    const onPlay = () => {
      setIsPlaying(true);
      isPlayingRef.current = true;
    };
    const onPause = () => {
      setIsPlaying(false);
      isPlayingRef.current = false;
    };

    // Pause when tab is hidden / browser is closed, resume when tab is visible again
    const onVisibilityChange = () => {
      if (document.hidden) {
        if (isPlayingRef.current) audio.pause();
      } else {
        if (isPlayingRef.current) audio.play().catch(() => {});
      }
    };

    // pagehide fires when the browser tab/window is being unloaded
    const onPageHide = () => {
      audio.pause();
    };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("durationchange", onMeta);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", onPageHide);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("durationchange", onMeta);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", onPageHide);
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
    // Disabled functionality as requested
  };

  const nextTrack = () => {
    // Disabled functionality as requested
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(duration)) return;
    audio.currentTime = (Number(e.target.value) / 100) * duration;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  // Calculate magnetic tape roll size
  const leftTapeRadius = 24 + (1 - progress / 100) * 18;
  const rightTapeRadius = 24 + (progress / 100) * 18;

  return (
    <div className="w-full max-w-[310px] sm:max-w-sm mx-auto px-4 py-8 select-none font-sans relative z-10">
      <audio ref={audioRef} preload="metadata" loop />

      <style>{`
        @keyframes walkman-spool {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-walkman-spool {
          animation: walkman-spool 2s linear infinite;
        }
        .button-press {
          box-shadow: inset 0 4px 6px rgba(0,0,0,0.6), inset 0 1px 3px rgba(0,0,0,0.8) !important;
          transform: translateY(2px);
        }
      `}</style>

      {/* ── INSTRUCTION TEXT ── */}
      <div className="text-center mb-3">
        <span className="text-[11px] tracking-wider uppercase font-semibold text-slate-300 bg-black/30 px-3 py-1 rounded-full border border-white/10 shadow-sm backdrop-blur-sm">
          Tap the Play button to listen
        </span>
      </div>

      {/* ── WALKMAN CHASSIS ── */}
      <div
        className="rounded-[1.5rem] border border-slate-900 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] relative overflow-hidden scale-[0.92] sm:scale-100 origin-center"
        style={{
          background: "linear-gradient(175deg, #184b72 0%, #112d4a 60%, #0a1829 100%)",
          boxShadow: "inset 1px 1px 2px rgba(255,255,255,0.2), inset -2px -4px 8px rgba(0,0,0,0.6), 0 20px 40px rgba(0,0,0,0.5)",
        }}
      >
        {/* Top Silver Metallic Panel */}
        <div
          className="h-14 sm:h-16 w-full relative"
          style={{
            background: "linear-gradient(180deg, #e2e5e9 0%, #a8aeb8 100%)",
            boxShadow: "inset 0 -2px 5px rgba(0,0,0,0.3), inset 0 2px 2px rgba(255,255,255,0.8)",
          }}
        >
          {/* Panel details */}
          <div className="absolute top-2.5 sm:top-3 left-4 right-4 flex justify-between items-start">
            <div className="flex gap-2 items-center">
              {/* Headphone Jacks */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-950 border border-zinc-400 shadow-inner flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-black shadow-[inset_0_2px_4px_rgba(0,0,0,1)]" />
                </div>
                <span className="text-[5px] sm:text-[6px] font-mono font-bold text-zinc-700 tracking-widest uppercase">Guys</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-950 border border-zinc-400 shadow-inner flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-black shadow-[inset_0_2px_4px_rgba(0,0,0,1)]" />
                </div>
                <span className="text-[5px] sm:text-[6px] font-mono font-bold text-zinc-700 tracking-widest uppercase">Dolls</span>
              </div>
            </div>
            
            {/* Battery / Op LED */}
            <div className="flex flex-col items-center gap-1">
              <div className={`w-3 h-3 rounded-full border border-zinc-500 shadow-inner flex items-center justify-center bg-zinc-900`}>
                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isPlaying ? 'bg-red-500 shadow-[0_0_8px_#ef4444]' : 'bg-red-950'}`} />
              </div>
              <span className="text-[5px] sm:text-[6px] font-bold text-zinc-700 tracking-widest uppercase">Opr/Batt</span>
            </div>
          </div>
        </div>

        {/* Brand Header */}
        <div className="px-4 sm:px-5 pt-3 sm:pt-4 pb-2">
          <div className="flex items-end gap-3">
            {/* Fake logo mark */}
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-sm bg-gradient-to-br from-zinc-200 to-zinc-400 flex items-center justify-center shadow-sm">
              <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-[2px] border-zinc-600 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full" />
              </div>
            </div>
            <div>
              <span className="text-[15px] sm:text-[18px] font-black tracking-[0.2em] text-white uppercase italic font-sans block leading-none shadow-black drop-shadow-md">
                WALKMAN
              </span>
              <span className="text-[7px] sm:text-[8px] font-bold text-sky-200 tracking-[0.25em] uppercase block mt-0.5 opacity-80">
                STEREO CASSETTE PLAYER
              </span>
            </div>
          </div>
        </div>

        {/* ── CASSETTE DOOR & WINDOW ── */}
        <div className="px-3.5 sm:px-4 pb-4 relative">
          <div
            className="rounded-lg p-2.5 sm:p-3 relative overflow-hidden"
            style={{
              background: "#111418",
              boxShadow: "inset 0 6px 15px rgba(0,0,0,0.8), inset 0 1px 3px rgba(0,0,0,1), 0 1px 1px rgba(255,255,255,0.15)",
              borderTop: "2px solid #080a0c",
              borderBottom: "1px solid #2d455d",
            }}
          >
            {/* Cassette Tape Plastic Housing */}
            <div className="w-full h-full bg-[#dfdcd6] rounded relative border border-black/40 overflow-hidden shadow-[inset_0_0_15px_rgba(0,0,0,0.2)]">
              
              {/* Tape Label Sticker */}
              <div className="absolute top-2 left-3 right-3 sm:left-4 sm:right-4 h-11 sm:h-12 bg-[#c64426] rounded-sm flex flex-col items-center justify-center shadow-sm border border-black/10">
                <div className="w-full h-1 bg-white/20 absolute top-1" />
                <p className="font-bold text-[11px] sm:text-xs text-white truncate tracking-tight z-10 px-2 w-full text-center drop-shadow-sm">
                  {track.title}
                </p>
                <p className="text-[8px] sm:text-[9px] font-semibold text-white/80 truncate mt-0.5 uppercase tracking-wider z-10">
                  {track.artist}
                </p>
              </div>

              {/* Tape Reels Area Background */}
              <div className="absolute top-15 sm:top-16 left-5 right-5 sm:left-6 sm:right-6 h-12 sm:h-14 bg-[#1a1a1a] rounded-full flex justify-between items-center px-1 shadow-[inset_0_4px_10px_rgba(0,0,0,0.8)] border border-white/20">
                
                {/* Left Reel */}
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
                  {/* Magnetic Tape Roll */}
                  <div
                    className="absolute rounded-full bg-[#2a1c14] border border-[#1a120c] transition-all duration-300 shadow-[0_0_2px_rgba(0,0,0,0.5)]"
                    style={{
                      width: `${leftTapeRadius * 2}%`,
                      height: `${leftTapeRadius * 2}%`,
                    }}
                  />
                  {/* White Plastic Spool Core */}
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#e5e5e5] border border-gray-400 flex items-center justify-center relative z-10 shadow-sm ${isPlaying ? "animate-walkman-spool" : ""}`}
                  >
                    {/* Gear Teeth */}
                    <div className="w-full h-full relative">
                      {[0, 60, 120].map((deg, i) => (
                        <div key={i} className="absolute inset-0 m-auto w-1 h-7 sm:h-8 bg-zinc-800" style={{ transform: `rotate(${deg}deg)` }} />
                      ))}
                    </div>
                    {/* Spool Center Pin Hole */}
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#111] absolute m-auto shadow-inner border border-zinc-500" />
                  </div>
                </div>

                {/* Right Reel */}
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
                  <div
                    className="absolute rounded-full bg-[#2a1c14] border border-[#1a120c] transition-all duration-300 shadow-[0_0_2px_rgba(0,0,0,0.5)]"
                    style={{
                      width: `${rightTapeRadius * 2}%`,
                      height: `${rightTapeRadius * 2}%`,
                    }}
                  />
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#e5e5e5] border border-gray-400 flex items-center justify-center relative z-10 shadow-sm ${isPlaying ? "animate-walkman-spool" : ""}`}
                  >
                    <div className="w-full h-full relative">
                      {[0, 60, 120].map((deg, i) => (
                        <div key={i} className="absolute inset-0 m-auto w-1 h-7 sm:h-8 bg-zinc-800" style={{ transform: `rotate(${deg}deg)` }} />
                      ))}
                    </div>
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#111] absolute m-auto shadow-inner border border-zinc-500" />
                  </div>
                </div>
              </div>
              
              {/* Transparent Window Glass Reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none transform translate-y-[-20%] rotate-12 mix-blend-overlay" />
            </div>
            
            {/* Mechanical Tape Counter */}
            <div className="absolute top-3.5 sm:top-4 right-3.5 sm:right-4 bg-[#111] border-2 border-[#333] shadow-inner rounded-sm px-1.5 py-0.5 flex">
              {formatTime(currentTime).split('').map((digit, idx) => (
                <div key={idx} className="bg-white text-black font-mono font-bold text-[9px] sm:text-[10px] w-2.5 text-center leading-tight mx-[1px] border border-gray-400 shadow-inner">
                  {digit}
                </div>
              ))}
            </div>

          </div>

          {/* Hidden slider for seeking over the cassette door */}
          <input
            type="range"
            min={0}
            max={100}
            value={progress || 0}
            onChange={seek}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            aria-label="Seek position"
          />
        </div>

        {/* ── MECHANICAL CONTROLS ── */}
        <div className="px-3.5 sm:px-4 pb-5 sm:pb-6">
          <div className="bg-[#0b141d] rounded-xl p-2.5 sm:p-3 border-t border-black/50 shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)]">
            
            <div className="grid grid-cols-4 gap-1.5 mb-3">
              {/* REW Button (Disabled) */}
              <button
                type="button"
                onClick={prevTrack}
                disabled
                className="group flex flex-col items-center justify-center h-11 sm:h-12 rounded-sm text-zinc-500 opacity-60 cursor-not-allowed"
                style={{
                  background: "linear-gradient(180deg, #3f4551 0%, #20242a 100%)",
                  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.3), 0 4px 6px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.8)",
                  borderBottom: "3px solid #111",
                }}
              >
                {ICONS.prev}
                <span className="text-[7px] font-black tracking-wider mt-1 text-zinc-500">REW</span>
              </button>

              {/* PLAY Button (Active) */}
              <button
                type="button"
                onClick={togglePlay}
                className={`group flex flex-col items-center justify-center h-11 sm:h-12 rounded-sm transition-all ${isPlaying ? 'button-press text-white' : 'text-zinc-300 active:button-press'}`}
                style={{
                  background: isPlaying 
                    ? "linear-gradient(180deg, #2b303b 0%, #15181c 100%)" 
                    : "linear-gradient(180deg, #3f4551 0%, #20242a 100%)",
                  boxShadow: isPlaying 
                    ? "inset 0 4px 6px rgba(0,0,0,0.6), inset 0 1px 3px rgba(0,0,0,0.8)" 
                    : "inset 0 1px 1px rgba(255,255,255,0.3), 0 4px 6px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.8)",
                  borderBottom: isPlaying ? "0" : "3px solid #111",
                }}
              >
                {ICONS.play}
                <span className={`text-[7px] font-black tracking-wider mt-1 ${isPlaying ? 'text-zinc-200' : 'text-zinc-400 group-active:text-white'}`}>PLAY</span>
              </button>

              {/* STOP Button (Active) */}
              <button
                type="button"
                onClick={stopPlay}
                className="group flex flex-col items-center justify-center h-11 sm:h-12 rounded-sm text-zinc-300 transition-all active:button-press"
                style={{
                  background: "linear-gradient(180deg, #3f4551 0%, #20242a 100%)",
                  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.3), 0 4px 6px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.8)",
                  borderBottom: "3px solid #111",
                }}
              >
                {ICONS.stop}
                <span className="text-[7px] font-black tracking-wider mt-1 text-zinc-400 group-active:text-white">STOP</span>
              </button>

              {/* FF Button (Disabled) */}
              <button
                type="button"
                onClick={nextTrack}
                disabled
                className="group flex flex-col items-center justify-center h-11 sm:h-12 rounded-sm text-zinc-500 opacity-60 cursor-not-allowed"
                style={{
                  background: "linear-gradient(180deg, #3f4551 0%, #20242a 100%)",
                  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.3), 0 4px 6px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.8)",
                  borderBottom: "3px solid #111",
                }}
              >
                {ICONS.next}
                <span className="text-[7px] font-black tracking-wider mt-1 text-zinc-500">FF</span>
              </button>
            </div>

            {/* Volume Control Slider */}
            <div className="flex items-center gap-3 bg-black/40 p-2 rounded-lg border border-white/5 shadow-inner">
              <span className="text-[8px] font-mono font-bold text-zinc-400 tracking-wider">VOL</span>
              <div className="relative flex-1 flex items-center">
                {/* Custom slider track to look like a mechanical slot */}
                <div className="absolute w-full h-1 bg-black rounded-full shadow-[inset_0_1px_3px_rgba(0,0,0,1)] border-b border-white/10 pointer-events-none" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full h-4 opacity-0 cursor-pointer z-10"
                  aria-label="Volume level"
                />
                {/* Custom Thumb indicator */}
                <div 
                  className="absolute h-3 w-4 bg-gradient-to-b from-zinc-300 to-zinc-500 rounded-[2px] shadow-md border border-black pointer-events-none flex items-center justify-center"
                  style={{ left: `calc(${volume * 100}% - 8px)` }}
                >
                  <div className="w-0.5 h-1.5 bg-black/50" />
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}