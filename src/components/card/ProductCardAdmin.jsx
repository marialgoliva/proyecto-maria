"use client";
import { FaClipboardList } from "react-icons/fa";
import Link from "next/link";
import DeleteButton from "../buttons/DeleteButton";
import EditButton from "../buttons/EditButton";
import styles from "./styles.module.css";
import { useSession } from "next-auth/react";
/**
 * Componente que representa una tarjeta de producto para la vista de administrador.
 *
 * @component
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} props.product - La información del producto.
 * @param {string} props.product.imagen - La URL de la imagen del producto.
 * @param {string} props.product.nombre - El nombre del producto.
 * @param {string} props.product.descripcion - La descripción del producto.
 * @param {number} props.product.precio - El precio del producto.
 * @param {string} props.product.categoria - La categoría del producto.
 * @param {string} props.product.color - El color del producto.
 * @returns {JSX.Element} La tarjeta de producto.
 */
function ProductCardAdmin({ product }) {
  const { data } = useSession();
  if (data?.user?.role === "admin") {
    return (
      <div className={styles.productCard}>
        <div className={styles.image}>
          <img src={product.imagen} alt="Imagen" className="w-50" />
        </div>
        <div className={styles.info}>
          <h4 className={styles.title}>{product.nombre}</h4>
          <p>{product.descripcion}</p>

          <p className={styles.price}>{product.precio} €</p>
        </div>

        <div className="border-top border-secondary pt-3 w-100">
          <p className="categoria">Categoria: {product.categoria}</p>
          <p className="color">Color: {product.color}</p>
          <EditButton id={product.idProducto} type="productos" />
          <DeleteButton id={product.idProducto} type="productos" />
          <Link className="text-reset m-2" href={"../"}>
            <FaClipboardList />
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-100 d-flex justify-content-center">
        <h1>🚫 Acceso no autorizado 🚫</h1>
      </div>
    );
  }
}

export default ProductCardAdmin;
