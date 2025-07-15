import React from "react";
import { Table, Container } from "react-bootstrap";
import { CustomNavbar } from "../components/CustomNavbar";
import "./Observations.css"; // si necesitas agregar más estilos

export function Observations() {
  const observaciones = [
    {
      anden: "Andén 2",
      temperatura: 35,
      creador: "Sistema (Automático)",
      descripcion: "Temperatura fuera de rango detectada.",
    },
    {
      anden: "Andén 5",
      temperatura: 25,
      creador: "Juan Pérez",
      descripcion: "Sensor revisado manualmente. Todo en orden.",
    },
    {
      anden: "Andén 8",
      temperatura: 44,
      creador: "Sistema (Automático)",
      descripcion: "Alerta crítica: temperatura muy elevada.",
    },
  ];

  return (
    <div className="g-background">
      <CustomNavbar />
      <Container className="mt-4">
        <h1 className="text-light">Observations</h1>
        <p className="text-secondary">
          Lista de observaciones generadas manualmente o automáticamente.
        </p>

        <div className="table-responsive">
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Andén</th>
                <th>Temperatura (°C)</th>
                <th>Creado por</th>
                <th>Descripcion</th>
              </tr>
            </thead>
            <tbody>
              {observaciones.map((obs, i) => (
                <tr key={i}>
                  <td>{obs.anden}</td>
                  <td>{obs.temperatura}</td>
                  <td>{obs.creador}</td>
                  <td>{obs.descripcion}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
}
