import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { GPU_MODELS } from "../../data/gpuModels";
import styles from "./Dashboard.module.scss";
import BlockCard from "../BlockCard/BlockCard";
import AddBlockForm from "../AddBlockForm/AddBlockForm";
import EditBlockForm from "../EditBlock/EditBlockForm";

const Dashboard = () => {
  const { blocks } = useAppContext();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBlock, setEditingBlock] = useState(null);

  const handleEdit = (block) => {
    setEditingBlock(block);
  };

  const totalHashrate = blocks
    .filter((block) => block.status === "online")
    .reduce((sum, block) => sum + block.hashrate, 0);

  const profitPerHour = totalHashrate * 0.035;

  const powerConsumption = blocks
    .filter((block) => block.status === "online")
    .reduce((sum, block) => {
      const gpuModel = GPU_MODELS.find(
        (model) => model.name === block.gpuModel
      );
      const powerPerCard = gpuModel ? gpuModel.power : 0.3;
      return sum + block.gpuCount * powerPerCard;
    }, 0);

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardHeader}>
        <h1>Управление майнинг фермой</h1>
        <button
          className={styles.addButton}
          onClick={() => setShowAddForm(true)}
        >
          + Добавить блок
        </button>
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <h3>Общий хешрейт</h3>
          <p>{totalHashrate} MH/s</p>
        </div>
        <div className={styles.statCard}>
          <h3>Доход в час</h3>
          <p>${profitPerHour.toFixed(2)}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Потребление</h3>
          <p>{powerConsumption.toFixed(1)} кВт/ч</p>
        </div>
      </div>

      <div className={styles.blockGrid}>
        {blocks.map((block) => (
          <BlockCard key={block.id} block={block} onEdit={handleEdit} />
        ))}
      </div>

      {showAddForm && <AddBlockForm onClose={() => setShowAddForm(false)} />}

      {editingBlock && (
        <EditBlockForm
          block={editingBlock}
          onClose={() => setEditingBlock(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
