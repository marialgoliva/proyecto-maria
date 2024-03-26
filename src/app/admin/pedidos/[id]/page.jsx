import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/es";

async function cargarPedido(id) {
  const { data } = await axios.get(`http://localhost:3000/api/pedidos/${id}`);
  return data;
}

async function getNombre(id) {
  const { data } = await axios.get(`http://localhost:3000/api/usuarios/${id}`);
  return data;
}

// async function getProductos(id) {
//   const { data } = await axios.get(
//     `http://localhost:3000/api/producto-pedido/${id}`,
//   );
//   return data;
// }

// async function loadProduct(productId) {
//   const { data } = await axios.get(
//     `http://localhost:3000/api/products/${productId}`,
//   );
//   return data;
// }

async function obtenerProductosDelPedido(idPedido) {
  const respuesta = await fetch(
    `http://localhost:3000/api/producto-pedido/${idPedido}/productos`,
  );
  if (!respuesta.ok) {
    throw new Error("Problema al obtener los productos del pedido");
  }
  const productos = await respuesta.json();
  return productos;
}

async function PaginaPedido({ params }) {
  const pedido = await cargarPedido(params.id);
  const { nombre, apellidos } = await getNombre(pedido.idCliente);
  const productos = obtenerProductosDelPedido(params.id);
  console.log(productos);

  return (
    <div className="d-flex flex-column m-4">
      <h2 className="mb-3">Pedido {params.id}</h2>
      <ul className="fs-5 list-group">
        <li className="list-group-item">
          Cliente: {pedido.idCliente} - {nombre} {apellidos}
        </li>
        <li className="list-group-item">Estado: {pedido.estado}</li>
        <li className="list-group-item">
          Fecha de creación:{" "}
          {dayjs(pedido.fechaPedido).locale("es").format("DD/MM/YYYY")}
        </li>
        <li className="list-group-item">
          <strong>
            Fecha de entrega:{" "}
            {dayjs(pedido.fechaEntrega).locale("es").format("DD/MM/YYYY")}
          </strong>
        </li>
        <li className="list-group-item">
          Importe total: {pedido.importeTotal} €
        </li>
        <li className="list-group-item">Tipo pago: {pedido.tipoPago}</li>
      </ul>
    </div>
  );
}

export default PaginaPedido;
