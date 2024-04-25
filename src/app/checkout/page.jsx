"use client";
import { useCart } from "@/components/cart/CartContext";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(`${process.env.STRIPE_PUBLIC_KEY}`);

const handleClick = async (cart) => {
  const stripe = await stripePromise;
  const response = await fetch("/api/checkout", {
    method: "POST",
    body: JSON.stringify({ cart }),
  });
  console.log(response);
  const session = await response.json();
  // Redirecciona al cliente a la página de pago de Stripe
  const result = await stripe.redirectToCheckout({ sessionId: session.id });
  if (result.error) {
    // Maneja el error
    console.error(result.error.message);
  }
};

function CheckoutPage() {
  const { cart } = useCart();
  return (
    <div>
      <button onClick={() => handleClick(cart)}>Pagar</button>
      <h1>checkout</h1>
    </div>
  );
}

export default CheckoutPage;
