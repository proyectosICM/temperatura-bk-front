import { useState } from "react";
import { FaThermometerHalf, FaSnowflake, FaFireAlt } from "react-icons/fa";
import "./ItemPlatform.css";
import { useNavigate } from "react-router-dom";

const ItemPlatform = ({ platformId, name, temperature, threshold = 30, currentUser = "Juan Pérez" }) => {
  const navigate = useNavigate();
  const isHot = temperature > threshold;
  const [showModal, setShowModal] = useState(false);
  const [observationText, setObservationText] = useState("");

  const handleClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleViewLogs = () => {
  navigate(`/logs-detallados/${platformId}`);
};

  return (
    <>
      <div className="item-platform" onClick={handleClick}>
        <h3 className="item-platform-title">{name}</h3>

        <div className="item-platform-temp">
          {isHot ? <FaFireAlt size={20} color="#e74c3c" /> : <FaThermometerHalf size={20} color="#3498db" />}

          <span
            style={{
              color: isHot ? "#e74c3c" : "#333",
              fontWeight: isHot ? "bold" : "normal",
            }}
          >
            Temperatura {temperature}°C
          </span>

          <FaSnowflake size={18} color={isHot ? "#ccc" : "#3498db"} />
        </div>
      </div>

      {showModal && (
        <div className="platform-modal-overlay" onClick={closeModal}>
          <div
            className="platform-modal"
            onClick={(e) => e.stopPropagation()} // evita cerrar al hacer click dentro
          >
            <h4>Registrar observación</h4>

            <label className="modal-label">Usuario:</label>
            <select className="modal-select" value={currentUser} disabled>
              <option>{currentUser}</option>
            </select>

            <textarea
              value={observationText}
              onChange={(e) => setObservationText(e.target.value)}
              placeholder="Escribe una observación..."
              className="modal-textarea"
            />

            <button className="modal-btn" onClick={() => alert("Guardar observación")}>
              Guardar
            </button>
            <button className="modal-link" onClick={handleViewLogs}>
              Ver logs detallados
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemPlatform;
