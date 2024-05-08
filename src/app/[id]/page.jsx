import BackButton from "@/components/buttons/BackButton";
import ImageCard from "@/components/card/ImageCard";
import InfoCard from "@/components/card/InfoCard";
import Starts from "@/components/stars";
import { getNombreCliente } from "@/libs/clientes/getNombreCliente";
import { getComentarios } from "@/libs/comentarios/getComentarios";
import loadProduct from "@/libs/productos/loadProduct";
import getStock from "@/libs/stock/getStock";

async function ProductPage({ params }) {
  const stock = [];

  try {
    const product = await loadProduct(params.id);
    const stockProducto = await getStock(params.id);
    const comentarios = await getComentarios(params.id);

    stockProducto.map((element) => {
      stock.push({
        talla: element.talla,
        stock: element.stock,
      });
    });

    return (
      <div>
        <div className="d-flex justify-content-center m-5">
          <div className="d-flex w-75 gap-2">
            <BackButton />
            <ImageCard product={product} />
            <InfoCard product={product} stock={stock} />
          </div>
        </div>
        {comentarios && (
          <div className="d-flex row justify-content-center align-items-center m-5">
            {comentarios.map(async (comentario) => {
              // const data = await getNombreCliente(comentario.idCliente);

              return (
                <div
                  className="w-75 rounded p-4 m-2 ms-5"
                  key={comentario.idComentario}
                >
                  <h6>{comentario.cliente}</h6>
                  <Starts puntuacion={comentario.puntuacion} />
                  <p> {comentario.texto} </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  } catch (e) {
    return <h1 className="text-center">Producto no encontrado</h1>;
  }
}

export default ProductPage;
