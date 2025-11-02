import React from "react";

export default function ThemeSwitcher({ theme, setTheme }) {
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <button onClick={toggleTheme} className="theme-switcher">
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
