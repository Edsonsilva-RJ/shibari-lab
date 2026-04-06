"use client"; // Essencial para componentes com interação (onClick/useEffect)
import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  // Ao montar o componente, verifica qual tema está no <html>
  useEffect(() => {
    const savedTheme = document.documentElement.getAttribute("data-theme") || "light";
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button 
      onClick={toggleTheme} 
      className={styles.themeBtn}
      aria-label="Alternar tema"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}