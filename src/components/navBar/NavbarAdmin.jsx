"use client";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
/**
 * Componente de barra de navegación para el panel de administración.
 *
 * @component
 * @example
 * return (
 *   <NavbarAdmin />
 * )
 */
function NavbarAdmin() {
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand>Administra tu tienda</Navbar.Brand>
          <Nav className="me-auto ms-5">
            <Nav.Link href="/admin/products">Gestion de productos</Nav.Link>
            <Nav.Link href="/admin/new">Nuevo producto</Nav.Link>
            <Nav.Link href="/admin/pedidos">Gestión de pedidos</Nav.Link>
            <Nav.Link href="/">Volver a la tienda</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarAdmin;
