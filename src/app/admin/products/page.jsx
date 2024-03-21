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
    <div> 
      <ProductList products={products} />
    </div>
  );
}

export default ProductsPage;
