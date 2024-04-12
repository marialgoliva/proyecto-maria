import ProductCard from "@/components/card/ProductCard";
import loadProduct from "@/libs/loadProduct";

async function ProductPage({ params }) {
  const product = await loadProduct(params.id);
  return (
    <div className="d-flex justify-content-center">
      <ProductCard product={product} editable />
    </div>
  );
}

export default ProductPage;
