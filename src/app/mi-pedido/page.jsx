import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getPedidoCliente } from "@/libs/pedidos/getPedidoCliente";
import getProductosPedido from "@/libs/pedido-producto/getProductoPedido";
import { Promise } from "es6-promise";
import PedidoCliente from "@/components/card/PedidoCliente";
/**
 * Página de pedidos.
 * @returns {JSX.Element} La página de pedidos.
 */
async function OrderPage() {
  // Obtiene la sesión del servidor
  const session = await getServerSession(authOptions);

  // Obtiene los pedidos del cliente
  const idsPedidos = await getPedidoCliente(session.user.email);

  let pedidosFiltrados = [];

  if (idsPedidos) {
    // Obtiene los productos de cada pedido
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

    // Filtra los pedidos que tienen productos
    pedidosFiltrados = pedidos.filter((pedido) => pedido !== null);
  }

  // Renderiza la página de pedidos
  return (
    <div className="d-flex flex-column m-4">
      {idsPedidos ? (
        <>
          <h2 className="title">
            {session.user.name}, este es el resumen de tus pedidos:
          </h2>
          <div>
            {pedidosFiltrados.map((pedido, index) => (
              <div key={index} className="m-md-5 m-1">
                <h4>#{pedido.id}</h4>
                <div className="w-100 w-md-50 bg-light p-3 rounded shadow-sm ">
                  {/* Renderiza un componente PedidoCliente para cada pedido */}
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
