import ProductCard from "@/components/productcard/ProductCard";
import axios from "axios";
import "@/styles/global.css";
import ProductList from "@/components/productList/ProductList";

async function loadProduct() {
  const { data } = await axios.get(process.env.REQUEST_URL);
  return data;
}
async function ProductsPage() {
  const products = await loadProduct();

  if (products.length === 0) return <h1>No Products</h1>;

  return (
    <>
    <div className="flex row">
      {products.map((product) => (
          <ProductList key={product.idProducto} nombre={product.nombre} descripcion={product.descripcion} precio={product.precio} imagen={require("@/../public/imagendeprueba.jpeg")} />
          
        ))}
    </div>
      
    </>
  );
}

export default ProductsPage;