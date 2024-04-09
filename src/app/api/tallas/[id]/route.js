import { conn } from "../../../../../database/mysql";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const result = await conn.query(
      "SELECT talla FROM talla WHERE idProducto =?",
      [params.id],
    );
    if (result.length === 0) {
      return NextResponse.json(
        {
          message: "no encontrado",
        },
        {
          status: 404,
        },
      );
    }

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
