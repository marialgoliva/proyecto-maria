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
      <div className={styles.image}>
        <Link href={`/${product.idProducto}`}>
          <img src={product.imagen} alt="Imagen" className="w-50" />
        </Link>
      </div>
      <div className="d-flex column gap-5 align-items-center w-100">
        <div>
          <p className={styles.title}>
            {product.nombre + " - " + product.color}
          </p>
        </div>
        <div>
          <p className={styles.price}>{product.precio}€</p>
        </div>
        {product.talla && (
          <div>
            <p className={styles.title}>{"Talla " + product.talla}</p>
          </div>
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
  );
}

export default ProductCart;
