// Importa las dependencias necesarias
import { NextResponse } from "next/server";
import Stripe from "stripe";

// Crea una nueva instancia de Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Controlador de ruta POST para crear una sesión de pago con Stripe.
 *
 * @param {import("next/server").NextRequest} request - La solicitud HTTP.
 * @returns {Promise<import("next/server").NextResponse>} La respuesta HTTP.
 */
export async function POST(request) {
  // Obtiene los datos del cuerpo de la solicitud
  const body = await request.json();
  const productos = [];
  const payProducts = [];
  const dataCliente = body.dataCliente;

  // Recorre cada producto en el carrito
  body.cart.forEach((product) => {
    // Prepara los datos del producto para Stripe
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

    // Prepara los datos del producto para el pago
    payProducts.push({
      productId: product.idProducto,
      cantidad: product.cantidad,
      talla: product.talla || null,
    });
  });

  // Crea una sesión de pago con Stripe
  const session = await stripe.checkout.sessions.create({
    success_url: process.env.BASE_URL + "/success",
    cancel_url: process.env.BASE_URL + "/cancel",
    line_items: productos,
    metadata: {
      pagados: JSON.stringify(payProducts),
      dataCliente: JSON.stringify(dataCliente),
    },
    mode: "payment",
  });

  // Devuelve la sesión de pago
  return NextResponse.json(session);
}
