"use client";
import { useCart } from "@/context/CartContext";
import { useEffect } from "react";
/**
 * Página de éxito después de una compra.
 * @returns {JSX.Element} La página de éxito.
 */
function Success() {
  // Usa el contexto del carrito para obtener el carrito y la función para eliminar el carrito
  const { cart, deleteCart } = useCart();

  // UseEffect para eliminar el carrito cuando el componente se monta
  useEffect(() => {
    deleteCart();
  }, []);

  // Renderiza la página de éxito
  return (
    <div className=" text-center m-5 py-10 h-100 d-flex row justify-content-center align-items-center">
      <span className="fs-1">🎉</span>
      <h1 className="display-6">Gracias por tu compra</h1>
      <a
        href="/"
        className="text-decoration-none d-block mt-4 text-blue display-6"
      >
        Volver a la tienda
      </a>
    </div>
  );
}

export default Success;
