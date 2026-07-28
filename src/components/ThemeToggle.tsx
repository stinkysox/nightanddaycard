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
      className="group relative flex items-center gap-1.5 rounded-full px-1.5 py-1.5 transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
      style={{
        background: isDark
          ? "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)"
          : "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
        border: `1px solid ${isDark ? "rgba(99,102,241,0.5)" : "rgba(217,119,6,0.4)"}`,
        boxShadow: isDark
          ? "0 0 18px rgba(99,102,241,0.25), inset 0 1px 1px rgba(255,255,255,0.08)"
          : "0 0 18px rgba(251,191,36,0.3), inset 0 1px 1px rgba(255,255,255,0.6)",
        minWidth: 72,
        height: 34,
      }}
    >
      {/* Sun icon */}
      <span
        className="relative z-10 flex items-center justify-center w-6 h-6 transition-all duration-300"
        style={{ opacity: isDark ? 0.35 : 1, color: isDark ? "#a5b4fc" : "#d97706" }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className={`transition-transform duration-500 ${!isDark ? "rotate-0" : "-rotate-90"}`}>
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      </span>

      {/* Sliding knob — moves between sun (left) and moon (right) */}
      <span
        className="absolute top-[3px] w-[28px] h-[28px] rounded-full flex items-center justify-center transition-all duration-[380ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        style={{
          left: isDark ? "calc(100% - 31px)" : "3px",
          background: isDark
            ? "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)"
            : "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
          boxShadow: isDark
            ? "0 0 12px rgba(99,102,241,0.7), 0 2px 6px rgba(0,0,0,0.3)"
            : "0 0 12px rgba(251,191,36,0.8), 0 2px 6px rgba(0,0,0,0.15)",
        }}
      />

      {/* Moon icon */}
      <span
        className="relative z-10 flex items-center justify-center w-6 h-6 transition-all duration-300"
        style={{ opacity: isDark ? 1 : 0.35, color: isDark ? "#e0e7ff" : "#6366f1" }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className={`transition-transform duration-500 ${isDark ? "rotate-0" : "rotate-12"}`}>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>
    </button>
  );
}