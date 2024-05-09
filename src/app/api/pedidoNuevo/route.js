// Importa las dependencias necesarias
import { conn } from "../../../../database/mysql";
import { NextResponse } from "next/server";

/**
 * Controlador de ruta GET para obtener todos los pedidos.
 *
 * @returns {Promise<import("next/server").NextResponse>} La respuesta HTTP.
 */
export async function GET() {
  try {
    // Ejecuta la consulta para obtener todos los pedidos
    const results = await conn.query("SELECT * FROM PEDIDO");

    // Devuelve una respuesta con los pedidos
    return NextResponse.json(results);
  } catch (error) {
    // Si ocurre un error, devuelve una respuesta con un mensaje de error y un código de estado 500
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      },
    );
  }
}

/**
 * Controlador de ruta POST para crear un nuevo pedido.
 *
 * @param {import("next/server").NextRequest} request - La solicitud HTTP.
 * @returns {Promise<import("next/server").NextResponse>} La respuesta HTTP.
 */
export async function POST(request) {
  try {
    // Obtiene los datos del cuerpo de la solicitud
    const {
      idCliente,
      fechaPedido,
      fechaEntrega,
      estado,
      tipoPago,
      importeTotal,
    } = await request.json();

    // Inserta los datos del pedido en la base de datos
    const result = await conn.query("INSERT INTO PEDIDO SET ?", {
      idCliente,
      fechaPedido,
      fechaEntrega,
      estado,
      tipoPago,
      importeTotal,
    });

    // Si la inserción es exitosa, devuelve una respuesta con el ID del pedido insertado
    return NextResponse.json({
      idPedido: result.insertId,
    });
  } catch (error) {
    // Si ocurre un error, devuelve una respuesta con un mensaje de error y un código de estado 500
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      },
    );
  }
}
