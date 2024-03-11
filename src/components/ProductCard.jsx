

export function ProductCard({ product }) {
  return (
    <div className="card">
      <h5 className="nombre">
        {product.nombre}
      </h5>
      <p className="descripcion">
        {product.descripcion}
      </p>
      <p className="precio">
        {product.precio} €
      </p>
    </div>
  );
}