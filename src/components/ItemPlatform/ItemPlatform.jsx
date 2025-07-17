import { useState } from "react";
import { FaThermometerHalf, FaSnowflake, FaFireAlt } from "react-icons/fa";
import "./ItemPlatform.css";
import { useNavigate } from "react-router-dom";
import PlatformObservationModal from "./PlatformObservationModal";
import { useCreateObservation } from "../../api/hooks/useObservations";
import Swal from "sweetalert2";

const ItemPlatform = ({ platformId, name, temperature, threshold = 30 }) => {
  const navigate = useNavigate();
  const isHot = temperature > threshold;
  const [showModal, setShowModal] = useState(false);
  const [observationText, setObservationText] = useState("");

  const userId = parseInt(localStorage.getItem("bk_userId"));
  const userName = localStorage.getItem("bk_name");
  const companyId = parseInt(localStorage.getItem("bk_companyId"));
  const currentUser = { id: userId, name: userName };

  const createObservation = useCreateObservation();

  const handleClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleViewLogs = () => {
    navigate(`/logs-detallados/${platformId}`);
  };

  const handleSave = () => {
    if (!observationText.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Observación vacía",
        text: "La observación no puede estar vacía",
      });
      return;
    }

    const newObservation = {
      temperature,
      description: observationText,
      user: { id: currentUser.id },
      platform: { id: platformId },
      company: { id: companyId },
    };

    createObservation.mutate(newObservation, {
      onSuccess: () => {
        Swal.fire({
          icon: "success",
          title: "¡Guardado!",
          text: "Observación guardada correctamente",
          timer: 2000,
          showConfirmButton: false,
        });
        setObservationText("");
        setShowModal(false);
      },
      onError: () => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al guardar la observación",
        });
      },
    });
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
        <PlatformObservationModal
          currentUser={currentUser}
          observationText={observationText}
          setObservationText={setObservationText}
          onClose={closeModal}
          onSave={handleSave}
          onViewLogs={handleViewLogs}
        />
      )}
    </>
  );
};

export default ItemPlatform;
