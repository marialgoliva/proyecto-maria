import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const body = await request.json();
  const productos = [];
  const payProducts = [];
  const dataCliente = body.dataCliente;

  body.cart.forEach((product) => {
    productos.push({
      price_data: {
        currency: "eur",
        product_data: {
          name: product.nombre,
          description: product.color,
          metadata: {
            color: product.color,
          },
          images: [product.imagen],
        },
        unit_amount: product.precio * 100,
      },
      quantity: product.cantidad,
    });
    payProducts.push({
      productId: product.idProducto,
      cantidad: product.cantidad,
      talla: product.talla || null,
    });
  });
  const session = await stripe.checkout.sessions.create({
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
    line_items: productos,
    metadata: {
      pagados: JSON.stringify(payProducts),
      dataCliente: JSON.stringify(dataCliente),
    },
    mode: "payment",
  });
  // console.log(session);
  return NextResponse.json(session);
}
