import React from "react";
import { CustomNavbar } from "../components/CustomNavbar";
import ItemPlatform from "../components/ItemPlatform/ItemPlatform";
import PlatformTemperatureChart from "../components/PlatformTemperatureChart";
import "./Dashboard.css";
import { useGetPlatformsByCompanyId } from "../api/hooks/usePlatform";

export function Dashboard() {
  const threshold = 30;
  const companyId = 1;

  const { data: platforms, isLoading, error } = useGetPlatformsByCompanyId(companyId);
  console.log(platforms);
  /*
  if (isLoading) return <p>Cargando andenes...</p>;
  if (error) return <p>Ocurrió un error al obtener los andenes.</p>;
  if (!platforms || platforms.length === 0) return <p>No hay andenes disponibles.</p>;

        
*/
  return (
    <div className="g-background">
      <CustomNavbar />
      <h1>Panel de Monitoreo Térmico</h1>
      <p>Visualiza el estado actual de temperatura en cada andén.</p>

      <div className="container-items">
        {platforms && platforms.map((p, i) => <ItemPlatform key={p.id ?? i} platformId={p.id}  name={p.name} temperature={p.temperature} threshold={threshold} />)}
      </div>
      <PlatformTemperatureChart data={platforms} threshold={threshold} />
    </div>
  );
}
