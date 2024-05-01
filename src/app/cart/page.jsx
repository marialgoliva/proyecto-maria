"use client";
import { useCart } from "@/components/cart/CartContext";
import ProductCart from "@/components/cart/ProductCart";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function CartPage() {
  const { cart } = useCart();
  const totalPrice = cart.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0,
  );
  const router = useRouter();
  const [dataCliente, setDataCliente] = useState({});
  console.log(dataCliente);

  const handlePay = async (cart, dataCliente) => {
    const requestBody = {
      cart: cart,
      dataCliente: dataCliente,
    };
    const res = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const session = await res.json();
    router.push(session.url);
  };

  const onChange = (e) => {
    setDataCliente({
      ...dataCliente,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-100 d-flex justify-content-center">
      <div className="w-75 d-flex row justify-content-center">
        <h1 className="ms-3 display-6">Productos en tu carrito</h1>
        <div className="d-flex justify-content-end">
          <h5 className="me-5">Total: {totalPrice}€</h5>
        </div>

        <div className="d-flex row w-75">
          {cart ? (
            cart?.map((product) => (
              <div key={product.idProducto}>
                <ProductCart product={product} />
              </div>
            ))
          ) : (
            <h2>No se han encontrado ningún producto</h2>
          )}
          <h4>Datos de facturación y envío</h4>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                Nombre completo
              </span>
            </div>
            <input
              type="text"
              class="form-control"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              name="nombre"
              onChange={onChange}
            />
          </div>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                Calle y número
              </span>
            </div>
            <input
              type="text"
              class="form-control"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              name="calle"
              onChange={onChange}
            />
          </div>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                CP
              </span>
            </div>
            <input
              type="text"
              class="form-control"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              name="cp"
              onChange={onChange}
            />
          </div>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                Ciudad
              </span>
            </div>
            <input
              type="text"
              class="form-control"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              name="ciudad"
              onChange={onChange}
            />
          </div>
        </div>

        <button
          type="button"
          class="btn btn-light w-75 mt-3"
          onClick={() => handlePay(cart, dataCliente)}
        >
          Confirmar compra
        </button>
      </div>
    </div>
  );
}

export default CartPage;
