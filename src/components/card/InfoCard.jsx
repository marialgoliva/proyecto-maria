"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import styles from "./styles.module.css";
/**
 * Componente de tarjeta de información.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.product - Objeto que representa el producto.
 * @param {Array} props.stock - Array que contiene el stock del producto.
 * @returns {JSX.Element} Elemento JSX que representa la tarjeta de información.
 */
function InfoCard({ product, stock }) {
  const { descripcion, nombre, precio, color } = product;
  const [tallaElegida, setTallaElegida] = useState();
  const [productoElegido, setProductoElegido] = useState(product);
  const { addToCart } = useCart();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const updateProduct = {
      ...product,
      cantidad: 1,
    };
    setProductoElegido(updateProduct);
  }, [product]);

  const handleClickTalla = (talla) => {
    const updateProduct = {
      ...productoElegido,
      talla: talla,
    };
    setProductoElegido(updateProduct);
    setTallaElegida(talla);
    setShowAlert(false);
  };

  const onChange = (e) => {
    const updateProduct = {
      ...productoElegido,
      cantidad: parseInt(e.target.value),
    };
    setProductoElegido(updateProduct);
  };

  const handleAddToCart = (productoElegido) => {
    if (stock[0].talla === null) {
      const updateProduct = {
        ...productoElegido,
        talla: null,
      };
      setProductoElegido(updateProduct);
      addToCart(productoElegido);
    } else {
      if (!productoElegido.talla) {
        console.log("Elige una talla");
        setShowAlert(true);
      } else {
        setShowAlert(false);
        addToCart(productoElegido);
      }
    }
  };

  return (
    <div className={styles.infoCard}>
      <h4 className={styles.title}>
        {nombre}{" "}
        <span className="text-secondary fs-5 fw-normal text-capitalize">
          {color}
        </span>
      </h4>
      <div className="d-flex row justify-content-end">
        <div>
          <h5 className="price text-end">{precio} €</h5>
          <p className="description text-end">{descripcion}</p>
        </div>
        <div className="d-flex flex-column align-items-end gap-3">
          <div className="d-flex justify-content-end gap-2 flex-md-column flex-lg-row flex-column">
            {stock.length > 0 &&
              stock.map((item) => {
                return (
                  <div key={item.talla} className="d-flex flex-row">
                    {item.talla !== "null" ? (
                      <>
                        <button
                          value={item.talla}
                          type="button"
                          className={`btn btn-outline-dark border-0 shadow-sm m-2 px-5 py-1 ${item.talla === tallaElegida ? "active" : ""}`}
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
            Si no hay stock disponible, se confeccionará el producto para ti por
            lo que los plazos de entrega pueden aumentar.
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
            <h6>Cantidad</h6>
            <input
              type="number"
              className="form-control"
              onChange={onChange}
              value={productoElegido.cantidad}
            />
          </div>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-outline-dark border-0 shadow-sm mt-5 w-100"
        style={{ height: "40px" }}
        onClick={() => handleAddToCart(productoElegido)}
      >
        Añadir al carrito
      </button>
      {showAlert && (
        <div>
          <div className="alert alert-warning mt-2 " role="alert">
            Elige una talla.
          </div>
        </div>
      )}
    </div>
  );
}

export default InfoCard;
