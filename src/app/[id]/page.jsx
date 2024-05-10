"use client";
import { useState, useEffect } from "react";
import BackButton from "@/components/buttons/BackButton";
import ImageCard from "@/components/card/ImageCard";
import InfoCard from "@/components/card/InfoCard";
import Starts from "@/components/stars";
import { getComentarios } from "@/libs/comentarios/getComentarios";
import loadProduct from "@/libs/productos/loadProduct";
import getStock from "@/libs/stock/getStock";
import { Spinner } from "react-bootstrap";

function ProductPage({ params }) {
  const [product, setProduct] = useState(null);
  const [comentarios, setComentarios] = useState(null);
  const [stock, setStock] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (params.id) {
        try {
          const productData = await loadProduct(params.id);
          setProduct(productData);
          const comentariosData = await getComentarios(params.id);
          setComentarios(comentariosData);
          const stockData = await getStock(params.id);
          if (stockData && stockData.length > 0) {
            const stockArray = stockData.map((element) => ({
              talla: element.talla,
              stock: element.stock,
            }));
            setStock(stockArray);
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
    fetchData();
  }, [params]);

  if (!product) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" className="m-5" variant="secondary" />
      </div>
    );
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
          {comentarios.map((comentario) => (
            <div
              className="w-75 rounded p-4 m-2 ms-5"
              key={comentario.idComentario}
            >
              <h6>{comentario.cliente}</h6>
              <Starts puntuacion={comentario.puntuacion} />
              <p>{comentario.texto}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductPage;
