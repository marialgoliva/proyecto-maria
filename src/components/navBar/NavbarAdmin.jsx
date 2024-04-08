"use client";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";



function NavbarAdmin() {

  const router = useRouter();
  const signOutHandler = ()=>{
    signOut(); 
    router.push('../');
  }
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
        <button className="bg-white text-black border rounded px-3 me-5" onClick={signOutHandler}>Cerrar sesión</button>
          {/* <Navbar.Brand href="/admin">Administra tu tienda</Navbar.Brand> */}
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
