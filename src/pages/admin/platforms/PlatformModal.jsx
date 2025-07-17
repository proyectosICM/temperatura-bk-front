import React, { useEffect, useState } from "react";

const PlatformModal = ({ isEdit = false, initialName = "", initialSensorId = "", onClose, onSave }) => {
  const [name, setName] = useState("");
  const [sensorId, setSensorId] = useState("");
  const companyId = localStorage.getItem("bk_companyId");
 
  useEffect(() => {
    setName(initialName);
    setSensorId(initialSensorId);
  }, [initialName, initialSensorId]);

  const handleSave = () => {
    if (name.trim() === "" || sensorId.trim() === "") return;
    onSave({
      name: name.trim(),
      sensorId: sensorId.trim(),
      companyId: companyId,
    });
  };

  return (
    <div className="platform-modal-overlay" onClick={onClose}>
      <div className="platform-modal" onClick={(e) => e.stopPropagation()}>
        <h4>{isEdit ? "Editar Andén" : "Registrar Andén"}</h4>

        <label className="modal-label">Nombre:</label>
        <input type="text" className="modal-textarea" placeholder="Nombre del andén" value={name} onChange={(e) => setName(e.target.value)} />

        <label className="modal-label">Sensor Id:</label>
        <input type="text" className="modal-textarea" placeholder="ID del sensor" value={sensorId} onChange={(e) => setSensorId(e.target.value)} />

        <button className="modal-btn" onClick={handleSave}>
          {isEdit ? "Guardar cambios" : "Crear andén"}
        </button>
        <button className="modal-link" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default PlatformModal;
