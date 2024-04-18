"use client";
import { MdRemoveShoppingCart } from "react-icons/md";
import Link from "next/link";
import styles from "./styles.module.css";
import { FaClipboardList } from "react-icons/fa";

function Cart({ product }) {
  return (
    <div className={styles.productCard}>
      <div className={styles.image}>
        <img src={product.imagen} alt="Imagen" className="w-50" />
      </div>
      <p className="title">{product.nombre}</p>
      <p className="color">Color: {product.color}</p>
      <p className="price">{product.precio} €</p>
      <div>
        <button className="border-0 bg-transparent fs-4">
          <MdRemoveShoppingCart />
        </button>
        <Link className="text-reset m-2" href={"../"}>
          <FaClipboardList />
        </Link>
      </div>
    </div>
  );
}

export default Cart;
