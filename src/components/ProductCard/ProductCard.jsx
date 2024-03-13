import "./ProductCard.css";
import Image from "next/image";

function ProductCard(product) {
  const {imagen, descripcion, nombre, precio } = product;

  return (
    <a className="product-card" href="/">
      <Image src={imagen} width={200} height={200} alt="Imagen del producto" />
      <p className="product-card__brand">{nombre}</p>
      <p className="product-card__description">{descripcion}</p>
      <p className="product-card__price">{precio} €</p>
      
    </a>
  );
};

export default ProductCard;