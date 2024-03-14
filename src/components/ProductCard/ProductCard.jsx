
import Image from "next/image";
import styles from "./styles.module.css";


function ProductCard(product) {
  const {imagen, descripcion, nombre, precio } = product;

  return (
    <a className={styles.productCard} href="/">
      
      <div className={styles.image}>
        <Image src={imagen} width={200} height={'auto'} alt="Imagen del producto" />
      </div>
      <p className="title">{nombre}</p>
      <p className="description">{descripcion}</p>
      <p className="price">{precio} €</p>
      
    </a>
  );
};

export default ProductCard;