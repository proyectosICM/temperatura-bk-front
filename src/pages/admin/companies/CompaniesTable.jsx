import React from "react";
import { Table, Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { formatDateTime, getDateAndDayFromTimestamp } from "../../../utils/formatDate";

export function CompaniesTable({ companies, onEdit, onDelete }) {
  return (
    <div className="table-responsive">
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Creación</th>
            <th>Actualización</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {companies.content.map((company) => (
            <tr key={company.id}>
              <td>{company.name}</td>
              <td>{getDateAndDayFromTimestamp(company.createdAt)}</td>
              <td>{getDateAndDayFromTimestamp(company.updatedAt)}</td>
              <td>
                <Button variant="outline-warning" size="sm" onClick={() => onEdit(company)}>
                  <FaEdit /> Editar
                </Button>
                <Button variant="danger" size="sm" onClick={() => onDelete(company.id)}>
                  <FaTrash className="me-1" /> Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
