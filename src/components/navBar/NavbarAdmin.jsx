"use client";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavbarAdmin() {
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/admin">Administra tu tienda</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/admin/products">Productos</Nav.Link>
            <Nav.Link href="/admin/new">Nuevo producto</Nav.Link>
            <Nav.Link href="/admin/pedidos">Pedidos</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarAdmin;
