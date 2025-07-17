import { useState } from "react";
import { useCreateUser, useDeleteUser, useGetUsersByCompanyIdPaginated, useUpdateUser } from "./../../../api/hooks/useUser";
import Swal from "sweetalert2";
import { CustomNavbar } from "../../../components/CustomNavbar";
import { Button, Container, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { UserTable } from "./UsersTable";
import UserModal from "./UserModal";

export function UserCrud() {
  const companyId = localStorage.getItem("bk_companyId");
  const [page, setPage] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const { data: users, isLoading, error, isFetching } = useGetUsersByCompanyIdPaginated(companyId);
  const { mutate: createUser } = useCreateUser();
  const { mutate: updateUser } = useUpdateUser();
  const { mutate: deleteUser } = useDeleteUser();

  const handlePrevious = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (!users || users.last) return;
    setPage(page + 1);
  };

  const handleSaveUser = (userData) => {
    if (isEditMode && currentUser) {
      updateUser(
        { id: currentUser.id, ...userData },
        {
          onSuccess: () => {
            Swal.fire("Actualizado", "Usuario actualizado correctamente", "success");
            setShowModal(false);
            setCurrentUser(null);
          },
          onError: () => {
            Swal.fire("Error", "No se pudo actualizar el usuario", "error");
          },
        }
      );
    } else {
      createUser(userData, {
        onSuccess: () => {
          Swal.fire("Éxito", "Usuario creado correctamente", "success");
          setShowModal(false);
        },
        onError: () => {
          Swal.fire("Error", "No se pudo crear el usuario", "error");
        },
      });
    }
  };

  const handleDeleteUser = (userId) => {
    Swal.fire({
      title: "¿Eliminar usuario?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(userId, {
          onSuccess: () => {
            Swal.fire("Eliminado", "El usuario ha sido eliminado", "success");
          },
          onError: () => {
            Swal.fire("Error", "No se pudo eliminar el usuario.", "error");
          },
        });
      }
    });
  };

  const handleOpenCreateModal = () => {
    setIsEditMode(false);
    setCurrentUser(null);
    setShowModal(true);
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setIsEditMode(true);
    setShowModal(true);
  };
  return (
    <div>
      <CustomNavbar />
      <Container className="mt-4 companies-container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h1 className="text-light">Usuarios</h1>
            <p className="text-secondary">Lista de usuarios registrados en el sistema.</p>
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
          <div className="text-danger text-center">Error al cargar usuarios.</div>
        ) : (
          <>
            <div className="table-responsive">
              <UserTable users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />{" "}
            </div>

            <div className="d-flex justify-content-between mt-3">
              <Button variant="outline-light" onClick={handlePrevious} disabled={page === 0}>
                ← Anterior
              </Button>
              <span className="text-light align-self-center">
                Página {page + 1} de {users.totalPages}
              </span>
              <Button variant="outline-light" onClick={handleNext} disabled={users.last}>
                Siguiente →
              </Button>
            </div>
          </>
        )}

        {showModal && (
          <UserModal
            isEdit={isEditMode}
            initialData={currentUser || {}}
            onClose={() => setShowModal(false)}
            onSave={handleSaveUser}
            onDelete={handleDeleteUser}
          />
        )}
      </Container>
    </div>
  );
}
