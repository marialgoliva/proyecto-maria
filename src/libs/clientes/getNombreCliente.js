import axios from "axios";
/**
 * Obtiene el nombre del cliente mediante su ID.
 * @param {number} id - El ID del cliente.
 * @returns {Promise<string>} - Una promesa que se resuelve con el nombre del cliente.
 */
export async function getNombreCliente(id) {
  try {
    const { data } = await axios.get(
      `${process.env.BASE_URL}/api/cliente/${id}`,
    );
    return data;
  } catch (e) {
    console.log(e);
  }
}
