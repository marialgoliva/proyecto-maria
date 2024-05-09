import ProductCardAdmin from "@/components/card/ProductCardAdmin";
import loadProduct from "@/libs/productos/loadProduct";

/**
 * Componente de página de producto que muestra los detalles de un producto específico.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} props.params - Los parámetros de la ruta, incluyendo el ID del producto.
 * @returns {JSX.Element} El componente de la página de producto.
 */
async function ProductPage({ params }) {
  // Cargamos el producto usando el ID proporcionado en los parámetros de la ruta
  const product = await loadProduct(params.id);

  // Devolvemos el componente de la página de producto
  return (
    <div className="d-flex justify-content-center">
      <ProductCardAdmin product={product} />
    </div>
  );
}

export default ProductPage;
