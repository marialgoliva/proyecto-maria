import axios from "axios";
import "@/styles/global.css";
import ListaPedidos from "@/components/lists/ListaPedidos";

/**
 * Función para cargar pedidos desde una URL de solicitud.
 *
 * @returns {Promise<Array>} Una promesa que se resuelve en una lista de pedidos.
 */
async function cargarPedidos() {
  const { data } = await axios.get(process.env.BASE_URL + "/api/pedidos");
  return data;
}

/**
 * Componente de página de pedidos que muestra una lista de pedidos.
 *
 * @returns {JSX.Element} El componente de la página de pedidos.
 */
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
