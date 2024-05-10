"use client";
import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Promise } from "es6-promise";
import loadProduct from "@/libs/productos/loadProduct";
/**
 * Componente que muestra el contenido de un pedido del cliente.
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
    <div className="d-flex flex-column m-3 gap-4 w-100">
      {productos.map((producto, index) => (
        <div
          key={index}
          className="d-flex flex-column flex-md-row gap-5 justify-content-between"
        >
          <h6 className={styles.title}>{producto.nombre}</h6>
          <div>
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
