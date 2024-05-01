import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import crearUnCliente from "@/libs/crearUnCliente";
import crearUnPedido from "@/libs/crearUnPedido";
import { formatDate, getFechaEntrega } from "@/libs/utils";
import addPedidoProducto from "@/libs/addPedidoProducto";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

//Se recibe la respuesta de stripe
export async function POST(request) {
  const body = await request.text();
  const headersList = headers();
  const sig = headersList.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  if (event.type === "checkout.session.completed") {
    const checkoutSessionCompleted = event.data.object; //Objeto que contiene los datos del pedido tramitado.
    const cliente = checkoutSessionCompleted.customer_details.email; //Recogemos el email con el que se realizó la transacción
    const totalPagado = checkoutSessionCompleted.amount_total / 100; //Recogemos la cantidad que se ha pagado
    //Datos de los productos que contiene el pedido
    const productosPedido = JSON.parse(
      checkoutSessionCompleted.metadata.pagados,
    );
    const datosCliente = JSON.parse(
      checkoutSessionCompleted.metadata.dataCliente,
    );
    console.log("Datos cliente: ", datosCliente);

    const fechaPedido = formatDate(new Date()); //Fecha actual (fecha en la que se realiza el pedido)
    const fechaEntrega = getFechaEntrega(new Date()); //Fecha estimada de entrega, 5 días después de realizar el pedido.

    //Objeto que contiene los datos a insertar en la tabla CLIENTES
    const dataCliente = {
      email: cliente,
      nombre: datosCliente.nombre,
      calle: datosCliente.calle,
      ciudad: datosCliente.ciudad,
      cp: datosCliente.cp,
    };

    //Objeto que contiene los datos a insertar en la tabla Pedidos
    const dataPedido = {
      email: cliente,
      fechaPedido: fechaPedido,
      fechaEntrega: fechaEntrega,
      estado: "Pagado",
      tipoPago: "tarjeta",
      importeTotal: totalPagado,
    };

    //Insertamos los datos del cliente
    const result = await crearUnCliente(dataCliente);
    //Creamos el pedido
    const idPedido = await crearUnPedido(dataPedido);
    //Recorremos el array con los datos de los productos
    productosPedido.forEach((producto) => {
      //Objeto que contiene los datos de los productos a insertar en la tabla PEDIDO_PRODUCTO
      const dataProducto = {
        idPedido: idPedido,
        idProducto: producto.productId,
        precioUnitario: null,
        cantidad: producto.cantidad,
      };
      //Insertamos los datos del pedido
      addPedidoProducto(dataProducto);
    });
  } else {
    console.log(`Evento no manejado: ${event.type}`);
  }

  return new Response(null, { status: 200 });
}
