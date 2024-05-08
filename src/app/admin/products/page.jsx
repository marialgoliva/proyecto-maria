import axios from "axios";
import "@/styles/global.css";
import ProductList from "@/components/lists/ProductList";
import BackButton from "@/components/buttons/BackButton";

async function loadProducts() {
  const { data } = await axios.get(process.env.REQUEST_URL);
  return data;
}
async function ProductsPage() {
  const products = await loadProducts();
  if (products.length === 0) return <h1>No Products</h1>;

  return (
    <div className="d-flex row">
      <div className="ms-5 mt-2">
        <BackButton />
      </div>
      <ProductList products={products} />
    </div>
  );
}

export default ProductsPage;
