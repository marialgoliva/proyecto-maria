"use client";
import Link from "next/link";

const handleClickTalla = (e) => {
  console.log(e.target.value);
};

function InfoCard({ product, tallas }) {
  const { descripcion, nombre, precio, color } = product;

  return (
    <div className="rounded p-4 bg-light d-flex row justify-content-between">
      <h4 className="fw-normal">
        {nombre}{" "}
        <span className="text-secondary fs-4 fw-normal text-capitalize">
          {color}
        </span>
      </h4>
      <div className="d-flex row justify-content-end">
        <div>
          <h5 className="price text-end">{precio} €</h5>
          <p className="description text-end">{descripcion}</p>
        </div>
        <div className="d-flex row gap-3">
          <div className="d-flex justify-content-end gap-2">
            {tallas.map((talla) => {
              return (
                <button
                  key={talla}
                  value={talla}
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleClickTalla}
                >
                  {talla}
                </button>
              );
            })}
          </div>
          <Link
            href=""
            className="text-decoration-none text-secondary text-end"
          >
            <p>¿Qué talla elijo?</p>
          </Link>
        </div>
        <div className="d-flex row justify-content-end">
          {/* <select name="color" id="color" className="form-select form-select-lg mb-3 w-50">
                {colors.map((color) => {
                    return <option value={color}>{color}</option>
                })}
            </select> */}
        </div>
        <div className="d-flex row justify-content-end my-3">
          <div className="w-25">
            <h6 className="text-secondary">Cantidad</h6>
            <input type="number" className="form-control" />
          </div>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-secondary mt-5 w-75"
        style={{ height: "40px" }}
      >
        Añadir al carrito
      </button>
    </div>
  );
}

export default InfoCard;
