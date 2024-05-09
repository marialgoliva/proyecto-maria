// Importa las dependencias necesarias
import { NextResponse } from "next/server";
import { conn } from "../../../../../database/mysql";
import bcrypt from "bcrypt";

/**
 * Controlador de ruta POST para registrar un nuevo usuario.
 *
 * @param {import("next/server").NextRequest} request - La solicitud HTTP.
 * @returns {Promise<import("next/server").NextResponse>} La respuesta HTTP.
 */
export async function POST(request) {
  // Obtiene los datos del cuerpo de la solicitud
  const data = await request.json();

  // Verifica si ya existe un usuario con el mismo DNI o correo electrónico
  const existingUser = await conn.query(
    "SELECT * FROM USUARIOS WHERE dni = ? OR email = ?",
    [data.dni, data.email],
  );

  // Si el usuario ya existe, devuelve una respuesta con un mensaje de error y un código de estado 400
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
    // Hashea la contraseña del usuario
    data.password = await bcrypt.hash(data.password, 10);

    // Inserta los datos del usuario en la base de datos
    const result = await conn.query("INSERT INTO USUARIOS SET ?", data);

    // Si la inserción es exitosa, devuelve una respuesta con el resultado de la inserción
    return NextResponse.json({ result });
  } catch (error) {
    // Si ocurre un error, devuelve una respuesta con un mensaje de error y un código de estado 500
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
