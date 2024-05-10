import axios from "axios";
const REQUEST_URL = process.env.NEXT_PUBLIC_BASE_URL;
/**
 * Obtiene los comentarios de un determinado ID.
 * @param {string} id - El ID del comentario a obtener.
 * @returns {Promise} - Una promesa que se resuelve con los datos de los comentarios.
 */
export async function getComentarios(id) {
  try {
    const { data } = await axios.get(`${REQUEST_URL}/api/comentarios/${id}`);
    return data;
  } catch (e) {
    console.log(e);
  }
}
