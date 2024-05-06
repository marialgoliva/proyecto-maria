import axios from "axios";

export async function getPedidoCliente(email) {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/pedido-cliente/${email}`,
    );
    return data;
  } catch (error) {
    console.error(error);
  }
}
