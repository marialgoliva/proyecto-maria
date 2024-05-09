/**
 * Importa conn de la base de datos MySQL y NextResponse de next/server.
 */
import { conn } from "../../../../../database/mysql";
import { NextResponse } from "next/server";

/**
 * Controlador de ruta GET para obtener un recurso específico.
 *
 * @async
 * @param {import("next/server").NextRequest} request - La solicitud HTTP.
 * @param {Object} params - Los parámetros de la ruta.
 * @returns {Promise<import("next/server").NextResponse>} La respuesta HTTP. La implementación específica de esta función determinará qué se devuelve exactamente.
 */
export async function GET(request, { params }) {
  console.log("params.id", params.id);
  try {
    const result = await conn.query(
      "SELECT nombre FROM CLIENTES WHERE dni = ?",
      [params.id],
    );
    if (result.length === 0) {
      return NextResponse.json(
        {
          message: "Producto no encontrado",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 },
    );
  }
}
