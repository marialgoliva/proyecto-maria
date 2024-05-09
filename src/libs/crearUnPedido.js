import { conn } from "../../database/mysql";
import { NextResponse } from "next/server";

/**
 * Crea un nuevo pedido en la base de datos.
 * @param {Object} dataPedido - Los datos del pedido a insertar.
 * @returns {Promise<number>} - El ID del pedido insertado.
 * @throws {NextResponse} - Si ocurre un error al insertar el pedido.
 */
export default async function crearUnPedido(dataPedido) {
  try {
    const result = await conn.query("INSERT INTO PEDIDOS SET ?", dataPedido);
    const id = result.insertId;
    return id;
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
