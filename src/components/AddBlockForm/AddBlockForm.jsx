import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { GPU_MODELS } from "../../data/gpuModels";
import styles from "./AddBlockForm.module.scss";

const AddBlockForm = ({ onClose }) => {
  const { addBlock } = useAppContext();
  const [formData, setFormData] = useState({
    name: "",
    gpuModel: GPU_MODELS[0].name,
    gpuCount: 1,
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedGPU = GPU_MODELS.find(
      (model) => model.name === formData.gpuModel
    );

    const newBlock = {
      ...formData,
      gpuCount: parseInt(formData.gpuCount),
      status: "offline",
      hashrate: selectedGPU ? selectedGPU.hashrate * formData.gpuCount : 0,
    };

    addBlock(newBlock);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Добавить новый блок</h2>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Название блока:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="gpuModel">Модель видеокарты:</label>
            <select
              id="gpuModel"
              name="gpuModel"
              value={formData.gpuModel}
              onChange={handleChange}
              required
            >
              {GPU_MODELS.map((model) => (
                <option key={model.id} value={model.name}>
                  {model.name} ({model.hashrate} MH/s, {model.power} кВт)
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="gpuCount">Количество видеокарт:</label>
            <input
              type="number"
              id="gpuCount"
              name="gpuCount"
              min="1"
              max="12"
              value={formData.gpuCount}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="image">Ссылка на изображение:</label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.submitButton}>
              Добавить блок
            </button>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlockForm;
