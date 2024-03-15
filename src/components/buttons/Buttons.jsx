import axios from "axios";
function Buttons({ idProducto }) {
  return (
    <div className="d-flex flex-column justify-content-center gap-2">
      <button
        className="btn border border-primary text-primary py-2 px-3 rounded"
        onClick={(event) => {
          event.preventDefault();
          console.log(idProducto);
        }}
      >
        Editar
      </button>

      <button
        className="btn border border-danger text-danger py-2 px-3 rounded"
        onClick={async (event) => {
          event.preventDefault();
          console.log(idProducto);
          if (confirm("¿Seguro que quieres eliminar el producto?")) {
            const res = await axios.delete("/api/products/" + idProducto);
            console.log(res);
          }
        }}
      >
        Eliminar
      </button>
    </div>
  );
}

export default Buttons;
