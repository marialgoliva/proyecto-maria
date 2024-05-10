"use client";
import { MdShoppingCart } from "react-icons/md";
import Link from "next/link";
import styles from "../cart/styles.module.css";
import { useCart } from "../../context/CartContext";
/**
 * Componente de botón de carrito.
 *
 * @component
 * @example
 * // Uso del componente:
 * <ButtonCart />
 */
function ButtonCart({ hideNav }) {
  const { contador } = useCart();
  return (
    <div>
      <Link href="/cart" className={styles.buttonCart} onClick={hideNav}>
        <MdShoppingCart /> ({contador})
      </Link>
    </div>
  );
}

export default ButtonCart;
