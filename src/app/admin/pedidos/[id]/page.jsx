import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/es";
import ContenidoPedido from "@/components/card/ContenidoPedido";

async function cargarPedido(id) {
  const { data } = await axios.get(`http://localhost:3000/api/pedidos/${id}`);
  return data;
}

// async function getNombre(id) {
//   const { data } = await axios.get(`http://localhost:3000/api/usuarios/${id}`);
//   return data;
// }

async function getNombreCliente(id) {
  try {
    const { data } = await axios.get(`http://localhost:3000/api/cliente/${id}`);
    return data;
  } catch (e) {
    console.log(e);
  }
}
async function getProductos(id) {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/producto-pedido/${id}`,
    );
    return data;
  } catch (e) {
    console.log(e);
    return "";
  }
}

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
        <li className="list-group-item py-3">
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
