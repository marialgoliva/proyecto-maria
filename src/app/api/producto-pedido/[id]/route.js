import { conn } from "../../../../../database/mysql";
import { NextResponse } from "next/server";



export async function GET (request, { params }) {
  try {
    const results = await conn.query("SELECT idProducto FROM PEDIDO_PRODUCTO WHERE idPedido =?",[params.id]);
    if (results.length === 0) {
      return NextResponse.json(
        {
          message: "Producto no encontrado",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}