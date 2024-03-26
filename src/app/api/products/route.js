import { conn } from "../../../../database/mysql";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const results = await conn.query("SELECT * FROM PRODUCTO");
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request) {
  try {
    const { categoria, nombre, descripcion, color, precio } =
      await request.json();
    const result = await conn.query("INSERT INTO PRODUCTO SET ?", {
      categoria,
      nombre,
      descripcion,
      color,
      precio,
    });
    console.log(result);

    return NextResponse.json({
      idProducto: result.insertId,
      categoria,
      nombre,
      descripcion,
      color,
      precio,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      },
    );
  }
}
