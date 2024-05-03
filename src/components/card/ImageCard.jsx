import styles from "./styles.module.css";

function ImageCard({ product }) {
  return (
    <div className={styles.imageCard}>
      <img src={product.imagen} alt="Imagen" />
    </div>
  );
}

export default ImageCard;
