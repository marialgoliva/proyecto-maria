import axios from "axios";
import { NextResponse } from "next/server";
/**
 * Agrega un nuevo stock mediante una solicitud HTTP POST a la API.
 *
 * @param {Object} data - Los datos del stock a agregar.
 * @returns {Promise<Object>} - Una promesa que se resuelve con los datos de respuesta de la API.
 * @throws {Error} - Si ocurre un error durante la solicitud HTTP.
 */

export default async function addStock(data) {
  try {
    const response = await axios.post("/api/stock", data);
    return response.data;
  } catch (error) {
    console.log("Error al insertar el stock:", error);
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
