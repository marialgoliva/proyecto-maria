import { conn } from "../../database/mysql";
import { NextResponse } from "next/server";

export default async function crearUnCliente(dataCliente) {
  const existingClient = await conn.query(
    "SELECT * FROM CLIENTES WHERE email = ?",
    [dataCliente.email],
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
  } else {
    try {
      const result = await conn.query(
        "INSERT INTO CLIENTES SET ?",
        dataCliente,
      );
      const idCliente = result.insertId;
      return idCliente;
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
}
