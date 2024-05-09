"use client";
import { FaClipboardList } from "react-icons/fa";
import Link from "next/link";
import DeleteButton from "../buttons/DeleteButton";
import EditButton from "../buttons/EditButton";
import styles from "./styles.module.css";
/**
 * Componente que representa una tarjeta de producto.
 *
 * @component
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} props.product - Los datos del producto.
 * @param {boolean} props.editable - Indica si el producto es editable.
 * @returns {JSX.Element} La tarjeta de producto.
 */
function ProductCard({ product, editable }) {
  return (
    <Link
      className="text-decoration-none text-body"
      href={`/${product.idProducto}`}
    >
      <div className={styles.productCard}>
        <div className={styles.image}>
          <img src={product.imagen} alt="Imagen" className="w-50" />
        </div>
        <div className={styles.info}>
          <h4 className={styles.title}>{product.nombre}</h4>
          <p>{product.descripcion}</p>

          <p className={styles.price}>{product.precio} €</p>
        </div>

        {editable && (
          <div className="border-top border-secondary pt-3 w-100">
            <p className="categoria">Categoria: {product.categoria}</p>
            <p className="color">Color: {product.color}</p>
            <EditButton idProducto={product.idProducto} />
            <DeleteButton idProducto={product.idProducto} />
            <Link className="text-reset m-2" href={"../"}>
              <FaClipboardList />
            </Link>
          </div>
        )}
      </div>
    </Link>
  );
}

export default ProductCard;
