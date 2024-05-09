import { conn } from "../../database/mysql";

/**
 * Obtiene la talla de un producto dado su ID.
 * @param {number} id - El ID del producto.
 * @returns {Promise<Array>} - Una promesa que se resuelve en un array con los resultados de la consulta.
 * @throws {Error} - Si ocurre algún error durante la consulta.
 */
export async function getTalla(id) {
  try {
    const result = await conn.query(
      "SELECT talla FROM talla WHERE idProducto = ?",
      [id],
    );

    if (result.length > 0) {
      return result;
    }
  } catch (error) {
    console.error(error);
  }
}
