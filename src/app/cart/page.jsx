"use client";
import { useCart } from "@/components/cart/CartContext";
import ProductCart from "@/components/cart/ProductCart";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

function CartPage() {
  const { cart } = useCart();
  const totalPrice = cart.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0,
  );
  const router = useRouter();
  console.log(cart);
  return (
    <div className="w-100 d-flex justify-content-center">
      <div className="w-75 d-flex row justify-content-center">
        <h1 className="ms-3 display-6">Productos en tu carrito</h1>
        <div className="d-flex justify-content-end">
          <h5 className="me-5">Total: {totalPrice}€</h5>
        </div>

        <div className="d-flex row">
          {cart ? (
            cart?.map((product) => (
              <div key={product.idProducto}>
                <ProductCart product={product} />
              </div>
            ))
          ) : (
            <h2>No se han encontrado ningún producto</h2>
          )}
        </div>
        <button
          type="button"
          class="btn btn-light w-75 mt-3"
          onClick={() => router.push("/confirmar")}
        >
          Confirmar compra
        </button>
      </div>
    </div>
  );
}

export default CartPage;
