import axios from "axios";
async function getProductosPedido(id) {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/producto-pedido/${id}`,
    );
    if (data.length > 0) return data;
  } catch (e) {
    return "No se encuentra el producto con id: " + id;
  }
}

export default getProductosPedido;
