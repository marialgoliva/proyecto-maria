import { conn } from "../../../../database/mysql";
import { NextResponse } from "next/server";
import { unlink } from "fs/promises";
import cloudinary from "@/libs/cloudinary";
import { processImage } from "@/libs/processImage";

/**
 * Controlador de ruta GET para obtener todos los productos.
 *
 * @returns {Promise<import("next/server").NextResponse>} La respuesta HTTP.
 */
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

/**
 * Controlador de ruta POST para crear un nuevo producto.
 *
 * @param {import("next/server").NextRequest} request - La solicitud HTTP.
 * @returns {Promise<import("next/server").NextResponse>} La respuesta HTTP.
 */
export async function POST(request) {
  try {
    const data = await request.formData();
    const image = data.get("imagen");
    if (!image) {
      return NextResponse.json(
        {
          message: "La imagen es requerida",
        },
        {
          status: 400,
        },
      );
    }

    const imagePath = await processImage(image);
    const res = await cloudinary.uploader.upload(imagePath);

    if (res) {
      await unlink(imagePath);
    }

    const result = await conn.query("INSERT INTO PRODUCTO SET ?", {
      nombre: data.get("nombre"),
      descripcion: data.get("descripcion"),
      categoria: data.get("categoria"),
      color: data.get("color"),
      precio: data.get("precio"),
      imagen: res.secure_url,
    });

    if (result && result.insertId) {
      console.log("result :>> ", result);
      try {
        // Ejecutar la inserción en la tabla STOCK
        await conn.query("INSERT INTO STOCK SET ?", {
          idProducto: result.insertId,
          stock: 0,
          talla: null,
        });
        console.log("Inserción en STOCK realizada con éxito.");
      } catch (error) {
        // Manejar errores de inserción en la tabla STOCK
        console.error("Error al insertar en la tabla STOCK:", error);
      }
    } else {
      console.error(
        "El objeto result no contiene la propiedad insertId o no está definido.",
      );
    }

    return NextResponse.json({
      idProducto: result.insertId,
      nombre: data.get("nombre"),
      descripcion: data.get("descripcion"),
      categoria: data.get("categoria"),
      color: data.get("color"),
      precio: data.get("precio"),
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
