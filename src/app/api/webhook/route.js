import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

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
    const checkoutSessionCompleted = event.data.object;

    // guardar en una base de datos
    console.log(
      "Consultado producto con id",
      checkoutSessionCompleted.metadata.pagados,
    );
    const productosPedido = JSON.parse(
      checkoutSessionCompleted.metadata.pagados,
    );
    const cliente = checkoutSessionCompleted.customer_details.email;
    const totalPagado = checkoutSessionCompleted.amount_total;

    // enviar un correo

    console.log({ productosPedido, cliente, totalPagado });
  } else {
    console.log(`Evento no manejado: ${event.type}`);
  }

  return new Response(null, { status: 200 });
}
