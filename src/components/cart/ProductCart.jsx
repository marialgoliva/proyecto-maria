"use client";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import styles from "./styles.module.css";
import { useCart } from "./CartContext";

function ProductCart({ product }) {
  const { removeFromCart, addToCart, addQuantity, reduceQuantity } = useCart();

  return (
    <div className={styles.productCart}>
      <div className={styles.image}>
        <img src={product.imagen} alt="Imagen" className="w-50" />
      </div>
      <div className="d-flex column gap-5 align-items-center w-100">
        <div>
          <p className="title">{product.nombre + " " + product.color}</p>
        </div>

        <div>
          <p className="price">{product.precio}€</p>
        </div>
        {product.talla && (
          <div>
            <p className="talla">{"Talla " + product.talla}</p>
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
