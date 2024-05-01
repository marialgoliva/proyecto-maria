"use client";
import { FaClipboardList } from "react-icons/fa";
// import { MdShoppingCart } from "react-icons/md";
import Link from "next/link";
import DeleteButton from "../buttons/DeleteButton";
import EditButton from "../buttons/EditButton";
import styles from "./styles.module.css";
// import { useCart } from "../cart/CartContext";

function ProductCard({ product, editable }) {
  // const { addToCart } = useCart();

  // const handleAddToCart = () => {
  //   if (product.)
  //   const updateProduct = {
  //     ...product,
  //     cantidad: 1,
  //   };
  //   addToCart(updateProduct);
  // };

  return (
    <div className={styles.productCard}>
      <Link
        className="text-decoration-none text-body"
        href={`/${product.idProducto}`}
      >
        <div className={styles.image}>
          <img src={product.imagen} alt="Imagen" className="w-50" />
        </div>
        <p className="title">{product.nombre}</p>
        <p className="description">{product.descripcion}</p>
      </Link>
      <p className="price">{product.precio} €</p>
      {/* <div>
        <button className={styles.button} onClick={handleAddToCart}>
          <MdShoppingCart className={styles.shoppingcart} />
        </button>
      </div> */}

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
