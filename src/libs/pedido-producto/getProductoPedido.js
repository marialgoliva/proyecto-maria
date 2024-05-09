import axios from "axios";
/**
 * Obtiene los productos de un pedido.
 * @param {number} id - El ID del pedido.
 * @returns {Promise<Array>} - Una promesa que se resuelve con un array de productos del pedido.
 *                            Si no se encuentra ningún producto, la promesa se resuelve con un array vacío.
 *                            Si ocurre un error, la promesa se rechaza con un mensaje de error.
 */

async function getProductosPedido(id) {
  try {
    const { data } = await axios.get(
      `${process.env.BASE_URL}/api/producto-pedido/${id}`,
    );
    if (data.length > 0) return data;
  } catch (e) {
    return "No se encuentra el producto con id: " + id;
  }
}

export default getProductosPedido;
