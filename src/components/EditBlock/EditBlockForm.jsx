import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { GPU_MODELS } from "../../data/gpuModels";
import styles from "./EditBlockForm.module.scss";

const EditBlockForm = ({ block, onClose }) => {
  const { updateBlock } = useAppContext();

  const [formData, setFormData] = useState({
    name: block.name,
    gpuModel: block.gpuModel,
    gpuCount: block.gpuCount,
    image: block.image || "",
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

    const updatedBlock = {
      ...block,
      ...formData,
      gpuCount: parseInt(formData.gpuCount),
      hashrate: selectedGPU ? selectedGPU.hashrate * formData.gpuCount : 0,
    };

    updateBlock(updatedBlock);

    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Редактировать блок</h2>
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
                  {model.name} ({model.hashrate} MH/s)
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
            <label htmlFor="image">
              Ссылка на изображение (необязательно):
            </label>
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
              Сохранить изменения
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

export default EditBlockForm;
