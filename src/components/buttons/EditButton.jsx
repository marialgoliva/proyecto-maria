"use client";
import { MdEdit } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function EditButton({ id, type }) {
  const router = useRouter();

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
