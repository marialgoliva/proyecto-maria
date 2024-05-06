"use client";
import "@/styles/global.css";
import ProductCard from "@/components/card/ProductCard";
import Spinner from "react-bootstrap/Spinner";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";

function HomePage() {
  const session = useSession();
  const { products, loading, setUser } = useCart();
  setUser(session.data?.user.email);
  return (
    <>
      {loading && (
        <div className="d-flex justify-content-center mt-5">
          <Spinner
            animation="border"
            className="m-5"
            variant="secondary"
          ></Spinner>
        </div>
      )}
      <div className="d-flex justify-content-center row gap-3">
        {products ? (
          products.map((product) => (
            <div
              key={product.idProducto}
              className="text-decoration-none col-3"
            >
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <h2>No se han encontrado ningún producto</h2>
        )}
      </div>
    </>
  );
}

export default HomePage;
