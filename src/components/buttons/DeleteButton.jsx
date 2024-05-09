"use client";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

/**
 * Componente de botón de eliminación.
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.idProducto - El ID del producto a eliminar.
 * @returns {JSX.Element} El elemento del botón de eliminación.
 */
export default function DeleteButton({ id, type }) {
  const router = useRouter();
  const { setUpdatedProduct } = useCart();

  /**
   * Maneja el evento de clic del botón de eliminación.
   * @param {Event} event - El evento de clic.
   * @returns {Promise<void>} Una promesa que se resuelve cuando la operación de eliminación se completa.
   */
  const handleDelete = async (event) => {
    event.preventDefault();

    if (confirm("¿Seguro que quieres eliminar el producto?")) {
      const res = await axios.delete("/api/products/" + id);

      if (res.status == 204) {
        setUpdatedProduct(true);
        router.refresh();
      }
    }
  };

  return (
    <>
      <button className="border-0 bg-transparent" onClick={handleDelete}>
        <MdDelete />
      </button>
    </>
  );
}
