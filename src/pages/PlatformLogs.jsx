import React, { useState } from "react";
import { Table, Spinner, Container, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { CustomNavbar } from "../components/CustomNavbar";
import { useGetLogsByPlatformIdPaginated } from "../api/hooks/useTemperatureLog";
import { formatDateTime } from "../utils/formatDate"; // 🕒 util para formatear fechas
import "./PlatformLogs.css";

export function PlatformLogs() {
  const { platformId } = useParams();
  const [page, setPage] = useState(0);
  const size = 5;

  const { data: logsPage, isLoading, error, isFetching } = useGetLogsByPlatformIdPaginated(platformId, page, size);

  const handlePrevious = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (!logsPage || logsPage.last) return;
    setPage(page + 1);
  };

  return (
    <div className="g-background platform-logs-container">
      <CustomNavbar />
      <Container className="mt-4">
        <h2 className="text-light">Logs detallados de la plataforma {platformId}</h2>
        <p className="text-secondary">Historial de temperaturas registradas por esta plataforma.</p>

        {isLoading || isFetching ? (
          <div className="text-light text-center">
            <Spinner animation="border" variant="light" />
          </div>
        ) : error ? (
          <div className="text-danger text-center">Error al cargar logs.</div>
        ) : !logsPage || !logsPage.content || logsPage.content.length === 0 ? (
          <p className="text-light text-center">No hay logs registrados para esta plataforma.</p>
        ) : (
          <>
            <div className="table-responsive">
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Temperatura (°C)</th>
                    <th>Registrado por</th>
                    <th>Andén</th>
                  </tr>
                </thead>
                <tbody>
                  {logsPage.content.map((log) => (
                    <tr key={log.id}>
                      <td>{formatDateTime(log.createdAt)}</td>
                      <td>{log.temperature}</td>
                      <td>{log.user?.name || "Sistema (Automático)"}</td>
                      <td>{log.platform?.name || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            <div className="d-flex justify-content-between mt-3">
              <Button variant="outline-light" onClick={handlePrevious} disabled={page === 0}>
                ← Anterior
              </Button>
              <span className="text-light align-self-center">
                Página {page + 1} de {logsPage.totalPages}
              </span>
              <Button variant="outline-light" onClick={handleNext} disabled={logsPage.last}>
                Siguiente →
              </Button>
            </div>
          </>
        )}
      </Container>
    </div>
  );
}
