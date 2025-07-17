import { Button, Table } from "react-bootstrap";

export function UserTable({ users, isLoading, onEdit, onDelete }) {
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Username</th>
          <th>Rol</th>
          <th>Activo</th>
          <th>Empresa</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.content.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.username}</td>
            <td>{user.role}</td>
            <td>{user.active ? "Sí" : "No"}</td>
            <td>{user.company?.name || "Sin empresa"}</td>
            <td>
              <Button variant="warning" size="sm" onClick={() => onEdit(user)}>
                Editar
              </Button>{" "}
              <Button variant="danger" size="sm" onClick={() => onDelete(user.id)}>
                Eliminar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
