import React, { useState } from "react";
import { Table, Container, Button, Spinner } from "react-bootstrap";
import { CustomNavbar } from "../components/CustomNavbar";
import "./Observations.css";
import { useGetObservationsByCompanyIdPaginated, useGetTodayObservationCountByCompany } from "../api/hooks/useObservations";
import { formatDateTime, getDateAndDayFromTimestamp } from "../utils/formatDate"; // 👈 importa aquí
import { useAuthRedirect } from "../api/hooks/useAuthRedirect";
import { MdOutlineDescription, MdOutlineReport, MdToday } from "react-icons/md";
import { FaCalendarAlt, FaClipboardList, FaUserCircle, FaWarehouse } from "react-icons/fa";
import { WiThermometer } from "react-icons/wi";

export function Observations() {
  useAuthRedirect();
  const companyId = Number(localStorage.getItem("bk_companyId"));
  const [page, setPage] = useState(0);
  const size = 5;

  const { data: observations, isLoading, error, isFetching } = useGetObservationsByCompanyIdPaginated(companyId, page, size);

  const { data: todayCount, isLoading: loadingCount } = useGetTodayObservationCountByCompany(companyId);

  const handlePrevious = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (!observations || observations.last) return;
    setPage(page + 1);
  };

  const getCardColor = (count) => {
    if (count === 0) return "#2ecc71"; // verde
    if (count <= 5) return "#f1c40f"; // amarillo
    return "#e74c3c"; // rojo
  };

  return (
    <div className="g-background">
      <CustomNavbar />
      <Container className="mt-4">
        <h1 className="text-light">
          {" "}
          <MdOutlineReport size={28} style={{ marginRight: "10px", verticalAlign: "middle" }} />
          Observaciones
        </h1>
        <p className="text-secondary">
          <FaClipboardList style={{ marginRight: "8px" }} />
          Lista de observaciones generadas manualmente o automáticamente.
        </p>

        <div
          style={{
            backgroundColor: getCardColor(todayCount || 0),
            padding: "16px",
            borderRadius: "12px",
            textAlign: "center",
            color: "#fff",
            fontWeight: "bold",
            marginBottom: "24px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
          }}
        >
          {loadingCount ? (
            <Spinner animation="border" variant="light" size="sm" />
          ) : (
            <>
              <div style={{ fontSize: "18px" }}>
                <MdToday size={22} />
                Observaciones del día
              </div>
              <div style={{ fontSize: "32px" }}>{todayCount}</div>
            </>
          )}
        </div>

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
                    <th>
                      <FaWarehouse style={{ marginRight: "6px" }} />
                      Andén
                    </th>
                    <th>
                      {" "}
                      <WiThermometer style={{ marginRight: "6px" }} />
                      Temperatura (°C)
                    </th>
                    <th>
                      <FaUserCircle style={{ marginRight: "6px" }} />
                      Creado por
                    </th>
                    <th>
                      {" "}
                      <MdOutlineDescription style={{ marginRight: "6px" }} />
                      Descripción
                    </th>
                    <th>
                      <FaCalendarAlt style={{ marginRight: "6px" }} />
                      Fecha
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {observations.content.map((obs) => (
                    <tr key={obs.id}>
                      <td>{obs.platform?.name ?? "—"}</td>
                      <td>{obs.temperature}</td>
                      <td>{obs.user?.name ?? "Sistema (Automático)"}</td>
                      <td>{obs.description}</td>
                      <td>{getDateAndDayFromTimestamp(obs.createdAt)}</td> {/* ✅ Formateo */}
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
              <Button variant="outline-light" onClick={handleNext} disabled={observations.last}>
                Siguiente →
              </Button>
            </div>
          </>
        )}
      </Container>
    </div>
  );
}
