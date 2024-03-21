"use client"
import styles from "./styles.module.css";
import Table from "react-bootstrap/Table";
import DeleteButton from "../buttons/DeleteButton";
import ViewButton from "../buttons/ViewButton";
import EditButton from "../buttons/EditButton";
import { useState } from 'react';

function ProductList({ products }) {

  const [productList, setProductList] = useState(products);

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`/api/products/${productId}`);
      const updatedProductList = productList.filter(product => product.idProducto !== productId);
      setProductList(updatedProductList);
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  return (
    <div className={styles.tableContainer}>
      <Table striped hover className="w-75">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoria</th>
            <th>Color</th>
            <th>Precio</th>
            <th>Imagen</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            // <ProductRow key={product.idProducto} product={product} />
              <tr key={product.idProducto} className="col">
                <td>{product.nombre}</td>
                <td className="w-50">{product.descripcion}</td>
                <td >{product.color}</td>
                <td>{product.precio}</td>
                <td>{product.idProducto}</td>
                <td>{
                  
                  <>
                  <EditButton idProducto={product.idProducto}/>
                  <DeleteButton idProducto={product.idProducto}/>
                  <ViewButton idProducto={product.idProducto}/>
                  </>
                  
                  }</td>
              </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ProductList;
