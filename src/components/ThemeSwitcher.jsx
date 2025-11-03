import React, { useState, useEffect } from "react";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      style={{
        margin: "10px",
        padding: "10px 20px",
        borderRadius: "8px",
        backgroundColor: theme === "light" ? "#333" : "#eee",
        color: theme === "light" ? "#fff" : "#000",
        border: "none",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      {theme === "light" ? "Switch to Dark" : "Switch to Light"}
    </button>
  );
};

export default ThemeSwitcher;
