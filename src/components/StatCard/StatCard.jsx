import React from "react";
import styles from "./StatCard.module.scss";

const StatCard = ({ title, value }) => {
  return (
    <div className={styles.statCard}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.value}>{value}</p>
    </div>
  );
};

export default StatCard;
