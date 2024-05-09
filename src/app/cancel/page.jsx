"use client";
/**
 * @name Cancel
 * @description Componente de cancelación de pedido
 * return <Cancel />
 * @returns {React.Component} <Cancel />
 */
function Cancel() {
  return (
    <div className=" text-center m-5 py-10 h-100 d-flex row justify-content-center align-items-center">
      <span className="fs-1">😅</span>
      <h1 className="display-6">El pedido no se ha realizado correctamente.</h1>
      <a
        href="/cart"
        className="text-decoration-none d-block mt-4 text-blue display-6"
      >
        Vuelve a intentarlo
      </a>
    </div>
  );
}

export default Cancel;
