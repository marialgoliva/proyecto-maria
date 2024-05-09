import axios from "axios";
/**
 * La URL base de la API.
 * @type {string}
 */
const BASE_API_URL = process.env.BASE_URL;

/**
 * Obtiene el stock de un producto.
 * @param {number} productId - El ID del producto.
 * @returns {Promise<any>} - Una promesa que se resuelve con los datos del stock.
 * @throws {Error} - Si ocurre algún error durante la obtención del stock.
 */
async function getStock(productId) {
  const { data } = await axios.get(`${BASE_API_URL}/api/stock/${productId}`);
  return data;
}

export default getStock;
