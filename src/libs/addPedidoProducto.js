import { conn } from "../../database/mysql";
import { NextResponse } from "next/server";

export default async function addPedidoProducto(dataProducto) {
  try {
    const result = await conn.query(
      "INSERT INTO PEDIDO_PRODUCTO SET ?",
      dataProducto,
    );

    return result;
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
