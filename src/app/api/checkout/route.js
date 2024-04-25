import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const body = await request.json();
  console.log(body);
  const productos = [];
  body.forEach((product) => {
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
  });
  const session = await stripe.checkout.sessions.create({
    success_url: "http://localhost:3000/success",
    line_items: productos,
    mode: "payment",
  });
  console.log(session);
  return NextResponse.json(session);
}
