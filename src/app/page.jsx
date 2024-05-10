"use client";
import "@/styles/global.css";
import ProductCard from "@/components/card/ProductCard";
import Spinner from "react-bootstrap/Spinner";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

/**
 * Componente HomePage que muestra los productos en el carrito y un spinner si los productos están cargando.
 *
 * @returns {JSX.Element} Un fragmento de React que muestra un spinner si los productos están cargando y los productos en el carrito.
 */
function HomePage() {
  // Usamos el hook useSession para obtener la sesión del usuario
  const session = useSession();
  const { products, loading, setUser } = useCart();
  useEffect(() => {
    // Usamos el hook useCart para obtener los productos, el estado de carga y la función setUser

    // Usamos la función setUser para establecer el usuario en el contexto del carrito

    setUser(session.data?.user.email);
  }, [session, setUser]);

  // Devolvemos un fragmento de React que muestra un spinner si los productos están cargando y los productos en el carrito
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
      <div className="mtop">
        <div className="d-flex justify-content-center row gap-3">
          {products ? (
            products.map((product) => (
              <div
                key={product.idProducto}
                className="d-flex justify-content-center text-decoration-none col-xl-3 col-lg-4 col-sm-6"
              >
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <h2>No se han encontrado ningún producto</h2>
          )}
        </div>
      </div>
    </>
  );
}

export default HomePage;
