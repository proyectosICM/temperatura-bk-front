import React from "react";
import "./AdminCard.css";

const AdminCard = ({ title, icon: Icon, onClick }) => {
  return (
    <div className="admin-card" onClick={onClick}>
      <div className="admin-card-icon">
        <Icon size={32} />
      </div>
      <h3 className="admin-card-title">{title}</h3>
    </div>
  );
};

export default AdminCard;
