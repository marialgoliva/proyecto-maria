import axios from "axios";
import "@/styles/global.css";
import ProductList from "@/components/lists/ProductList";

async function loadProducts() {
  const { data } = await axios.get(process.env.REQUEST_URL);
  return data;
}
async function ProductsPage() {
  const products = await loadProducts();
  if (products.length === 0) return <h1>No Products</h1>;

  return (
    <div>
      <ProductList products={products} />
    </div>
  );
}

export default ProductsPage;
