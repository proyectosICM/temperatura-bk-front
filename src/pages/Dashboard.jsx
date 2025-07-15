import React from "react";
import { CustomNavbar } from "../components/CustomNavbar";
import ItemPlatform from "../components/ItemPlatform/ItemPlatform";
import PlatformTemperatureChart from "../components/PlatformTemperatureChart";
import "./Dashboard.css";

export function Dashboard() {
  const platforms = [
    { name: "Andén 1", temperature: 22 },
    { name: "Andén 2", temperature: 35 },
    { name: "Andén 3", temperature: 18 },
    { name: "Andén 4", temperature: 41 },
    { name: "Andén 5", temperature: 25 },
    { name: "Andén 6", temperature: 39 },
    { name: "Andén 7", temperature: 27 },
    { name: "Andén 8", temperature: 44 },
    { name: "Andén 9", temperature: 20 },
    { name: "Andén 10", temperature: 33 },
  ];

  const threshold = 30;

  return (
    <div className="g-background">
      <CustomNavbar />
      <h1>Dashboard 2</h1>
      <p>Welcome to the Dashboard!</p>

      <div className="container-items">
        {platforms.map((p, i) => (
          <ItemPlatform key={i} name={p.name} temperature={p.temperature} threshold={threshold} />
        ))}
      </div>

      <PlatformTemperatureChart data={platforms} threshold={threshold} />
    </div>
  );
}
