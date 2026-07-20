"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  /* On mount: read stored preference and apply immediately */
  useEffect(() => {
    const stored = window.localStorage.getItem("wedding-theme");
    const initial: Theme = stored === "light" ? "light" : "dark";
    applyTheme(initial);
    setTheme(initial);
  }, []);

  /* Whenever theme changes (after mount): apply to DOM + persist */
  useEffect(() => {
    applyTheme(theme);
    window.localStorage.setItem("wedding-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("dark", "light");
  root.classList.add(theme);
}
