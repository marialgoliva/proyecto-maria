"use client";
import styles from "./styles.module.css";
import Table from "react-bootstrap/Table";
import ViewButton from "../buttons/ViewButton";
import EditButton from "../buttons/EditButton";
import dayjs from "dayjs";
import "dayjs/locale/es";
/**
 * Componente que muestra una lista de pedidos.
 *
 * @component
 * @param {Object[]} pedidos - La lista de pedidos a mostrar.
 * @returns {JSX.Element} El componente ListaPedidos.
 */
function ListaPedidos({ pedidos }) {
  dayjs.locale("es");

  return (
    <div className={styles.tableContainer}>
      <Table striped hover className="w-75">
        <thead>
          <tr>
            <th>Id</th>
            <th>Cliente</th>
            <th>Email</th>
            <th>Fecha entrante</th>
            <th>Fecha entrega</th>
            <th>Estado actual</th>
            <th>Tipo de Pago</th>
            <th>Importe total</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.idPedido} className="col">
              <td>{pedido.idPedido}</td>
              <td>{pedido.idCliente}</td>
              <td>{pedido.email}</td>
              <td>
                {dayjs(pedido.fechaPedido).locale("es").format("DD/MM/YYYY")}
              </td>
              <td>
                {dayjs(pedido.fechaEntrega).locale("es").format("DD/MM/YYYY")}
              </td>
              <td>{pedido.estado}</td>
              <td>{pedido.tipoPago}</td>
              <td>{pedido.importeTotal}</td>
              <td>
                {
                  <>
                    <EditButton type="pedidos" id={pedido.idPedido} />
                    <ViewButton type="pedidos" id={pedido.idPedido} />
                  </>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ListaPedidos;
