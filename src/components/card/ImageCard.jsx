import styles from "./styles.module.css";
/**
 * Componente para mostrar una tarjeta de imagen.
 *
 * @component
 * @param {Object} product - Objeto que contiene la información del producto.
 * @param {string} product.imagen - URL de la imagen del producto.
 * @returns {JSX.Element} Componente de tarjeta de imagen.
 */
function ImageCard({ product }) {
  return (
    <div className={styles.imageCard}>
      <img src={product.imagen} alt="Imagen" />
    </div>
  );
}

export default ImageCard;
