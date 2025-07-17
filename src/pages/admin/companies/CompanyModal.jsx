// src/features/companies/components/CompanyModal.jsx
import React, { useState, useEffect } from "react";
import "./CompanyModal.css";

const CompanyModal = ({
  isEdit = false,
  initialName = "",
  onClose,
  onSave,
}) => {
  const [name, setName] = useState("");

  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  const handleSave = () => {
    if (name.trim() === "") return;
    onSave(name.trim());
  };

  return (
    <div className="platform-modal-overlay" onClick={onClose}>
      <div className="platform-modal" onClick={(e) => e.stopPropagation()}>
        <h4>{isEdit ? "Editar Empresa" : "Registrar Empresa"}</h4>

        <label className="modal-label">Nombre:</label>
        <input
          type="text"
          className="modal-textarea"
          placeholder="Nombre de la empresa"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button className="modal-btn" onClick={handleSave}>
          {isEdit ? "Guardar cambios" : "Crear empresa"}
        </button>
        <button className="modal-link" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default CompanyModal;
