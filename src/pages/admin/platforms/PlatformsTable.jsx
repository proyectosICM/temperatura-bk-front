import React from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function PlatformsTable({ platforms, isLoading, onEdit, onDelete }) {
  console.log(platforms)
  return (
      <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Empresa</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {platforms.content.map((platform) => (
          <tr key={platform.id}>
            <td>{platform.id}</td>
            <td>{platform.name}</td>
            <td>{platform.company?.name}</td>
            <td>
              <Button variant="outline-warning" size="sm" onClick={() => onEdit(platform)}>
                <FaEdit /> Editar
              </Button>{" "}
              <Button variant="danger" size="sm" onClick={() => onDelete(platform.id)}>
                <FaTrash /> Eliminar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
