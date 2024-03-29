

import ProductCard from "@/components/productcard/ProductCard";
import axios from "axios";

export async function loadProduct(productId) {
    const {data} = await axios.get(
        `http://localhost:3000/api/products/${productId}`
        );
    return data;
}

async function ProductPage({params}) {
    const product = await loadProduct(params.id);
    console.log(product)
    return (
    <div className="d-flex justify-content-center">
      <ProductCard product={product} editable/>
    </div>
  )
}

export default ProductPage;
