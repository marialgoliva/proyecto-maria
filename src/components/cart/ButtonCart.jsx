"use client";
import { MdShoppingCart } from "react-icons/md";
import Link from "next/link";
import styles from "../cart/styles.module.css";
import { useCart } from "./CartContext";

function ButtonCart() {
  const { cart, productsInCart } = useCart();
  return (
    <div>
      <Link href="/cart" className={styles.linkNav}>
        <MdShoppingCart /> {productsInCart}
      </Link>
    </div>
  );
}

export default ButtonCart;
