/**
 * Importa NextResponse de next/server y conn de la base de datos MySQL.
 */
import { NextResponse } from "next/server";
import { conn } from "../../../../database/mysql";

/**
 * Función asíncrona POST que maneja las solicitudes POST.
 *
 * @async
 * @param {Object} request - La solicitud HTTP.
 * @returns {Promise<NextResponse>} - La respuesta HTTP. Si el cliente ya existe, devuelve un mensaje de error con un estado de 400. Si se produce un error al insertar el cliente, devuelve un mensaje de error con un estado de 500. Si se inserta el cliente con éxito, devuelve el resultado.
 */
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
