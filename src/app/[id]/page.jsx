import BackButton from "@/components/buttons/BackButton";
import ImageCard from "@/components/card/ImageCard";
import InfoCard from "@/components/card/InfoCard";
import Starts from "@/components/stars";
import { getNombreCliente } from "@/libs/clientes/getNombreCliente";
import { getComentarios } from "@/libs/comentarios/getComentarios";
import loadProduct from "@/libs/loadProduct";
import axios from "axios";

const BASE_API_URL = process.env.BASE_URL;

async function ProductPage({ params }) {
  const stock = [];
  const comentarios = await getComentarios(params.id);

  try {
    const product = await loadProduct(params.id);
    const result = await axios.get(`${BASE_API_URL}/api/stock/${params.id}`);

    result.data.map((element) => {
      stock.push({
        talla: element.talla,
        stock: element.stock,
      });
      console.log("tallaaaa", typeof element.talla);
    });
    console.log("resuuuuulst", result.data);

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
              const data = await getNombreCliente(comentario.idCliente);
              return (
                <div
                  className="w-75 bg-body-secondary rounded p-4 m-2"
                  key={comentario.idComentario}
                >
                  <h6>{data.nombre}</h6>
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
