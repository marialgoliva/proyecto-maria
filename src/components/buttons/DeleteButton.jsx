"use client"
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { useRouter } from 'next/navigation'

export default function DeleteButton({ idProducto }) {
  const router = useRouter();
  
  const handleDelete  = async (event) => {

    event.preventDefault();

    if (confirm("¿Seguro que quieres eliminar el producto?")) {

      const res = await axios.delete("/api/products/" + idProducto);

      if (res.status==204) {
        router.refresh();
      }
      
    }
  }
  return (
    <>
        <button className="border-0 bg-transparent" onClick={handleDelete}>
            <MdDelete />
        </button>
    </>
    
  );
}

