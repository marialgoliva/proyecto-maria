"use client";
import ProductCard from "@/components/card/ProductCard";
import "@/styles/global.css";
// import Link from "next/link";
import { useCart } from "@/components/cart/CartContext";
import Spinner from "react-bootstrap/Spinner";

function HomePage() {
  const { products, loading } = useCart();

  return (
    <>
      {loading && (
        <Spinner animation="border" role="status" className="m-5">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      <div className="flex row">
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
