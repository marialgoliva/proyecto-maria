"use client";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { useRouter } from "next/navigation";

/**
 * Componente botones de iconos
 *
 * @component
 * @param {Object} props Propiedades del componente
 * @param {string} props.idProducto ID del producto
 * @returns {Object} Componente botones de iconos
 */
function ButtonsIcons({ idProducto }) {
  const router = useRouter();
  return (
    <>
      <button className="border-0 bg-transparent">
        <FaEye />
      </button>
      <button
        className="border-0 bg-transparent"
        onClick={async (event) => {
          event.preventDefault();
          if (confirm("¿Seguro que quieres eliminar el producto?")) {
            const res = await axios.delete("/api/products/" + idProducto);
            if (res.status == 204) {
              router.push("/admin/products");
            }
          }
        }}
      >
        <MdDelete />
      </button>
    </>
  );
}

export default ButtonsIcons;
