import { conn } from "../../database/mysql";
import { NextResponse } from "next/server";

/**
 * Inserta un nuevo producto en la tabla PEDIDO_PRODUCTO.
 * @param {Object} dataProducto - Los datos del producto a insertar.
 * @returns {Promise<number|Object>} - El ID del producto insertado o un objeto de error en caso de fallo.
 */
export default async function addPedidoProducto(dataProducto) {
  try {
    const result = await conn.query(
      "INSERT INTO PEDIDO_PRODUCTO SET ?",
      dataProducto,
    );

    return result.insertId;
  } catch (error) {
    console.log("Error al insertar en PEDIDO_PRODUCTO:", error);
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
