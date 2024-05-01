import { conn } from "../../../../../database/mysql";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const result = await conn.query(
      "SELECT * FROM comentario WHERE idProducto = ? ",
      [params.id],
    );
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 },
    );
  }
}
