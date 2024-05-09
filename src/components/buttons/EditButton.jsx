"use client";
import { MdEdit } from "react-icons/md";
import { useRouter } from "next/navigation";

/**
 * Componente de botón de edición.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.id - El ID del elemento a editar.
 * @param {string} props.type - El tipo de elemento a editar (productos o pedidos).
 * @returns {JSX.Element} El elemento del botón de edición.
 */
export default function EditButton({ id, type }) {
  const router = useRouter();

  /**
   * Maneja el evento de clic en el botón de edición.
   */
  const handleEditClick = () => {
    if (type === "productos") {
      router.push("/admin/products/edit/" + id);
    } else if (type === "pedidos") {
      router.push("/admin/pedidos/edit/" + id);
    }
  };

  return (
    <>
      <button
        id={id}
        onClick={handleEditClick}
        className="border-0 bg-transparent"
      >
        <MdEdit />
      </button>
    </>
  );
}
