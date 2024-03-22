import { conn } from "../../../../../database/mysql";
import { NextResponse } from "next/server";



export async function GET (request, { params }) {
  try {
    const result = await conn.query("SELECT nombre,apellidos FROM USUARIO WHERE dni =?",[params.id]);
    if (result.length === 0) {
      return NextResponse.json(
        {
          message: "Producto no encontrado",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}