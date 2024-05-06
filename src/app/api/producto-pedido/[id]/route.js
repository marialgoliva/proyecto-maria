import { conn } from "../../../../../database/mysql";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const results = await conn.query(
      "SELECT * FROM PEDIDO_PRODUCTO WHERE idPedido = ?",
      [params.id],
    );

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 },
    );
  }
}
