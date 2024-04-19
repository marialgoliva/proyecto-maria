"use client";
import { FaClipboardList } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import Link from "next/link";
import DeleteButton from "../buttons/DeleteButton";
import EditButton from "../buttons/EditButton";
import styles from "./styles.module.css";
import { useCart } from "../cart/CartContext";

function ProductCard({ product, editable }) {
  const { addToCart } = useCart();
  const handleAddToCart = () => {
    console.log("Intentando añadir al carrito:", product.nombre);
    addToCart(product);
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.image}>
        <img src={product.imagen} alt="Imagen" className="w-50" />
      </div>
      <p className="title">{product.nombre}</p>
      <p className="description">{product.descripcion}</p>
      <p className="price">{product.precio} €</p>
      <div>
        <button
          className="border-0 bg-transparent fs-4"
          onClick={handleAddToCart}
        >
          <MdShoppingCart />
        </button>
        <button className="border-0 bg-transparent fs-4">
          <TbListDetails />
        </button>
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
  );
}

export default ProductCard;
