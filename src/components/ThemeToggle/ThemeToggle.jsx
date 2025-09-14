import React from "react";
import styles from "./ThemeToggle.module.scss";
import { useAppContext } from "../../context/AppContext";

const ThemeToggle = () => {
  const { isDarkTheme, toggleTheme } = useAppContext();

  return (
    <button
      onClick={toggleTheme}
      className={styles.themeToggle}
      aria-label="Переключить тему"
    >
      {isDarkTheme ? "Светлая тема" : "Темная тема"}
    </button>
  );
};

export default ThemeToggle;
