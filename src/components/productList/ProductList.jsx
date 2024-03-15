import styles from "./styles.module.css";
import ProductRow from "./ProductRow";
import Table from "react-bootstrap/Table";

function ProductList({ products }) {
  return (
    <div className={styles.tableContainer}>
      <Table striped bordered hover>
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
            <ProductRow key={product.idProducto} product={product} />
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ProductList;
