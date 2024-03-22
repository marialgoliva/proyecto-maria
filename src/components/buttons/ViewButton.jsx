"use client"
import { FaEye } from "react-icons/fa";
import { useRouter } from 'next/navigation';

export default function ViewButton({ id, type }) {
  const router = useRouter();
  
  const handleViewClick = () => {
    if (type === 'pedidos'){
      router.push(`/admin/pedidos/${id}`);
    } else if (type === 'productos') {
      router.push(`/admin/products/${id}`);
    }
      
    };
    
  return (
    <>
        <button id={id} onClick={handleViewClick} className="border-0 bg-transparent">
            <FaEye />
        </button>
    </>
    
  );

}