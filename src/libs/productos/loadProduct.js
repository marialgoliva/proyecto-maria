import axios from "axios";
const REQUEST_URL = process.env.NEXT_PUBLIC_BASE_URL;
/**
 * Carga un producto desde el servidor utilizando su ID.
 *
 * @param {number} productId - El ID del producto a cargar.
 * @returns {Promise<Object>} - Una promesa que se resuelve con los datos del producto cargado.
 * @throws {Error} - Si ocurre un error al cargar el producto.
 */
async function loadProduct(productId) {
  const { data } = await axios.get(REQUEST_URL + "/api/products/" + productId);
  return data;
}

export default loadProduct;
