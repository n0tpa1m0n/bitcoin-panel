import React from "react";
import styles from "./Header.module.scss";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>⛏️</span>
        Контроль майнинговой фермы
      </div>
      <ThemeToggle />
    </header>
  );
};
export default Header;
