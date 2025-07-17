import React, { useState } from "react";
import { Button, Container, Spinner } from "react-bootstrap";

import PlatformsTable from "./PlatformsTable";
import PlatformModal from "./PlatformModal";
import "./PlatformsCrud.css";
import {
  useCreatePlatform,
  useDeletePlatform,
  useGetPlatformsByCompanyId,
  useGetPlatformsByCompanyIdPaginated,
  getAllPlatformsPaginated,
  useUpdatePlatform,
} from "../../../api/hooks/usePlatform";
import { CustomNavbar } from "../../../components/CustomNavbar";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";

export function PlatformsCrud() {
  const [page, setPage] = useState(0);
  const size = 5;
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPlatform, setCurrentPlatform] = useState(null);
  const companyId = localStorage.getItem("bk_companyId");
  const role = localStorage.getItem("bk_role");

  const { data: platforms, isLoading, error, isFetching } = useGetPlatformsByCompanyIdPaginated(companyId);
  const { mutate: createPlatform } = useCreatePlatform();
  const { mutate: updatePlatform } = useUpdatePlatform();
  const { mutate: deletePlatform } = useDeletePlatform();

  const handlePrevious = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (!platforms || platforms.last) return;
    setPage(page + 1);
  };

  const handleSavePlatform = (platformData) => {
    if (isEditMode && currentPlatform) {
      updatePlatform(
        { id: currentPlatform.id, ...platformData },
        {
          onSuccess: () => {
            Swal.fire("Actualizado", "Empresa actualizada correctamente", "success");
            setShowModal(false);
            setCurrentPlatform(null);
          },
          onError: () => {
            Swal.fire("Error", "No se pudo actualizar la empresa", "error");
          },
        }
      );
    } else {
      createPlatform(platformData, {
        onSuccess: () => {
          Swal.fire("Éxito", "Empresa creada correctamente", "success");
          setShowModal(false);
        },
        onError: () => {
          Swal.fire("Error", "No se pudo crear la empresa", "error");
        },
      });
    }
  };

  const handleDeletePlatform = (companyId) => {
    Swal.fire({
      title: "¿Eliminar empresa?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePlatform(companyId, {
          onSuccess: () => {
            Swal.fire("Eliminado", "La empresa ha sido eliminada.", "success");
          },
          onError: () => {
            Swal.fire("Error", "No se pudo eliminar la empresa.", "error");
          },
        });
      }
    });
  };

  const handleOpenCreateModal = () => {
    setIsEditMode(false);
    setCurrentPlatform(null);
    setShowModal(true);
  };

  const handleEditPlatform = (company) => {
    setCurrentPlatform(company);
    setIsEditMode(true);
    setShowModal(true);
  };

  return (
    <div className="g-background">
      <CustomNavbar />
      <Container className="mt-4 companies-container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h1 className="text-light">Andenes</h1>
            <p className="text-secondary">Lista de andenes registradas en el sistema.</p>
          </div>
          <Button variant="success" className="d-flex align-items-center gap-2" onClick={handleOpenCreateModal}>
            <FaPlus /> Agregar
          </Button>
        </div>

        {isLoading || isFetching ? (
          <div className="text-light text-center">
            <Spinner animation="border" variant="light" />
          </div>
        ) : error ? (
          <div className="text-danger text-center">Error al cargar empresas.</div>
        ) : (
          <>
            <div className="table-responsive">
              <PlatformsTable platforms={platforms} onEdit={handleEditPlatform} onDelete={handleDeletePlatform} />
            </div>

            <div className="d-flex justify-content-between mt-3">
              <Button variant="outline-light" onClick={handlePrevious} disabled={page === 0}>
                ← Anterior
              </Button>
              <span className="text-light align-self-center">
                Página {page + 1} de {platforms.totalPages}
              </span>
              <Button variant="outline-light" onClick={handleNext} disabled={platforms.last}>
                Siguiente →
              </Button>
            </div>
          </>
        )}

        {showModal && (
          <PlatformModal
            isEdit={isEditMode}
            initialName={currentPlatform?.name || ""}
            initialSensorId={currentPlatform?.sensorId || ""}
            onClose={() => setShowModal(false)}
            onSave={handleSavePlatform}
            onDelete={handleDeletePlatform}
          />
        )}
      </Container>
    </div>
  );
}
