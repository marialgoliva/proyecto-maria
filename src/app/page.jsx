import { ProductCard } from "@/components/ProductCard";
import axios from "axios";



async function loadProduct() {
  const { data } = await axios.get(process.env.REQUEST_URL);
  return data;
}

async function ProductsPage() {
  const products = await loadProduct();

  if (products.length === 0) return <h1>No Products</h1>;

  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.idProducto} product={product} />
        
      ))}
    </>
  );
}

export default ProductsPage;