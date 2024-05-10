"use client";
import React, { useState, useEffect } from "react";

import { Promise } from "es6-promise";
import loadProduct from "@/libs/productos/loadProduct";
/**
 * Componente que muestra el contenido de un pedido.
 *
 * @component
 * @param {Object[]} dataProductos - Los datos de los productos del pedido.
 * @returns {JSX.Element} El contenido del pedido.
 */
function ContenidoPedido({ dataProductos }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    async function fetchProductos() {
      const productos = await Promise.all(
        dataProductos.map(async (data) => {
          const producto = await loadProduct(data.idProducto);

          producto.cantidad = data.cantidad;
          producto.talla = data.talla;

          return producto;
        }),
      );
      setProductos(productos);
    }
    fetchProductos();
  }, [dataProductos]);

  return (
    <div className="d-flex m-3 flex-column flex-lg-row gap-4 text-center">
      {productos.map((producto, index) => (
        <div
          key={index}
          className="d-flex flex-row flex-lg-column justify-content-between align-items-center"
        >
          <div>
            <h6>{producto.nombre}</h6>
            <p>Color: {producto.color}</p>
            <p>Talla: {producto.talla}</p>
            <p>Cantidad: {producto.cantidad}</p>
            <p>Precio unitario: {producto.precio} €</p>
          </div>
          <div className="w-25">
            <img
              src={producto.imagen}
              alt="Imagen del producto"
              className="w-100"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ContenidoPedido;
