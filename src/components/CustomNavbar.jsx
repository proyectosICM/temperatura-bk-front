import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { FaClipboardList, FaHome, FaSignOutAlt, FaTachometerAlt, FaUserShield } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function CustomNavbar() {
  const navigation = useNavigate();

  const handleLogout = () => {
    //clearLocalStorage();
    navigation("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand style={{ marginLeft: "25px", cursor: "pointer" }} onClick={() => navigation("/")}>
        <FaHome /> Inicio
      </Navbar.Brand>

      {/* Toggle button for mobile view */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      {/* Collapsible nav items */}
      <Navbar.Collapse id="basic-navbar-nav">
        {/* Centering the navigation links */}
        <Nav className="mx-auto">
          <Nav.Link onClick={() => navigation("/")} style={{ borderBottom: "none", textDecoration: "none" }}>
            <FaTachometerAlt style={{ marginRight: "5px" }} /> Panel Principal
          </Nav.Link>
          <Nav.Link onClick={() => navigation("/obsevaciones")} style={{ borderBottom: "none", textDecoration: "none" }}>
            <FaClipboardList style={{ marginRight: "5px" }} /> Observaciones
          </Nav.Link>
          {/* <Nav.Link onClick={() => navigation("/records-panel")}>Panel Registros</Nav.Link> */}
          <Nav.Link onClick={() => navigation("/admin")} style={{ borderBottom: "none", textDecoration: "none" }}>
            <FaUserShield style={{ marginRight: "5px" }} /> Administracion
          </Nav.Link>
        </Nav>

        {/* Right-aligned logout button */}
        <Button style={{ marginRight: "25px" }} onClick={handleLogout} variant="outline-light">
          <FaSignOutAlt /> Cerrar Sesión
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
}
