import { NextResponse } from "next/server";
import { conn } from "../../../../../database/mysql";

export async function GET(request, { params }) {
  try {
    const result = await conn.query(
      "SELECT idPedido FROM pedidos WHERE email = ?",
      [params.param],
    );

    if (result.length > 0) {
      return NextResponse.json(result);
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 },
    );
  }
}
