import axios from "axios";
const BASE_API_URL = process.env.BASE_URL;

async function getStock(productId) {
  const { data } = await axios.get(`${BASE_API_URL}/api/stock/${productId}`);
  return data;
}

export default getStock;
