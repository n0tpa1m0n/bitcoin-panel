import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import styles from "./BlockCard.module.scss";

const BlockCard = ({ block, onEdit }) => {
  const { toggleBlockStatus, deleteBlock } = useAppContext();
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={`${styles.blockCard} ${
        block.status === "online" ? styles.online : styles.offline
      }`}
    >
      <div className={styles.blockImage}>
        {block.image && !imageError ? (
          <img
            src={block.image}
            alt={block.name}
            className={styles.blockImage}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={styles.gpuIcon}>💻</div>
        )}
      </div>

      <div className={styles.blockInfo}>
        <h3>{block.name}</h3>

        <div className={styles.statusRow}>
          <span>Статус: </span>
          <span className={styles.status}>
            {block.status === "online" ? "🟢 Онлайн" : "🔴 Офлайн"}
          </span>
        </div>

        <p>
          Хешрейт: <strong>{block.hashrate} MH/s</strong>
        </p>
        <p>
          Видеокарты: {block.gpuCount}x {block.gpuModel}
        </p>
      </div>

      <div className={styles.actions}>
        <button
          onClick={() => toggleBlockStatus(block.id)}
          className={
            block.status === "online" ? styles.stopBtn : styles.startBtn
          }
        >
          {block.status === "online" ? "⏹️ Остановить" : "▶️ Запустить"}
        </button>

        <button onClick={() => onEdit(block)} className={styles.editBtn}>
          ✏️ Редактировать
        </button>

        <button
          onClick={() => {
            if (window.confirm("Вы уверены, что хотите удалить этот блок?")) {
              deleteBlock(block.id);
            }
          }}
          className={styles.deleteBtn}
        >
          🗑️ Удалить
        </button>
      </div>
    </div>
  );
};

export default BlockCard;
