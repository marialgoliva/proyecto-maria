"use client";
import { FaEye } from "react-icons/fa";
import { useRouter } from "next/navigation";

/**
 * Componente de botón de vista.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.id - El ID del elemento.
 * @param {string} props.type - El tipo de elemento.
 * @returns {JSX.Element} El elemento del botón de vista.
 */
export default function ViewButton({ id, type }) {
  const router = useRouter();

  /**
   * Maneja el evento de clic en el botón de vista.
   */
  const handleViewClick = () => {
    if (type === "pedidos") {
      router.push(`/admin/pedidos/${id}`);
    } else if (type === "productos") {
      router.push(`/admin/products/${id}`);
    }
  };

  return (
    <>
      <button
        id={id}
        onClick={handleViewClick}
        className="border-0 bg-transparent"
      >
        <FaEye />
      </button>
    </>
  );
}
