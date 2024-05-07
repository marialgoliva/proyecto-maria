import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getPedidoCliente } from "@/libs/pedidos/getPedidoCliente";
import getProductosPedido from "@/libs/pedido-producto/getProductoPedido";
import { Promise } from "es6-promise";
import PedidoCliente from "@/components/card/PedidoCliente";

async function OrderPage() {
  const session = await getServerSession(authOptions);
  const idsPedidos = await getPedidoCliente(session.user.email);
  if (idsPedidos) {
    const pedidos = await Promise.all(
      idsPedidos.map(async (data) => {
        const productosPedido = await getProductosPedido(data.idPedido);
        return productosPedido
          ? {
              id: data.idPedido,
              infoPedido: productosPedido,
            }
          : null;
      }),
    );
    const pedidosFiltrados = pedidos.filter((pedido) => pedido !== null);

    pedidosFiltrados.forEach;
  }

  return (
    <div className="d-flex flex-column m-4">
      {idsPedidos ? (
        <>
          <h2 className="title">
            {session.user.name}, este es el resumen de tus pedidos:
          </h2>
          <div>
            {pedidosFiltrados.map((pedido, index) => (
              <div key={index} className="m-5">
                <h4>#{pedido.id}</h4>
                <div className="w-50 bg-light p-3 rounded shadow-sm ">
                  <PedidoCliente dataProductos={pedido.infoPedido} />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <h2 className="title">
          {session.user.name}, no tienes ningún pedido guardado.
        </h2>
      )}
    </div>
  );
}

export default OrderPage;
