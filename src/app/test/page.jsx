import { updateStock } from "@/libs/stock/updateStock";

function Test() {
  async function actualizarStock(idProducto, talla, stock) {
    try {
      const response = await updateStock(idProducto, talla, stock);
      console.log(response.message);
    } catch (error) {
      console.error("Error al actualizar el stock:", error);
    }
  }
  const response = actualizarStock(9, "L", -32);
  console.log("message", response.message);
  return <div>TEST</div>;
}

export default Test;
