import { NextResponse } from "next/server";
import { conn } from "../../../../../database/mysql";
import bcrypt from "bcrypt";

export async function POST(request) {
  const data = await request.json();

  const existingUser = await conn.query(
    "SELECT * FROM USUARIOS WHERE dni = ? OR email = ?",
    [data.dni, data.email],
  );

  if (existingUser.length > 0) {
    return NextResponse.json(
      {
        message: "El usuario ya existe",
      },
      {
        status: 400,
      },
    );
  }

  try {
    data.password = await bcrypt.hash(data.password, 10);
    const result = await conn.query("INSERT INTO USUARIOS SET ?", data);
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
