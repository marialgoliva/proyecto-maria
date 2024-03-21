"use client"
import styles from "./styles.module.css";
import Table from "react-bootstrap/Table";
import DeleteButton from "../buttons/DeleteButton";
import ViewButton from "../buttons/ViewButton";
import EditButton from "../buttons/EditButton";
import { useState } from 'react';
import dayjs from "dayjs";
import 'dayjs/locale/es';

function ListaPedidos({ pedidos }) {

  dayjs.locale('es');

  const [listaPedidos, setlistaPedidos] = useState(pedidos);

  const handleDeleteProduct = async (idPedido) => {
    try {
      await axios.delete(`/api/pedidos/${idPedido}`);
      const updatedlistaPedidos = listaPedidos.filter(product => product.idPedido !== idPedido);
      setlistaPedidos(updatedlistaPedidos);
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  

  return (
    <div className={styles.tableContainer}>
      <Table striped hover className="w-75">
        <thead>
          <tr>
            <th>Id</th>
            <th>Cliente</th>
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
                <td>{pedido.cliente}</td>
                <td >{dayjs(pedido.fechaPedido).locale('es').format('DD/MM/YYYY')}</td>
                <td>{dayjs(pedido.fechaEntrega).locale('es').format('DD/MM/YYYY')}</td>
                <td>{pedido.estado}</td>
                <td>{pedido.tipoPago}</td>
                <td>{pedido.importeTotal}</td>
                <td>{
                  
                  <>
                  <EditButton type='pedidos' id={pedido.idPedido}/>
                  <ViewButton idPedido={pedido.idPedido}/>
                  </>
                  
                  }</td>
              </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ListaPedidos;
