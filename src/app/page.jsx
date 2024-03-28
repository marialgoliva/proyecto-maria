import ProductCard from "@/components/productcard/ProductCard";
import axios from "axios";
import "@/styles/global.css";

async function loadProducts() {
  const { data } = await axios.get(process.env.REQUEST_URL);
  return data;
}
async function ProductsPage() {
  const products = await loadProducts();

  if (products.length === 0) return <h1>No Products</h1>;

  return (
    <>
      <div className="flex row">
        {products.map((product) => (
          <ProductCard key={product.idProducto} product={product} />
        ))}
      </div>
    </>
  );
}

export default ProductsPage;
