"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlay,
  FiPause,
  FiSkipForward,
  FiSkipBack,
  FiVolume2,
  FiVolumeX,
  FiMusic,
  FiChevronUp,
  FiRepeat,
} from "react-icons/fi";
import { playlist } from "@/data/weddingData";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.6);
  const [muted, setMuted] = useState(false);
  const [loop, setLoop] = useState(true);
  const [progress, setProgress] = useState(0.15);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const track = playlist[trackIndex];

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = muted ? 0 : volume;
  }, [volume, muted]);

  const togglePlay = () => {
    setIsPlaying((p) => !p);
    if (audioRef.current && track.src) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play().catch(() => {});
    }
  };

  const nextTrack = () => setTrackIndex((i) => (i + 1) % playlist.length);
  const prevTrack = () => setTrackIndex((i) => (i - 1 + playlist.length) % playlist.length);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <audio ref={audioRef} src={track.src || undefined} loop={loop} />

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="glass-panel rounded-2xl p-5 w-72 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-14 h-14 rounded-full border-2 border-gold/60 flex items-center justify-center bg-gradient-to-br from-[#2a1b3d] to-[#0d0a12] ${
                  isPlaying ? "animate-spin-slow" : ""
                }`}
              >
                <div className="w-3 h-3 rounded-full bg-gold" />
              </div>
              <div className="min-w-0">
                <p className="font-display text-sm text-gold-light truncate">{track.title}</p>
                <p className="font-body text-xs text-white/50 truncate">{track.artist}</p>
              </div>
            </div>

            {/* Waveform */}
            <div className="flex items-end gap-[3px] h-8 mb-3">
              {Array.from({ length: 28 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="w-[3px] rounded-full bg-gradient-to-t from-gold-dark to-gold-light"
                  animate={
                    isPlaying
                      ? { height: [4, 10 + ((i * 7) % 20), 4] }
                      : { height: 4 }
                  }
                  transition={{ duration: 0.8 + (i % 5) * 0.1, repeat: Infinity, delay: i * 0.03 }}
                />
              ))}
            </div>

            {/* Seek bar */}
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={progress}
              onChange={(e) => setProgress(parseFloat(e.target.value))}
              className="w-full accent-gold h-1 mb-4"
              aria-label="Seek"
            />

            <div className="flex items-center justify-between mb-4">
              <button onClick={prevTrack} aria-label="Previous track" className="text-gold-light/80 hover:text-gold transition">
                <FiSkipBack size={18} />
              </button>
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="w-11 h-11 rounded-full bg-gradient-to-br from-gold-light to-gold-dark flex items-center justify-center text-royal-black shadow-lg hover:scale-105 transition"
              >
                {isPlaying ? <FiPause size={18} /> : <FiPlay size={18} className="ml-0.5" />}
              </button>
              <button onClick={nextTrack} aria-label="Next track" className="text-gold-light/80 hover:text-gold transition">
                <FiSkipForward size={18} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setMuted((m) => !m)}
                aria-label="Mute"
                className="text-gold-light/70 hover:text-gold transition"
              >
                {muted ? <FiVolumeX size={16} /> : <FiVolume2 size={16} />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-24 accent-gold h-1"
                aria-label="Volume"
              />
              <button
                onClick={() => setLoop((l) => !l)}
                aria-label="Toggle loop"
                className={`transition ${loop ? "text-gold" : "text-gold-light/40"}`}
              >
                <FiRepeat size={16} />
              </button>
            </div>

            <p className="mt-3 text-[10px] text-center text-white/30 font-body tracking-wide">
              Add your audio files in <code>/public/audio</code> and set <code>src</code> in weddingData.ts
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2">
        {expanded && (
          <button
            onClick={() => setExpanded(false)}
            className="glass-panel w-9 h-9 rounded-full flex items-center justify-center text-gold-light/70 hover:text-gold transition"
            aria-label="Collapse player"
          >
            <FiChevronUp size={16} className="rotate-180" />
          </button>
        )}
        <motion.button
          onClick={() => setExpanded((e) => !e)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="glass-panel w-14 h-14 rounded-full flex items-center justify-center text-gold relative"
          aria-label="Toggle music player"
        >
          {isPlaying && (
            <span className="absolute inset-0 rounded-full border border-gold/40 animate-ping" />
          )}
          <FiMusic size={20} />
        </motion.button>
      </div>
    </div>
  );
}
