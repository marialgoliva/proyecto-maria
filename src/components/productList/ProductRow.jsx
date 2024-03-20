"use client"
import Link from "next/link";

import ButtonsIcons from "./ButtonsIcons";

function ProductRow({ product }) {
  const { imagen, descripcion, nombre, precio, color, idProducto } = product;
  return (
    <tr>
      <td>{nombre}</td>
      <td>{descripcion}</td>
      <td>{color}</td>
      <td>{precio}</td>
      <td>{imagen}</td>
      <td>{
        <>
          {/* <Link href={`products/${idProducto}`}></Link> */}
          <ButtonsIcons idProducto={idProducto}/>
        </>
        
        }</td>
    </tr>
  );
}

export default ProductRow;
