"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import SimpleCard from "../card/Card";
/**
 * Componente que representa el panel de administración para el usuario administrador.
 *
 * @component
 * @returns {JSX.Element} El panel de administración.
 */
function AdminPanel() {
  const router = useRouter();
  const signOutHandler = () => {
    signOut();
    router.push("../");
  };
  const cards = [
    {
      title: "Productos",
      link: "/admin/products",
      text: "Administra los productos de tu tienda.",
    },
    {
      title: "Nuevo producto",
      link: "/admin/new",
      text: "Crea un nuevo producto.",
    },
    {
      title: "Pedidos",
      link: "/admin/pedidos",
      text: "Administra los pedidos.",
    },
  ];

  return (
    <>
      <div className="d-flex column gap-4">
        <SimpleCard cards={cards} />
      </div>

      <button
        className="bg-white text-black border rounded px-2 py-1 fs-5 "
        onClick={signOutHandler}
      >
        Cerrar sesión
      </button>
    </>
  );
}

export default AdminPanel;
