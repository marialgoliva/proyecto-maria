"use client"
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { useRouter } from 'next/navigation'

function ButtonsIcons({ idProducto }) {
  const router = useRouter();
  return (
    <>
      {/* <button
        className="btn border border-primary text-primary py-2 px-3 rounded"
        onClick={(event) => {
          event.preventDefault();
          console.log(idProducto);
        }}
      >
        Editar
      </button> */}
      <button className="border-0 bg-transparent">
      <FaEye />
      </button>
      <button className="border-0 bg-transparent"
        onClick={async (event) => {
          event.preventDefault();
          console.log(idProducto);
          if (confirm("¿Seguro que quieres eliminar el producto?")) {
            const res = await axios.delete("/api/products/" + idProducto);
            if (res.status==204) {
              router.push('/admin/products')
            }
            console.log(res);
          }
        }}
      >
        <MdDelete />
        </button>
      </>
    
  );
}

export default ButtonsIcons;
