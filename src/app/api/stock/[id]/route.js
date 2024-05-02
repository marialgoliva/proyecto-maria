import { conn } from "../../../../../database/mysql";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const result = await conn.query("SELECT * FROM stock WHERE idProducto =?", [
      params.id,
    ]);
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

export async function PUT(request, { params }) {
  try {
    const { stock, talla } = await request.json();

    const stockActual = await conn.query(
      "SELECT stock FROM stock WHERE idProducto = ? AND talla = ?",
      [params.id, talla],
    );

    let mensaje = "";

    const nuevoStock = stockActual[0].stock - stock;

    if (nuevoStock <= 0) {
      mensaje =
        "No hay suficiente stock de ese producto. Es necesario fabricar más unidades. Se actualizará en valores negativos.";
    } else {
      mensaje = "Stock actualizado, quedan " + nuevoStock + " unidades.";
    }

    await conn.query(
      "UPDATE stock SET stock = ? WHERE idProducto = ? AND talla = ?",
      [nuevoStock, params.id, talla],
    );
    return NextResponse.json({
      message: mensaje,
    });
  } catch (e) {
    return NextResponse.json(
      {
        message: e.message,
      },
      { status: 500 },
    );
  }
}
