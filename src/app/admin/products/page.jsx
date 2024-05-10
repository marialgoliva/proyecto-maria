"use client";
import "@/styles/global.css";
import ProductList from "@/components/lists/ProductList";
import BackButton from "@/components/buttons/BackButton";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import Spinner from "react-bootstrap/Spinner";

/**
 * Componente de página de productos que muestra una lista de productos.
 *
 * @returns {JSX.Element} El componente de la página de productos.
 */
function ProductsPage() {
  const { data } = useSession();
  const { products, setUpdatedProduct } = useCart();
  if (data?.user) {
    if (data?.user?.role === "admin") {
      if (products.length === 0)
        return (
          <div className="d-flex justify-content-center mt-5 mtop">
            <Spinner
              animation="border"
              className="m-5"
              variant="secondary"
            ></Spinner>
          </div>
        );
      setUpdatedProduct(false);
      return (
        <div className="d-flex row mtop">
          <div className="ms-5 mt-2">
            <BackButton />
          </div>
          <ProductList products={products} />
        </div>
      );
    } else {
      return (
        <div className="w-100 d-flex justify-content-center">
          <h1>🚫 Acceso no autorizado 🚫</h1>
        </div>
      );
    }
  } else {
    return (
      <div className="w-100 d-flex justify-content-center mtop">
        <Spinner
          animation="border"
          className="m-5"
          variant="secondary"
        ></Spinner>
      </div>
    );
  }
}

export default ProductsPage;
