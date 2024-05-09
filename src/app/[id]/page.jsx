import BackButton from "@/components/buttons/BackButton";
import ImageCard from "@/components/card/ImageCard";
import InfoCard from "@/components/card/InfoCard";
import Starts from "@/components/stars";
import { getComentarios } from "@/libs/comentarios/getComentarios";
import loadProduct from "@/libs/productos/loadProduct";
import getStock from "@/libs/stock/getStock";

/**
 * Componente de página de producto que muestra detalles de un producto específico.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} props.params - Los parámetros de la ruta, incluyendo el ID del producto.
 * @returns {JSX.Element} El componente de la página de producto.
 */
async function ProductPage({ params }) {
  const stock = [];

  try {
    const product = await loadProduct(params.id);
    const comentarios = await getComentarios(params.id);
    try {
      const stockProducto = await getStock(params.id);
      if (stockProducto && stockProducto.length > 0) {
        stockProducto.map((element) => {
          stock.push({
            talla: element.talla,
            stock: element.stock,
          });
        });
      }
    } catch (e) {
      console.log(e);
    }

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
    console.log(e);
    return <h1 className="text-center">Producto no encontrado</h1>;
  }
}

export default ProductPage;
