import Image from "next/image";

const ProductRow = (product) => {
    const {imagen, descripcion, nombre, precio } = product;
    return (
      <div className="row product">
        <div className="col-md-2">
        <Image src={imagen} width={200} height={'auto'} alt="Imagen del producto" />
        </div>
        <div className="col-md-8 product-detail">
          <h4>{nombre}</h4>
          <p>{descripcion}</p>
        </div>
        <div className="col-md-2 product-price">
          {precio}
        </div>
      </div>
    );
  }
  
  export default ProductRow;