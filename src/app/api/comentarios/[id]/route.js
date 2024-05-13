import { conn } from "../../../../../database/mysql";
import { NextResponse } from "next/server";

/**
 * Controlador de ruta GET para obtener los comentarios de un producto específico.
 *
 * @param {import("next/server").NextRequest} request - La solicitud HTTP.
 * @param {Object} params - Los parámetros de la ruta.
 * @returns {Promise<import("next/server").NextResponse>} La respuesta HTTP.
 */
export async function GET(request, { params }) {
  try {
    // Ejecuta la consulta para obtener los comentarios del producto
    const result = await conn.query(
      "SELECT * FROM COMENTARIO WHERE idProducto = ? ",
      [params.id],
    );

    // Devuelve una respuesta con los comentarios del producto
    return NextResponse.json(result);
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
