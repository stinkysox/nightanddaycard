"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      id="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to day mode" : "Switch to night mode"}
      className="relative overflow-hidden rounded-full transition-all"
      style={{
        width: 56,
        height: 28,
        background: isDark
          ? "linear-gradient(90deg, #0e1230, #1a2050)"
          : "linear-gradient(90deg, #87ceeb, #fde68a)",
        border: "1px solid var(--border)",
        boxShadow: "inset 0 1px 3px rgba(0,0,0,0.2)",
      }}
    >
      {/* Stars (night) */}
      {isDark && (
        <>
          <span
            className="absolute rounded-full bg-white animate-twinkle"
            style={{ width: 2, height: 2, top: 6, left: 8, animationDelay: "0s" }}
          />
          <span
            className="absolute rounded-full bg-white animate-twinkle"
            style={{ width: 2, height: 2, top: 14, left: 13, animationDelay: "0.9s" }}
          />
          <span
            className="absolute rounded-full bg-white animate-twinkle"
            style={{ width: 1.5, height: 1.5, top: 8, left: 19, animationDelay: "1.7s" }}
          />
        </>
      )}

      {/* Sun rays (day) */}
      {!isDark && (
        <svg
          className="absolute"
          style={{ left: 6, top: "50%", transform: "translateY(-50%)" }}
          width="16" height="16" viewBox="0 0 24 24"
          fill="rgba(255,180,0,0.6)"
        >
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="2" x2="12" y2="5" stroke="rgba(255,180,0,0.5)" strokeWidth="2" strokeLinecap="round"/>
          <line x1="12" y1="19" x2="12" y2="22" stroke="rgba(255,180,0,0.5)" strokeWidth="2" strokeLinecap="round"/>
          <line x1="2" y1="12" x2="5" y2="12" stroke="rgba(255,180,0,0.5)" strokeWidth="2" strokeLinecap="round"/>
          <line x1="19" y1="12" x2="22" y2="12" stroke="rgba(255,180,0,0.5)" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )}

      {/* Orb: moon ↔ sun */}
      <div
        className="absolute top-[3px] rounded-full transition-all duration-500"
        style={{
          width: 22,
          height: 22,
          left: isDark ? "calc(100% - 25px)" : "3px",
          background: isDark
            ? "radial-gradient(circle at 35% 35%, #f0f4ff, #c8d0e8)"
            : "radial-gradient(circle at 35% 35%, #fff9c4, #ffd447)",
          boxShadow: isDark
            ? "0 0 10px 3px rgba(200,210,240,0.5)"
            : "0 0 12px 4px rgba(255,210,70,0.6)",
        }}
      >
        {/* Moon craters */}
        {isDark && (
          <>
            <span className="absolute rounded-full bg-black/10" style={{ width: 5, height: 5, top: 4, left: 4 }} />
            <span className="absolute rounded-full bg-black/10" style={{ width: 3, height: 3, bottom: 4, right: 4 }} />
          </>
        )}
      </div>
    </button>
  );
}
