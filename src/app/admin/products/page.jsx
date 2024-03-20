import axios from "axios";
import "@/styles/global.css";
import ProductList from "@/components/productList/ProductList";
import { useEffect } from "react";


async function loadProduct() {
  const { data } = await axios.get(process.env.REQUEST_URL);
  return data;
}
async function ProductsPage() {
  
  const products = await loadProduct();
  if (products.length === 0) return <h1>No Products</h1>;

  return (
    <>
      <ProductList products={products} />
    </>
  );
}

export default ProductsPage;
