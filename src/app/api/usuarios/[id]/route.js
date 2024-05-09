// Importa las dependencias necesarias
import { conn } from "../../../../../database/mysql";
import { NextResponse } from "next/server";

/**
 * Controlador de ruta GET para obtener el nombre y los apellidos de un usuario específico.
 *
 * @param {import("next/server").NextRequest} request - La solicitud HTTP.
 * @param {Object} params - Los parámetros de la ruta.
 * @returns {Promise<import("next/server").NextResponse>} La respuesta HTTP.
 */
export async function GET(request, { params }) {
  try {
    // Ejecuta la consulta para obtener el nombre y los apellidos del usuario
    const result = await conn.query(
      "SELECT nombre,apellidos FROM USUARIO WHERE dni =?",
      [params.id],
    );

    // Si no se encuentra el usuario, devuelve una respuesta con un mensaje de error y un código de estado 404
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

    // Devuelve una respuesta con el nombre y los apellidos del usuario
    return NextResponse.json(result[0]);
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
