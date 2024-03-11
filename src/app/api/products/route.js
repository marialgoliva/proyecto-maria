
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
      }
    );
  }
}

export async function POST(request) {
  try {
    const { name, description, price } = await request.json();
    console.log(name, description, price);

    const result = await conn.query("INSERT INTO PRODUCTO SET ?", {
      name,
      description,
      price,
    });

    return NextResponse.json({ name, description, price, id: result.insertId });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
}