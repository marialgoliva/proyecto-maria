import axios from "axios";

export async function updateStock(idProducto, talla, stock) {
  try {
    console.log("idProducto :>> ", idProducto);
    console.log("talla :>> ", talla);
    console.log("stock :>> ", stock);
    const response = await axios.put(
      `http://localhost:3000/api/stock/${idProducto}`,
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
