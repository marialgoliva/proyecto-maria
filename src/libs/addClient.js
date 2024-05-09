import axios from "axios";

/**
 * Agrega un cliente a través de una solicitud POST a la API.
 * @param {Object} data - Los datos del cliente a agregar.
 * @returns {Promise<Object>} - Una promesa que se resuelve con los datos del cliente agregado.
 * @throws {Error} - Si ocurre un error durante la solicitud.
 */
async function addClient(data) {
  try {
    const response = await axios.post("/api/clientes", data);
    return response.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export default addClient;
