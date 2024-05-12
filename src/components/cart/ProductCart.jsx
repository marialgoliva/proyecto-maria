"use client";

import { IoMdAdd, IoMdRemove } from "react-icons/io";
import styles from "./styles.module.css";
import { useCart } from "../../context/CartContext";
import Link from "next/link";
/**
 * Componente que representa un producto en el carrito.
 *
 * @component
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} props.product - La información del producto.
 * @returns {JSX.Element} El elemento del producto en el carrito.
 */
function ProductCart({ product }) {
  const { addQuantity, reduceQuantity } = useCart();

  return (
    <div className={styles.productCart}>
      <div className="d-flex column align-items-center w-100 gap-3">
        <div className={styles.image}>
          <Link href={`/${product.idProducto}`}>
            <img src={product.imagen} alt="Imagen" />
          </Link>
        </div>
        <div className={styles.info}>
          <p className={styles.title}>
            {product.nombre + "(" + product.color + ")"}
          </p>
          <p className={styles.price}>{product.precio}€</p>
          {product.talla && (
            <p className={styles.title}>{"Talla " + product.talla}</p>
          )}
        </div>

        <div className={styles.panel}>
          <button
            className="border-0 bg-transparent fs-4"
            onClick={() => reduceQuantity(product)}
          >
            <IoMdRemove />
          </button>
          {product.cantidad}
          <button
            className="border-0 bg-transparent fs-4"
            onClick={() => addQuantity(product)}
          >
            <IoMdAdd />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCart;
