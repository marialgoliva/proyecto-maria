// Importa las dependencias necesarias
import { conn } from "../../../../../database/mysql";
import { NextResponse } from "next/server";

/**
 * Controlador de ruta GET para obtener la información de stock de un producto específico.
 *
 * @param {import("next/server").NextRequest} request - La solicitud HTTP.
 * @param {Object} params - Los parámetros de la ruta.
 * @returns {Promise<import("next/server").NextResponse>} La respuesta HTTP.
 */
export async function GET(request, { params }) {
  try {
    // Ejecuta la consulta para obtener la información de stock del producto
    const result = await conn.query("SELECT * FROM stock WHERE idProducto =?", [
      params.id,
    ]);

    // Si no se encuentra la información de stock, devuelve una respuesta con un mensaje de error y un código de estado 404
    if (result.length === 0) {
      return NextResponse.json(
        {
          message: "no encontrado",
        },
        {
          status: 404,
        },
      );
    }

    // Devuelve una respuesta con la información de stock del producto
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

/**
 * Controlador de ruta PUT para actualizar la información de stock de un producto específico.
 *
 * @param {import("next/server").NextRequest} request - La solicitud HTTP.
 * @param {Object} params - Los parámetros de la ruta.
 * @returns {Promise<import("next/server").NextResponse>} La respuesta HTTP.
 */
export async function PUT(request, { params }) {
  try {
    // Obtiene los datos del cuerpo de la solicitud
    const { stock, talla } = await request.json();

    // Obtiene el stock actual del producto
    const stockActual = await conn.query(
      "SELECT stock FROM stock WHERE idProducto = ? AND talla = ?",
      [params.id, talla],
    );

    let mensaje = "";

    // Calcula el nuevo stock
    const nuevoStock = stockActual[0].stock - stock;

    // Si el nuevo stock es menor o igual a cero, establece un mensaje indicando que no hay suficiente stock
    if (nuevoStock <= 0) {
      mensaje =
        "No hay suficiente stock de ese producto. Es necesario fabricar más unidades. Se actualizará en valores negativos.";
    } else {
      // Si el nuevo stock es mayor que cero, establece un mensaje indicando que el stock ha sido actualizado
      mensaje = "Stock actualizado, quedan " + nuevoStock + " unidades.";
    }

    // Actualiza el stock en la base de datos
    await conn.query(
      "UPDATE stock SET stock = ? WHERE idProducto = ? AND talla = ?",
      [nuevoStock, params.id, talla],
    );

    // Devuelve una respuesta con el mensaje
    return NextResponse.json({
      message: mensaje,
    });
  } catch (e) {
    // Si ocurre un error, devuelve una respuesta con un mensaje de error y un código de estado 500
    return NextResponse.json(
      {
        message: e.message,
      },
      { status: 500 },
    );
  }
}
