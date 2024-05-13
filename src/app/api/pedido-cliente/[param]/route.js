// Importa las dependencias necesarias
import { NextResponse } from "next/server";
import { conn } from "../../../../../database/mysql";

/**
 * Controlador de ruta GET para obtener los pedidos de un cliente específico.
 *
 * @param {import("next/server").NextRequest} request - La solicitud HTTP.
 * @param {Object} context - El contexto de la ruta.
 * @param {Object} context.params - Los parámetros de la ruta.
 * @returns {Promise<import("next/server").NextResponse>} La respuesta HTTP.
 */
export async function GET(request, { params }) {
  try {
    // Ejecuta la consulta para obtener los pedidos del cliente
    const result = await conn.query(
      "SELECT idPedido FROM PEDIDOS WHERE email = ?",
      [params.param],
    );

    // Si se encontraron pedidos, devuelve una respuesta con los pedidos
    if (result.length > 0) {
      return NextResponse.json(result);
    } else {
      // Si no se encontraron pedidos, devuelve una respuesta con un mensaje de error y un código de estado 404
      return NextResponse.json(
        {
          message: "No se encontraron pedidos para el cliente.",
        },
        { status: 404 },
      );
    }
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
