import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/es";
import ContenidoPedido from "@/components/card/ContenidoPedido";

/**
 * Carga un pedido específico.
 *
 * @param {string} id - El ID del pedido.
 * @returns {Promise<Object>} El pedido.
 */
async function cargarPedido(id) {
  const { data } = await axios.get(`${process.env.BASE_URL}/api/pedidos/${id}`);
  return data;
}

/**
 * Obtiene el nombre del cliente.
 *
 * @param {string} id - El ID del cliente.
 * @returns {Promise<Object>} Los datos del cliente.
 */
async function getNombreCliente(id) {
  try {
    const { data } = await axios.get(
      `${process.env.BASE_URL}/api/cliente/${id}`,
    );
    return data;
  } catch (e) {
    console.log(e);
  }
}

/**
 * Obtiene los productos de un pedido específico.
 *
 * @param {string} id - El ID del pedido.
 * @returns {Promise<Object>} Los productos del pedido.
 */
async function getProductos(id) {
  try {
    const { data } = await axios.get(
      `${process.env.BASE_URL}/api/producto-pedido/${id}`,
    );
    return data;
  } catch (e) {
    console.log(e);
    return "";
  }
}

/**
 * Componente de página de pedido que muestra los detalles de un pedido.
 *
 * @param {Object} params - Los parámetros del pedido.
 * @param {string} params.id - El ID del pedido.
 * @returns {JSX.Element} El componente de la página de pedido.
 */
async function PaginaPedido({ params }) {
  const pedido = await cargarPedido(params.id);
  const data = await getNombreCliente(pedido.idCliente);
  const arrayProductos = await getProductos(params.id);
  console.log("arrayProductos :>> ", arrayProductos);

  return (
    <div className="d-flex flex-column m-4">
      <h2 className="mb-3">Pedido {params.id}</h2>
      <ul className="fs-5 list-group">
        <li className="list-group-item">
          Cliente: {data?.nombre && `${data.nombre} - `}
          {pedido.idCliente}
        </li>
        <li className="list-group-item py-3">Estado: {pedido.estado}</li>
        <li className="list-group-item py-3">
          Fecha de creación:{" "}
          {dayjs(pedido.fechaPedido).locale("es").format("DD/MM/YYYY")}
        </li>
        <li className="list-group-item py-3">
          <strong>
            Fecha de entrega:{" "}
            {dayjs(pedido.fechaEntrega).locale("es").format("DD/MM/YYYY")}
          </strong>
        </li>
        <li className="list-group-item py-3">
          Importe total: {pedido.importeTotal} €
        </li>
        <li className="list-group-item py-3">Tipo pago: {pedido.tipoPago}</li>
        <li className="list-group-item py-3 d-flex flex-column align-items-center">
          {arrayProductos ? (
            <>
              <h5>Productos incluidos:</h5>
              <ContenidoPedido dataProductos={arrayProductos} />
            </>
          ) : (
            <h5>No se encuentran productos asociados a este pedido.</h5>
          )}
        </li>
      </ul>
    </div>
  );
}

export default PaginaPedido;
