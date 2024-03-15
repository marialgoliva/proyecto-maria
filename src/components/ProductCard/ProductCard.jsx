"use client"
import Buttons from "../buttons/Buttons";
import styles from "./styles.module.css";


function ProductCard ({product, editable}) {
  console.log(product)
  const {descripcion, nombre, precio, categoria, color, idProducto } = product;
  

  return (
    <a className={styles.productCard} href="/">
      
      {/* <div className={styles.image}>
        <Image src={imagen} width={200} height={'auto'} alt="Imagen del producto" />
      </div> */}
      <p className="title">{nombre}</p>
      <p className="description">{descripcion}</p>
      <p className="price">{precio} €</p>
      {editable && (
      <div className="border-top border-secondary pt-3 w-100">
        <p className="categoria">Categoria: {categoria}</p>
        <p className="color">Color: {color}</p>
        {console.log(idProducto)}
        <Buttons idProducto={idProducto}/>
      </div>
      
      )}
      
    </a>
  );
};

export default ProductCard;