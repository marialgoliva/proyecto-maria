import Link from "next/link";

function ImageCard({product}) {
  const { descripcion, nombre, precio, categoria, color, idProducto } = product;

  return (
    <div className="rounded p-4 bg-light d-flex row gap-2">
      <img src={product.imagen} alt="Imagen" />
      <p className="p-3">{descripcion}</p>
    </div>
  );
}

export default ImageCard;