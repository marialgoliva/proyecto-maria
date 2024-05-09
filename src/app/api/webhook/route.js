/**
 * Importa NextResponse de next/server, headers de next/headers, Stripe para el manejo de pagos,
 * y varias funciones de utilidad y manejo de datos.
 */
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import crearUnCliente from "@/libs/crearUnCliente";
import crearUnPedido from "@/libs/crearUnPedido";
import { formatDate, getFechaEntrega } from "@/libs/utils";
import addPedidoProducto from "@/libs/addPedidoProducto";
import { updateStock } from "@/libs/stock/updateStock";

/**
 * Inicializa una nueva instancia de Stripe con la clave secreta de Stripe.
 */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Obtiene el secreto del webhook de Stripe desde las variables de entorno.
 */
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

/**
 * Controlador de ruta POST para manejar los webhooks de Stripe.
 *
 * @param {import("next/server").NextRequest} request - La solicitud HTTP.
 * @returns {Promise<import("next/server").NextResponse>} La respuesta HTTP.
 */
export async function POST(request) {
  const body = await request.text();
  const headersList = headers();
  const sig = headersList.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  if (event.type === "checkout.session.completed") {
    const checkoutSessionCompleted = event.data.object;
    const cliente = checkoutSessionCompleted.customer_details.email;
    const totalPagado = checkoutSessionCompleted.amount_total / 100;
    const productosPedido = JSON.parse(
      checkoutSessionCompleted.metadata.pagados,
    );
    const datosCliente = JSON.parse(
      checkoutSessionCompleted.metadata.dataCliente,
    );
    const fechaPedido = formatDate(new Date());
    const fechaEntrega = getFechaEntrega(new Date());

    const dataCliente = {
      email: cliente,
      nombre: datosCliente.nombre,
      calle: datosCliente.calle,
      ciudad: datosCliente.ciudad,
      cp: datosCliente.cp,
      dni: datosCliente.dni,
    };

    const dataPedido = {
      email: cliente,
      fechaPedido: fechaPedido,
      fechaEntrega: fechaEntrega,
      estado: "Pagado",
      tipoPago: "tarjeta",
      importeTotal: totalPagado,
      idCliente: datosCliente.dni,
    };

    await crearUnCliente(dataCliente);

    const idPedido = await crearUnPedido(dataPedido);

    for (const producto of productosPedido) {
      const dataProducto = {
        idPedido: idPedido,
        idProducto: producto.productId,
        talla: producto.talla,
        cantidad: producto.cantidad,
      };
      const resultProductos = await addPedidoProducto(dataProducto);

      console.log(
        "Producto insertado en PEDIDO_PRODUCTO con ID:",
        resultProductos.insertId,
      );

      const response = await updateStock(
        producto.productId,
        producto.talla,
        producto.cantidad,
      );
      console.log("response", response.message);
    }
  } else {
    console.log(`Evento no manejado: ${event.type}`);
  }

  return new Response(null, { status: 200 });
}
