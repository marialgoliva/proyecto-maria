"use client"
import { MdEdit } from "react-icons/md";
import { useRouter } from 'next/navigation';

export default function EditButton({ idProducto }) {
  const router = useRouter();
  
  const handleEditClick = () => {
      router.push('/admin/products/edit/'+idProducto);
    };
    
  return (
    <>
        <button idProducto={idProducto} onClick={handleEditClick} className="border-0 bg-transparent">
          <MdEdit />
        </button>
    </>
    
  );

}