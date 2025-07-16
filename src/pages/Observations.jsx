import React, { useState } from "react";
import { Table, Container, Button, Spinner } from "react-bootstrap";
import { CustomNavbar } from "../components/CustomNavbar";
import "./Observations.css";
import { useGetObservationsByCompanyIdPaginated } from "../api/hooks/useObservations";
import { formatDateTime } from "../utils/formatDate"; // 👈 importa aquí

export function Observations() {
  const companyId = 1;
  const [page, setPage] = useState(0);
  const size = 5;

  const {
    data: observations,
    isLoading,
    error,
    isFetching,
  } = useGetObservationsByCompanyIdPaginated(companyId, page, size);

  const handlePrevious = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (!observations || observations.last) return;
    setPage(page + 1);
  };

  return (
    <div className="g-background">
      <CustomNavbar />
      <Container className="mt-4">
        <h1 className="text-light">Observaciones</h1>
        <p className="text-secondary">
          Lista de observaciones generadas manualmente o automáticamente.
        </p>

        {isLoading || isFetching ? (
          <div className="text-light text-center">
            <Spinner animation="border" variant="light" />
          </div>
        ) : error ? (
          <div className="text-danger text-center">Error al cargar observaciones.</div>
        ) : (
          <>
            <div className="table-responsive">
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Andén</th>
                    <th>Temperatura (°C)</th>
                    <th>Creado por</th>
                    <th>Descripción</th>
                    <th>Fecha</th> {/* ✅ Nueva columna */}
                  </tr>
                </thead>
                <tbody>
                  {observations.content.map((obs) => (
                    <tr key={obs.id}>
                      <td>{obs.platform?.name ?? "—"}</td>
                      <td>{obs.temperature}</td>
                      <td>{obs.user?.name ?? "Sistema (Automático)"}</td>
                      <td>{obs.description}</td>
                      <td>{formatDateTime(obs.createdAt)}</td> {/* ✅ Formateo */}
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
                Página {page + 1} de {observations.totalPages}
              </span>
              <Button
                variant="outline-light"
                onClick={handleNext}
                disabled={observations.last}
              >
                Siguiente →
              </Button>
            </div>
          </>
        )}
      </Container>
    </div>
  );
}
