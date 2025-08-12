import { useState } from "react";
import { FaThermometerHalf, FaSnowflake, FaFireAlt, FaCheckCircle } from "react-icons/fa";
import "./ItemPlatform.css";
import { useNavigate } from "react-router-dom";
import PlatformObservationModal from "./PlatformObservationModal";
import { useCreateObservation } from "../../api/hooks/useObservations";
import Swal from "sweetalert2";

const ItemPlatform = ({ platformId, name, temperature, minTemperature, maxTemperature }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [observationText, setObservationText] = useState("");

  const userId = parseInt(localStorage.getItem("bk_userId"));
  const userName = localStorage.getItem("bk_name");
  const companyId = parseInt(localStorage.getItem("bk_companyId"));
  const currentUser = { id: userId, name: userName };

  const createObservation = useCreateObservation();

  const handleClick = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleViewLogs = () => navigate(`/logs-detallados/${platformId}`);

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

  // Determinar estado de temperatura
  let color = "#3498db";
  let Icon = FaThermometerHalf;
  let statusText = "Temperatura normal";

  if (temperature < minTemperature) {
    color = "#2980b9"; // azul
    Icon = FaSnowflake;
    statusText = `Por debajo del mínimo (${minTemperature}°C)`;
  } else if (temperature > maxTemperature) {
    color = "#e74c3c"; // rojo
    Icon = FaFireAlt;
    statusText = `Por encima del máximo (${maxTemperature}°C)`;
  } else {
    color = "#27ae60"; // verde
    Icon = FaCheckCircle;
  }

  return (
    <>
      <div className="item-platform" onClick={handleClick}>
        <h3 className="item-platform-title">{name}</h3>

        <div className="item-platform-temp">
          <Icon size={20} color={color} />
          <span
            style={{
              color: color,
              fontWeight: temperature < minTemperature || temperature > maxTemperature ? "bold" : "normal",
              marginLeft: "6px",
            }}
          >
            {temperature}°C
          </span>
        </div>

        <p style={{ color, fontSize: "0.9em", marginTop: "4px" }}>
          {statusText}
        </p>
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
 