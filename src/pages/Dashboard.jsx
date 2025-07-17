import React, { useEffect } from "react";
import { CustomNavbar } from "../components/CustomNavbar";
import ItemPlatform from "../components/ItemPlatform/ItemPlatform";
import PlatformTemperatureChart from "../components/PlatformTemperatureChart";
import "./Dashboard.css";
import { useGetPlatformsByCompanyId } from "../api/hooks/usePlatform";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const threshold = 30;
  const navigate = useNavigate();

  const token = localStorage.getItem("bk_token");
  const companyId = Number(localStorage.getItem("bk_companyId"));

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const { data: platforms, isLoading, error } = useGetPlatformsByCompanyId(companyId);
  console.log(platforms);

  return (
    <div className="g-background">
      <CustomNavbar />
      <h1>Panel de Monitoreo Térmico</h1>
      <p>Visualiza el estado actual de temperatura en cada andén.</p>

      <div className="container-items">
        {platforms &&
          platforms.map((p, i) => <ItemPlatform key={p.id ?? i} platformId={p.id} name={p.name} temperature={p.temperature} threshold={threshold} />)}
      </div>
      <PlatformTemperatureChart data={platforms} threshold={threshold} />
    </div>
  );
}
