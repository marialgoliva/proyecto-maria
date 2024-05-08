"use client";
import styles from "./styles.module.css";
import Table from "react-bootstrap/Table";
import DeleteButton from "../buttons/DeleteButton";
import ViewButton from "../buttons/ViewButton";
import EditButton from "../buttons/EditButton";

function ProductList({ products }) {
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
              <td>{product.color}</td>
              <td>{product.precio}</td>
              <td>
                {product.imagen && (
                  <img
                    src={product.imagen}
                    alt="Imagen del producto"
                    className="w-50"
                  />
                )}
              </td>
              <td>
                {
                  <>
                    <EditButton type="productos" id={product.idProducto} />
                    <DeleteButton idProducto={product.idProducto} />
                    <ViewButton type="productos" id={product.idProducto} />
                  </>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ProductList;
