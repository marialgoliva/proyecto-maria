import axios from "axios";
import "@/styles/global.css";
import ListaPedidos from "@/components/lists/ListaPedidos";

async function cargarPedidos() {
  const { data } = await axios.get(process.env.BASE_URL + "/api/pedidos");
  return data;
}

async function PaginaPedidos() {
  const pedidos = await cargarPedidos();
  if (pedidos.length === 0) return <h1>No hay pedidos</h1>;

  return (
    <div>
      <ListaPedidos pedidos={pedidos} />
    </div>
  );
}

export default PaginaPedidos;
