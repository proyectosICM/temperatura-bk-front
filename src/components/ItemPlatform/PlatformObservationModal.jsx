import "./PlatformObservationModal.css"; // usa los mismos estilos
import { formatDateTime } from "../../utils/formatDate"; // opcional si usas fecha

const PlatformObservationModal = ({
  currentUser,
  observationText,
  setObservationText,
  onClose,
  onSave,
  onViewLogs,
}) => {
  return (
    <div className="platform-modal-overlay" onClick={onClose}>
      <div className="platform-modal" onClick={(e) => e.stopPropagation()}>
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

        <button className="modal-btn" onClick={onSave}>
          Guardar
        </button>
        <button className="modal-link" onClick={onViewLogs}>
          Ver logs detallados
        </button>
      </div>
    </div>
  );
};

export default PlatformObservationModal;
