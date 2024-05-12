// Importa las dependencias necesarias
import { NextResponse } from "next/server";
import { conn } from "../../../../../database/mysql";

/**
 * Controlador de ruta GET para obtener un pedido específico.
 *
 * @param {import("next/server").NextRequest} request - La solicitud HTTP.
 * @param {Object} params - Los parámetros de la ruta.
 * @returns {Promise<import("next/server").NextResponse>} La respuesta HTTP.
 */
export async function GET(request, { params }) {
  try {
    // Ejecuta la consulta para obtener el pedido
    const result = await conn.query(
      "SELECT * FROM PEDIDOS WHERE idPedido = ?",
      [params.id],
    );

    // Si no se encuentra el pedido, devuelve una respuesta con un mensaje de error y un código de estado 404
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

    // Devuelve una respuesta con el pedido
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

/**
 * Controlador de ruta DELETE para eliminar un pedido específico.
 *
 * @param {import("next/server").NextRequest} request - La solicitud HTTP.
 * @param {Object} params - Los parámetros de la ruta.
 * @returns {Promise<import("next/server").NextResponse>} La respuesta HTTP.
 */
export async function DELETE(request, { params }) {
  try {
    // Ejecuta la consulta para eliminar el pedido
    const result = await conn.query("DELETE FROM PEDIDO WHERE idPedido = ?", [
      params.id,
    ]);

    // Si no se encuentra el pedido, devuelve una respuesta con un mensaje de error y un código de estado 404
    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Producto no encontrado",
        },
        {
          status: 404,
        },
      );
    }

    // Si la eliminación es exitosa, devuelve una respuesta con un código de estado 204
    return new Response(null, {
      status: 204,
    });
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
 * Controlador de ruta PUT para actualizar un pedido específico.
 *
 * @param {import("next/server").NextRequest} request - La solicitud HTTP.
 * @param {Object} params - Los parámetros de la ruta.
 * @returns {Promise<import("next/server").NextResponse>} La respuesta HTTP.
 */
export async function PUT(request, { params }) {
  try {
    // Obtiene los datos del cuerpo de la solicitud
    const data = await request.json();
    console.log("data :>> ", data);
    console.log("params :>> ", params.id);
    // Ejecuta la consulta para actualizar el pedido
    const result = await conn.query("UPDATE PEDIDOS SET ? WHERE idPedido = ?", [
      data,
      params.id,
    ]);
    console.log("result :>> ", result);

    // Si no se encuentra el pedido, devuelve una respuesta con un mensaje de error y un código de estado 404
    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Producto no encontrado",
        },
        { status: 404 },
      );
    }

    // Obtiene el pedido actualizado
    const updatedProduct = await conn.query(
      "SELECT * FROM PEDIDOS WHERE idPedido=?",
      [params.id],
    );

    // Devuelve una respuesta con el pedido actualizado
    return NextResponse.json(updatedProduct[0]);
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
