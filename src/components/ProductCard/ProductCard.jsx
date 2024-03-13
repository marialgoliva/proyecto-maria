import "./ProductCard.css";

function ProductCard(product) {
  const {imagen, descripcion, nombre, precio } = product;

  return (
    <a className="product-card" href="/">
      <img className="product-card__image" src={imagen}/>
      <p className="product-card__brand">{nombre}</p>
      <p className="product-card__description">{descripcion}</p>
      <p className="product-card__price">{precio} €</p>
      
    </a>
  );
};

export default ProductCard;