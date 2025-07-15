import { FaThermometerHalf, FaSnowflake, FaFireAlt } from "react-icons/fa";
import "./ItemPlatform.css";

const ItemPlatform = ({ name, temperature, threshold = 30 }) => {
  const isHot = temperature > threshold;

  return (
    <div className="item-platform">
      <h3 className="item-platform-title">{name}</h3>

      <div className="item-platform-temp">
        {isHot ? (
          <FaFireAlt size={20} color="#e74c3c" />
        ) : (
          <FaThermometerHalf size={20} color="#3498db" />
        )}

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
  );
};

export default ItemPlatform;
