import axios from "axios";
import { MdDelete } from "react-icons/md";

function ButtonsIcons({ idProducto }) {
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
        
      <button
        className=""
        // onClick={async (event) => {
        //   event.preventDefault();
        //   console.log(idProducto);
        //   if (confirm("¿Seguro que quieres eliminar el producto?")) {
        //     const res = await axios.delete("/api/products/" + idProducto);
        //     console.log(res);
        //   }
        // }}
      >
        <MdDelete />
        </button>
      </>
    
  );
}

export default ButtonsIcons;
