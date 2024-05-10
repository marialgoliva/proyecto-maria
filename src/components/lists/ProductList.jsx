"use client";
import styles from "./styles.module.css";
import Table from "react-bootstrap/Table";
import DeleteButton from "../buttons/DeleteButton";
import ViewButton from "../buttons/ViewButton";
import EditButton from "../buttons/EditButton";
import { isScreenSmall } from "@/libs/utils";

/**
 * Componente que muestra una lista de productos.
 *
 * @component
 * @param {Object[]} products - La lista de productos a mostrar.
 * @returns {JSX.Element} El componente de la lista de productos.
 */
function ProductList({ products }) {
  if (isScreenSmall()) {
    return (
      <div className={styles.tableContainer}>
        <Table striped hover className={styles.smallTable}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Color</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              // <ProductRow key={product.idProducto} product={product} />
              <tr key={product.idProducto} className="col">
                <td>{product.nombre}</td>
                <td>{product.color}</td>
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
                    <div className="d-flex">
                      <EditButton type="productos" id={product.idProducto} />
                      <DeleteButton type="productos" id={product.idProducto} />
                      <ViewButton type="productos" id={product.idProducto} />
                    </div>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  } else {
    return (
      <div className={styles.tableContainer}>
        <Table striped hover className="w-75">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Color</th>
              <th>Precio</th>
              <th>Imagen</th>
              <th>Acciones</th>
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
                    <div className="d-flex">
                      <EditButton type="productos" id={product.idProducto} />
                      <DeleteButton type="productos" id={product.idProducto} />
                      <ViewButton type="productos" id={product.idProducto} />
                    </div>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default ProductList;
