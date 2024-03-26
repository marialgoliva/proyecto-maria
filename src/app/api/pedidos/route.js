import { conn } from "../../../../database/mysql";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const results = await conn.query("SELECT * FROM PEDIDO");
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
    const {
      idCliente,
      fechaPedido,
      fechaEntrega,
      estado,
      tipoPago,
      importeTotal,
    } = await request.json();
    const result = await conn.query("INSERT INTO PEDIDO SET ?", {
      idCliente,
      fechaPedido,
      fechaEntrega,
      estado,
      tipoPago,
      importeTotal,
    });
    console.log(result);

    return NextResponse.json({
      idPedido: result.insertId,
      idCliente,
      fechaPedido,
      fechaEntrega,
      estado,
      tipoPago,
      importeTotal,
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
