"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "../cart/CartContext";
import styles from "./styles.module.css";

function InfoCard({ product, stock }) {
  const { descripcion, nombre, precio, color } = product;
  const [tallaElegida, setTallaElegida] = useState();
  const [productoElegido, setProductoElegido] = useState(product);
  const { addToCart } = useCart();

  useEffect(() => {
    setProductoElegido(product);
  }, [product]);

  const handleClickTalla = (talla) => {
    const updateProduct = {
      ...productoElegido,
      talla: talla,
    };
    setProductoElegido(updateProduct);
    setTallaElegida(talla);
  };

  const onChange = (e) => {
    const updateProduct = {
      ...productoElegido,
      cantidad: parseInt(e.target.value),
    };
    setProductoElegido(updateProduct);
  };

  return (
    <div className="rounded p-4 bg-light d-flex row justify-content-between">
      <h4 className="fw-normal">
        {nombre}{" "}
        <span className="text-secondary fs-4 fw-normal text-capitalize">
          {color}
        </span>
      </h4>
      <div className="d-flex row justify-content-end">
        <div>
          <h5 className="price text-end">{precio} €</h5>
          <p className="description text-end">{descripcion}</p>
        </div>
        <div className="d-flex row gap-3">
          <div className="d-flex justify-content-end gap-2">
            {/* {tallas.length > 1 &&
              tallas.map((talla) => {
                return (
                  <button
                    key={talla}
                    value={talla}
                    type="button"
                    className={`btn btn-outline-secondary ${talla === tallaElegida ? "active" : ""}`}
                    onClick={() => handleClickTalla(talla)}
                  >
                    {talla}
                  </button>
                );
              })} */}
            {stock.length > 0 &&
              stock.map((item) => {
                console.log(item.talla);
                return (
                  <div key={item.talla}>
                    {item.talla !== "null" ? (
                      <>
                        <button
                          value={item.talla}
                          type="button"
                          className={`btn btn-outline-secondary ${item.talla === tallaElegida ? "active" : ""}`}
                          onClick={() => handleClickTalla(item.talla)}
                        >
                          {item.talla}
                        </button>
                        <div className={styles.fontTiny}>({item.stock})</div>
                      </>
                    ) : (
                      <div className={styles.fontTiny}>
                        Stock ({item.stock})
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
          <p className={styles.fontTiny}>
            Si aparece stock disponible, se confeccionará el producto para ti
            por lo que los plazos de entrega pueden aumentar.
          </p>
          {stock.length > 1 && (
            <Link
              href=""
              className="text-decoration-none text-secondary text-end"
            >
              <p>¿Qué talla elijo?</p>
            </Link>
          )}
        </div>
        <div className="d-flex row justify-content-end"></div>
        <div className="d-flex row justify-content-end my-3">
          <div className="w-25">
            <h6 className="text-secondary">Cantidad</h6>
            <input type="number" className="form-control" onChange={onChange} />
          </div>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-secondary mt-5 w-75"
        style={{ height: "40px" }}
        onClick={() => addToCart(productoElegido)}
      >
        Añadir al carrito
      </button>
    </div>
  );
}

export default InfoCard;
