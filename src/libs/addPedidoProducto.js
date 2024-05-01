import { conn } from "../../database/mysql";
import { NextResponse } from "next/server";

export default async function addPedidoProducto(dataProducto) {
  try {
    const result = await conn.query(
      "INSERT INTO PEDIDO_PRODUCTO SET ?",
      dataProducto,
    );

    console.log("Resultado de la inserción:", result);

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
