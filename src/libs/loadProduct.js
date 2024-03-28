import axios from "axios";
async function loadProduct(productId) {
  const { data } = await axios.get(
    `http://localhost:3000/api/products/${productId}`,
  );
  return data;
}

export default loadProduct;
