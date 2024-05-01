"use client";
import { MdShoppingCart } from "react-icons/md";
import Link from "next/link";
import styles from "../cart/styles.module.css";
import { useCart } from "./CartContext";

function ButtonCart() {
  const { contador } = useCart();
  return (
    <div>
      <Link href="/cart" className={styles.linkNav}>
        <MdShoppingCart /> ({contador})
      </Link>
    </div>
  );
}

export default ButtonCart;
