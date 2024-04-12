import ProductCard from "@/components/card/ProductCard";
import axios from "axios";
import "@/styles/global.css";
import Link from "next/link";

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
          <Link
            key={product.idProducto}
            href={`${product.idProducto}`}
            className="text-decoration-none col-3"
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </>
  );
}

export default ProductsPage;
