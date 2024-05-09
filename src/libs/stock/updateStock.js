import axios from "axios";

/**
 * Actualiza el stock de un producto en el servidor.
 * @param {string} idProducto - El ID del producto a actualizar.
 * @param {string} talla - La talla del producto.
 * @param {number} stock - La cantidad de stock a actualizar.
 * @returns {Promise<any>} - Una promesa que se resuelve con los datos de respuesta del servidor.
 * @throws {Error} - Si ocurre un error al actualizar el stock.
 */
export async function updateStock(idProducto, talla, stock) {
  try {
    const response = await axios.put(
      `${process.env.BASE_URL}/api/stock/${idProducto}`,
      {
        talla: talla,
        stock: stock,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el stock:", error);
    throw error;
  }
}
