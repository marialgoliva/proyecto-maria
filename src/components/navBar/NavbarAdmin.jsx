"use client";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "../Navbar/styles.module.css";
import Link from "next/link";
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
  const [showNav, setShowNav] = useState(false);
  const toggleNav = () => {
    setShowNav(!showNav); // Cambia el estado para mostrar u ocultar el menú
  };
  const hideNav = () => {
    setShowNav(false);
  };
  return (
    <div className="mtop">
      <button
        className={`navbar-toggler ${styles.navToggleAdmin}`}
        type="button"
        onClick={toggleNav}
      >
        Administra tu tienda
      </button>
      <div className={styles.nav}>
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
      </div>
      <div className={styles.navContainerAdmin}>
        <nav
          bg="light"
          data-bs-theme="light"
          className={`collapse navbar-collapse ${showNav ? "show" : ""} ${styles.navHidden}`}
        >
          <div className="d-flex flex-column gap-4 me-5">
            <Link
              className="text-decoration-none text-reset"
              href="/admin/products"
              onClick={hideNav}
            >
              Productos{" "}
            </Link>
            <Link
              className="text-decoration-none text-reset"
              href="/admin/new"
              onClick={hideNav}
            >
              Nuevo producto
            </Link>
            <Link
              className="text-decoration-none text-reset"
              href="/admin/pedidos"
              onClick={hideNav}
            >
              Pedidos
            </Link>
            <Link
              className="text-decoration-none text-reset"
              href="/"
              onClick={hideNav}
            >
              Volver a la tienda
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default NavbarAdmin;
