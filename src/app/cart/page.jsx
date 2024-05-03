"use client";
import { useCart } from "@/context/CartContext";
import ProductCart from "@/components/cart/ProductCart";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BsShop } from "react-icons/bs";
import Link from "next/link";
import { sendCart } from "@/libs/stock/checkout/sendCart";
import { checkForm } from "@/libs/utils";

function CartPage() {
  const { cart } = useCart();
  const totalPrice = cart.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0,
  );
  const router = useRouter();
  const [dataCliente, setDataCliente] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handlePay = async (cart, dataCliente) => {
    const check = checkForm(dataCliente);
    if (check.valido) {
      const requestBody = {
        cart: cart,
        dataCliente: dataCliente,
      };
      const res = await sendCart(requestBody);
      const session = await res.json();
      router.push(session.url);
    } else {
      setShowAlert(true);
      setAlertMessage(check.mensaje);
    }
  };

  const onChange = (e) => {
    setShowAlert(false);
    setAlertMessage("");
    setDataCliente({
      ...dataCliente,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-100 d-flex justify-content-center">
      {cart.length > 0 ? (
        <div className="w-75 d-flex row justify-content-center mb-5">
          <h1 className="m-3 display-6 w-75">Productos en tu carrito</h1>
          <div className="d-flex justify-content-between w-75">
            <Link
              href="/"
              className="text-decoration-none text-dark d-flex gap-2"
            >
              <BsShop />
              <p>Seguir comprando </p>
            </Link>
            <h4>Total: {totalPrice}€</h4>
          </div>

          <div className="d-flex row w-75">
            {cart?.map((product) => (
              <div key={product.idProducto}>
                <ProductCart product={product} />
              </div>
            ))}
            <div className="mt-5 mb-2">
              <h4>Datos de facturación y envío</h4>
              {showAlert && (
                <div>
                  <div class="alert alert-warning mt-2 " role="alert">
                    {alertMessage}
                  </div>
                </div>
              )}
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
                    DNI
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  name="dni"
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
          </div>

          <button
            type="button"
            class="btn btn-light w-75 mt-3"
            onClick={() => handlePay(cart, dataCliente)}
          >
            Confirmar compra
          </button>
        </div>
      ) : (
        <div className="d-flex flex-column align-items-center">
          <h1 className="ms-3 display-6">No hay productos en el carrito</h1>
          <Link
            href="/"
            className="d-flex align-items-center justify-content-center flex-column text-decoration-none m-5"
          >
            <img className="w-25" src="/storeOpen.jpg" alt="Tienda abierta" />
            <h5 className="ms-3">Volver a la tienda</h5>
          </Link>
        </div>
      )}
    </div>
  );
}

export default CartPage;
