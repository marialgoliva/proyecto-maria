import { conn } from "../../database/mysql";
import { NextResponse } from "next/server";

/**
 * Crea un nuevo cliente en la base de datos.
 *
 * @param {Object} dataCliente - Los datos del cliente a crear.
 * @param {string} dataCliente.email - El correo electrónico del cliente.
 * @param {string} dataCliente.nombre - El nombre del cliente.
 * @param {string} dataCliente.apellido - El apellido del cliente.
 * @param {string} dataCliente.direccion - La dirección del cliente.
 * @returns {Promise<number|Object>} - El ID del cliente creado o un objeto con un mensaje de error y un código de estado.
 * @throws {Error} - Si ocurre un error al insertar el cliente en la base de datos.
 */
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
