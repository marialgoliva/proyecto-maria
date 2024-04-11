import BackButton from "@/components/buttons/BackButton";
import ImageCard from "@/components/productcard/ImageCard";
import InfoCard from "@/components/productcard/InfoCard";
import loadProduct from "@/libs/loadProduct";
import axios from "axios";

const colors = ["Teja", "Crema", "Camel"];
const BASE_API_URL = process.env.BASE_URL;

async function ProductPage({ params }) {
  const tallas = [];
  try {
    const product = await loadProduct(params.id);
    const { data } = await axios.get(`${BASE_API_URL}/api/tallas/${params.id}`);
    data.map((element) => {
      tallas.push(element.talla);
    });

    return (
      <div className="d-flex justify-content-center m-5">
        <div className="d-flex w-75 gap-2">
          <BackButton />
          <ImageCard product={product} />
          <InfoCard product={product} colors={colors} tallas={tallas} />
        </div>
      </div>
    );
  } catch (e) {
    return <h1 className="text-center">Producto no encontrado</h1>;
  }
}

export default ProductPage;
