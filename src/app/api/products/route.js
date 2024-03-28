import { conn } from "../../../../database/mysql";
import { NextResponse } from "next/server";
import { unlink } from "fs/promises";
import cloudinary from "@/libs/cloudinary";
import { processImage } from "@/libs/processImage";

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
