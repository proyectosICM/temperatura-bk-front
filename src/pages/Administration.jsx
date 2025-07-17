import React from "react";
import { FaBuilding, FaCubes, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Administration.css";
import { CustomNavbar } from "../components/CustomNavbar";
import AdminCard from "../components/AdminCard/AdminCard";

export function Administration() {
  const navigate = useNavigate();
  const role = localStorage.getItem("bk_role");

  return (
    <div className="g-background">
      <CustomNavbar />
      <div className="admin-container">
        <h2>Panel de Administración</h2>
        <div className="admin-card-grid">
          {role === "SA" && <AdminCard title="Empresas" icon={FaBuilding} onClick={() => navigate("/admin/empresas")} />}
          <AdminCard title="Andenes" icon={FaCubes} onClick={() => navigate("/admin/andenes")} />
          <AdminCard title="Usuarios" icon={FaUsers} onClick={() => navigate("/admin/usuarios")} />
        </div>
      </div>
    </div>
  );
}
