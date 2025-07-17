import React, { useState } from "react";
import { Container, Button, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import "./CompaniesCrud.css";
import { useGetAllCompaniesPaginated, useCreateCompany, useUpdateCompany, useDeleteCompany } from "./../../../api/hooks/useCompany";
import { CustomNavbar } from "../../../components/CustomNavbar";
import { CompaniesTable } from "./CompaniesTable";
import Swal from "sweetalert2";
import CompanyModal from "./CompanyModal";
import { useAuthRedirect } from "../../../api/hooks/useAuthRedirect";

export function CompaniesCrud() {
  useAuthRedirect();
  const [page, setPage] = useState(0);
  const size = 5;
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCompany, setCurrentCompany] = useState(null);

  const { data: companies, isLoading, error, isFetching } = useGetAllCompaniesPaginated(page, size);
  const { mutate: createCompany } = useCreateCompany();
  const { mutate: updateCompany } = useUpdateCompany();
  const { mutate: deleteCompany } = useDeleteCompany();

  const handlePrevious = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (!companies || companies.last) return;
    setPage(page + 1);
  };

  const handleSaveCompany = (name) => {
    if (isEditMode && currentCompany) {
      updateCompany(
        { id: currentCompany.id, companyData: { name } },
        {
          onSuccess: () => {
            Swal.fire("Actualizado", "Empresa actualizada correctamente", "success");
            setShowModal(false);
            setCurrentCompany(null);
          },
          onError: () => {
            Swal.fire("Error", "No se pudo actualizar la empresa", "error");
          },
        }
      );
    } else {
      createCompany(
        { name },
        {
          onSuccess: () => {
            Swal.fire("Éxito", "Empresa creada correctamente", "success");
            setShowModal(false);
          },
          onError: () => {
            Swal.fire("Error", "No se pudo crear la empresa", "error");
          },
        }
      );
    }
  };

  const handleDeleteCompany = (companyId) => {
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
        deleteCompany(companyId, {
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
    setCurrentCompany(null);
    setShowModal(true);
  };

  const handleEditCompany = (company) => {
    setCurrentCompany(company);
    setIsEditMode(true);
    setShowModal(true);
  };

  return (
    <div className="g-background">
      <CustomNavbar />
      <Container className="mt-4 companies-container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h1 className="text-light">Empresas</h1>
            <p className="text-secondary">Lista de empresas registradas en el sistema.</p>
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
              <CompaniesTable companies={companies} onEdit={handleEditCompany} onDelete={handleDeleteCompany} />
            </div>

            <div className="d-flex justify-content-between mt-3">
              <Button variant="outline-light" onClick={handlePrevious} disabled={page === 0}>
                ← Anterior
              </Button>
              <span className="text-light align-self-center">
                Página {page + 1} de {companies.totalPages}
              </span>
              <Button variant="outline-light" onClick={handleNext} disabled={companies.last}>
                Siguiente →
              </Button>
            </div>
          </>
        )}

        {showModal && (
          <CompanyModal
            isEdit={isEditMode}
            initialName={currentCompany?.name || ""}
            onClose={() => setShowModal(false)}
            onSave={handleSaveCompany}
            onDelete={handleDeleteCompany}
          />
        )}
      </Container>
    </div>
  );
}
