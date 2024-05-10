"use client";

import Link from "next/link";

/**
 * @name Cancel
 * @description Componente de cancelación de pedido
 * return <Cancel />
 * @returns {React.Component} <Cancel />
 */
function Cancel() {
  return (
    <div className="mtop">
      <div className="text-center m-5 py-10 h-100 d-flex row justify-content-center align-items-center">
        <span className="fs-1">😅</span>
        <h1 className="display-6">
          El pedido no se ha realizado correctamente.
        </h1>
        <Link
          href="/cart"
          className="d-flex align-items-center justify-content-center flex-column text-decoration-none m-5"
        >
          <img className="w-25" src="/cart.jpg" alt="Tienda abierta" />
          <h5 className="ms-3">Vuelve a intentarlo</h5>
        </Link>
      </div>
    </div>
  );
}

export default Cancel;
