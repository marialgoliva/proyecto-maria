"use client";
import React, { useState, useEffect } from "react";

import { Promise } from "es6-promise";
import loadProduct from "@/libs/loadProduct";

function ContenidoPedido({ idsProductos }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    async function fetchProductos() {
      const productosData = await Promise.all(
        idsProductos.map(async (idProducto) => {
          return await loadProduct(idProducto.idProducto);
        }),
      );
      setProductos(productosData);
    }
    fetchProductos();
  }, [idsProductos]);

  return (
    <div className="d-flex m-3">
      {productos.map((producto, index) => (
        <div key={index}>
          <p>{producto.nombre}</p>
          <p>
            Color: <strong>{producto.color}</strong>
          </p>
          <p>Precio: {producto.precio} €</p>
          <img
            src={producto.imagen}
            alt="Imagen del producto"
            className="w-25"
          />
        </div>
      ))}
    </div>
  );
}

export default ContenidoPedido;
