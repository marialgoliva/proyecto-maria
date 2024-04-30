import { conn } from "../../database/mysql";
import { NextResponse } from "next/server";

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
