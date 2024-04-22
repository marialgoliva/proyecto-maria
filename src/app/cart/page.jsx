"use client";
import { useCart } from "@/components/cart/CartContext";
import Cart from "@/components/cart/Cart";
import React from "react";

function CartPage() {
  const { cart } = useCart();
  const totalPrice = cart.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0,
  );
  console.log(cart);
  return (
    <>
      <h1>Productos en tu carrito</h1>
      <h2>Total: {totalPrice}€</h2>
      <div className="flex row">
        {cart ? (
          cart?.map((product) => (
            <div
              key={product.idProducto}
              className="text-decoration-none col-3"
            >
              <Cart product={product} />
            </div>
          ))
        ) : (
          <h2>No se han encontrado ningún producto</h2>
        )}
      </div>
    </>
  );
}

export default CartPage;
