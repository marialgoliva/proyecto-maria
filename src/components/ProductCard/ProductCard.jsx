import { FaClipboardList } from "react-icons/fa";
import Link from "next/link";
import DeleteButton from "../buttons/DeleteButton";
import EditButton from "../buttons/EditButton";
import styles from "./styles.module.css";


function ProductCard ({product, editable}) {
  const {descripcion, nombre, precio, categoria, color, idProducto } = product;
  

  return (
    <div className={styles.productCard}>
      
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
          <EditButton idProducto={idProducto}/>
          <DeleteButton idProducto={idProducto}/>
        <Link className="text-reset m-2" href={'../'}><FaClipboardList /></Link>
      </div>
      
      )}
      
    </div>
  );
};

export default ProductCard;