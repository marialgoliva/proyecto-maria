import { NextResponse } from "next/server";
import { conn } from "../../../../../database/mysql";
// import cloudinary from "@/libs/cloudinary";
// import { processImage } from "@/libs/processImage";

export async function GET(request, { params }) {
  try {
    const result = await conn.query("SELECT * FROM PRODUCTO WHERE idProducto = ?", [
      params.id,
    ]);

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

export async function DELETE(request, { params }) {
  try {
    const result = await conn.query("DELETE FROM PRODUCTO WHERE idProducto = ?", [
      params.id,
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Producto no encontrado",
        },
        {
          status: 404,
        }
      );
    }

    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
    try {
        const data = await request.json();
        const result = await conn.query('UPDATE PRODUCTO SET ? WHERE idProducto = ?', [
            data,
            params.id,
        ]);

        if (result.affectedRows === 0){
            return NextResponse.json(
                {
                message: 'Producto no encontrado',
                },
                { status: 404 }
            );
        }
        const updatedProduct = await conn.query("SELECT * FROM PRODUCTO WHERE idProducto=?",[params.id]);
        
        return NextResponse.json(updatedProduct[0]);
    } catch (error) {
        return NextResponse.json(
          {
            message: error.message,
          },
          { status: 500 }
        );
      }
}