// Importa las dependencias necesarias
import { conn } from "../../../../../database/mysql";
import { NextResponse } from "next/server";

/**
 * Controlador de ruta GET para obtener todos los productos de un pedido específico.
 *
 * @param {import("next/server").NextRequest} request - La solicitud HTTP.
 * @param {Object} params - Los parámetros de la ruta.
 * @returns {Promise<import("next/server").NextResponse>} La respuesta HTTP.
 */
export async function GET(request, { params }) {
  try {
    // Ejecuta la consulta para obtener los productos del pedido
    const results = await conn.query(
      "SELECT * FROM PEDIDO_PRODUCTO WHERE idPedido = ?",
      [params.id],
    );

    // Devuelve una respuesta con los productos del pedido
    return NextResponse.json(results);
  } catch (error) {
    // Si ocurre un error, devuelve una respuesta con un mensaje de error y un código de estado 500
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 },
    );
  }
}
