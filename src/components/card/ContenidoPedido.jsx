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
    <div className="d-flex m-3">
      {productos.map((producto, index) => (
        <div key={index}>
          <p>{producto.nombre}</p>
          <p>
            Color: <strong>{producto.color}</strong>
          </p>
          <p>
            Talla: <strong>{producto.talla}</strong>
          </p>
          <p>
            Cantidad: <strong>{producto.cantidad}</strong>
          </p>
          <p>Precio unitario: {producto.precio} €</p>
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
