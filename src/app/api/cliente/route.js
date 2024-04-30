import { NextResponse } from "next/server";
import { conn } from "../../../../database/mysql";

export async function POST(request) {
  const data = await request.json();

  const existingClient = await conn.query(
    "SELECT * FROM CLIENTES WHERE email = ?",
    [data.email],
  );

  if (existingClient.length > 0) {
    return NextResponse.json(
      {
        message: "El cliente ya existe",
      },
      {
        status: 400,
      },
    );
  }

  try {
    const result = await conn.query("INSERT INTO CLIENTES SET ?", data);
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
