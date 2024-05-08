"use client";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function DeleteButton({ idProducto }) {
  const router = useRouter();
  const { setUpdatedProduct } = useCart();
  const handleDelete = async (event) => {
    event.preventDefault();

    if (confirm("¿Seguro que quieres eliminar el producto?")) {
      console.log("idProducto :>> ", idProducto);
      const res = await axios.delete("/api/products/" + idProducto);

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
