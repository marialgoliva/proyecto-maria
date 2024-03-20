"use client"
import { FaEye } from "react-icons/fa";
import { useRouter } from 'next/navigation';

export default function ViewButton({ idProducto }) {
  const router = useRouter();
  
  const handleViewClick = () => {
      router.push(`/admin/products/${idProducto}`);
    };
    
  return (
    <>
        <button idProducto={idProducto} onClick={handleViewClick} className="border-0 bg-transparent">
            <FaEye />
        </button>
    </>
    
  );

}