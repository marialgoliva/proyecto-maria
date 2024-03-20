import ProductCard from "@/components/productcard/ProductCard";
import axios from "axios";
import "@/styles/global.css";

async function loadProduct() {
  const { data } = await axios.get(process.env.REQUEST_URL);
  console.log(data);
  return data;
}
async function ProductsPage() {
  const products = await loadProduct();

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