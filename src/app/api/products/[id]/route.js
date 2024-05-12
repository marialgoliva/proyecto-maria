/**
 * Importa NextResponse de next/server, conn de la base de datos MySQL,
 * cloudinary para la gestión de imágenes, processImage para el procesamiento de imágenes
 * y unlink para eliminar archivos.
 */
import { NextResponse } from "next/server";
import { conn } from "../../../../../database/mysql";
import cloudinary from "@/libs/cloudinary";
import { processImage } from "@/libs/processImage";
import { unlink } from "fs/promises";

/**
 * Controlador de ruta GET para obtener un producto específico.
 *
 * @param {import("next/server").NextRequest} request - La solicitud HTTP.
 * @param {Object} params - Los parámetros de la ruta.
 * @returns {Promise<import("next/server").NextResponse>} La respuesta HTTP.
 */
export async function GET(request, { params }) {
  try {
    const result = await conn.query(
      "SELECT * FROM PRODUCTO WHERE idProducto = ?",
      [params.id],
    );

    if (result.length === 0) {
      return NextResponse.json(
        {
          message: "Producto no encontrado",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 },
    );
  }
}

/**
 * Controlador de ruta DELETE para eliminar un producto específico.
 *
 * @param {import("next/server").NextRequest} request - La solicitud HTTP.
 * @param {Object} params - Los parámetros de la ruta.
 * @returns {Promise<import("next/server").NextResponse>} La respuesta HTTP.
 */
export async function DELETE(request, { params }) {
  try {
    const result = await conn.query(
      "DELETE FROM PRODUCTO WHERE idProducto = ?",
      [params.id],
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Producto no encontrado",
        },
        {
          status: 404,
        },
      );
    }

    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 },
    );
  }
}

/**
 * Controlador de ruta PUT para actualizar un producto específico.
 *
 * @param {import("next/server").NextRequest} request - La solicitud HTTP.
 * @param {Object} params - Los parámetros de la ruta.
 * @returns {Promise<import("next/server").NextResponse>} La respuesta HTTP.
 */
export async function PUT(request, { params }) {
  try {
    const data = await request.formData();
    const image = data.get("imagen");
    const updatedData = {
      nombre: data.get("nombre"),
      descripcion: data.get("descripcion"),
      categoria: data.get("categoria"),
      color: data.get("color"),
      precio: data.get("precio"),
    };

    if (image) {
      const imagePath = await processImage(image);
      const res = await cloudinary.uploader.upload(imagePath);
      updatedData.imagen = res.secure_url;

      if (res) {
        await unlink(imagePath);
      }
    }
    const result = await conn.query(
      "UPDATE PRODUCTO SET ? WHERE idProducto = ?",
      [updatedData, params.id],
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Producto no encontrado",
        },
        { status: 404 },
      );
    }
    const updatedProduct = await conn.query(
      "SELECT * FROM PRODUCTO WHERE idProducto=?",
      [params.id],
    );

    return NextResponse.json(updatedProduct[0]);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 },
    );
  }
}
