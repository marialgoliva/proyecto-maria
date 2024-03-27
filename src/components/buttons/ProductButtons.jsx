"use client";
import axios from "axios";
function ProductButtons({ idProducto }) {
  return (
    <div className="d-flex flex-column justify-content-center gap-2">
      <button
        className="btn border border-primary text-primary py-2 px-3 rounded"
        onClick={(event) => {
          event.preventDefault();
        }}
      >
        Editar
      </button>

      <button
        className="btn border border-danger text-danger py-2 px-3 rounded"
        onClick={async (event) => {
          event.preventDefault();
          if (confirm("¿Seguro que quieres eliminar el producto?")) {
            axios.delete("/api/products/" + idProducto);
          }
        }}
      >
        Eliminar
      </button>
    </div>
  );
}

export default ProductButtons;
