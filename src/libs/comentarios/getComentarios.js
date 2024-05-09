import axios from "axios";
/**
 * Obtiene los comentarios de un determinado ID.
 * @param {string} id - El ID del comentario a obtener.
 * @returns {Promise} - Una promesa que se resuelve con los datos de los comentarios.
 */

export async function getComentarios(id) {
  try {
    const { data } = await axios.get(
      `${process.env.BASE_URL}/api/comentarios/${id}`,
    );
    return data;
  } catch (e) {
    console.log(e);
  }
}
