import axios from "axios";
/**
 * Recupera el pedido para un cliente dado en base a su correo electrónico.
 * @param {string} email - El correo electrónico del cliente.
 * @returns {Promise<Object>} - Una promesa que se resuelve con los datos del pedido.
 */
export async function getPedidoCliente(email) {
  try {
    const { data } = await axios.get(
      `${process.env.BASE_URL}/api/pedido-cliente/${email}`,
    );
    return data;
  } catch (error) {
    console.error(error);
  }
}
