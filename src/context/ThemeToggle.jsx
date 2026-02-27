import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "./ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        position: "fixed",
        top: "1.5rem",
        right: "1.5rem",
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        background: "var(--glass-bg)",
        backdropFilter: "blur(12px)",
        border: "1px solid var(--glass-border)",
        color: "var(--text-main)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "var(--shadow-lg)",
        zIndex: 1000,
        cursor: "pointer",
        transition: "all 0.3s ease",
      }}
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
    </button>
  );
};

export default ThemeToggle;
