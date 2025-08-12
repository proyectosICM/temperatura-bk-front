import React, { useEffect, useState } from "react";

const PlatformModal = ({
  isEdit = false,
  initialName = "",
  initialSensorId = "",
  initialMinTemperature = "",
  initialMaxTemperature = "",
  onClose,
  onSave,
}) => {
  const [name, setName] = useState("");
  const [sensorId, setSensorId] = useState("");
  const [minTemperature, setMinTemperature] = useState("");
  const [maxTemperature, setMaxTemperature] = useState("");
  const companyId = localStorage.getItem("bk_companyId");

  useEffect(() => {
    setName(initialName);
    setSensorId(initialSensorId);
    setMinTemperature(initialMinTemperature);
    setMaxTemperature(initialMaxTemperature);
  }, [initialName, initialSensorId, initialMinTemperature, initialMaxTemperature]);

  const handleSave = () => {
    if ((name.trim() === "" || sensorId.trim() === "", minTemperature === "" || maxTemperature === "")) return;
    onSave({
      name: name.trim(),
      sensorId: sensorId.trim(),
      minTemperature: parseFloat(minTemperature),
      maxTemperature: parseFloat(maxTemperature),
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

        <label className="modal-label">Temperatura mínima:</label>
        <input
          type="number"
          step="0.1"
          className="modal-textarea"
          placeholder="Ej: 15.5"
          value={minTemperature}
          onChange={(e) => setMinTemperature(e.target.value)}
        />

        <label className="modal-label">Temperatura máxima:</label>
        <input
          type="number"
          step="0.1"
          className="modal-textarea"
          placeholder="Ej: 40.8"
          value={maxTemperature}
          onChange={(e) => setMaxTemperature(e.target.value)}
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
