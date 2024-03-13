import ProductCard from "@/components/ProductCard/ProductCard";
import axios from "axios";
import "@/styles/global.css";



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
        <ProductCard key={product.idProducto} nombre={product.nombre} descripcion={product.descripcion} precio={product.precio} imagen={require("@/../public/logo_reducido.svg")} />
        
      ))}
    </>
  );
}

export default ProductsPage;