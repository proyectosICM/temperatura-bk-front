import React, { useEffect, useState } from "react";

const PlatformModal = ({ isEdit = false, initialName = "", initialSensorId = "", initialTemperature = "", companyId, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [sensorId, setSensorId] = useState("");
  const [temperature, setTemperature] = useState("");

  useEffect(() => {
    setName(initialName);
    setSensorId(initialSensorId);
    setTemperature(initialTemperature);
  }, [initialName, initialSensorId, initialTemperature]);

  const handleSave = () => {
    if (name.trim() === "" || sensorId.trim() === "" || temperature === "") return;
    onSave({
      name: name.trim(),
      sensorId: sensorId.trim(),
      temperature: parseFloat(temperature),
      companyId,
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

        <label className="modal-label">Temperatura:</label>
        <input
          type="number"
          className="modal-textarea"
          placeholder="Temperatura"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
        />

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
