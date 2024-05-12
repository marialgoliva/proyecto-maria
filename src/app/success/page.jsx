"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useEffect } from "react";
/**
 * Página de éxito después de una compra.
 * @returns {JSX.Element} La página de éxito.
 */
function Success() {
  // Usa el contexto del carrito para obtener el carrito y la función para eliminar el carrito
  const { deleteCart } = useCart();

  // UseEffect para eliminar el carrito cuando el componente se monta
  useEffect(() => {
    deleteCart();
  }, []);

  // Renderiza la página de éxito
  return (
    <div className="mtop">
      <div className=" text-center m-5 py-10 h-100 d-flex row justify-content-center align-items-center ">
        <span className="fs-1">🎉</span>
        <h1 className="display-6">Gracias por tu compra</h1>

        <Link
          href="/"
          className="d-flex align-items-center justify-content-center flex-column text-decoration-none m-5"
        >
          <img className="w-25" src="/storeOpen.jpg" alt="Tienda abierta" />
          <h5 className="ms-3">Volver a la tienda</h5>
        </Link>
      </div>
    </div>
  );
}

export default Success;
