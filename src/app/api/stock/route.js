// Importa las dependencias necesarias
import { conn } from "../../../../database/mysql";
import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.json();

  try {
    const result = await conn.query("INSERT INTO STOCK SET ?", data);
    return NextResponse.json({ result });
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
