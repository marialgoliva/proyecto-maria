"use client";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

//1. Crear el contexto
export const CartContext = createContext();

//2. Crear el provider

export function CartProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [productsInCart, setProductsInCart] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products");
        const productsData = await response.json();
        setProducts(productsData);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    // Verificar si el producto ya está en el carrito
    const existingProductIndex = cart.findIndex(
      (item) => item.idProducto === product.idProducto,
    );

    if (existingProductIndex > -1) {
      // Si el producto ya está en el carrito, aumentar la cantidad

      const updatedCart = [...cart];
      const cantidadNueva = updatedCart[existingProductIndex].cantidad + 1;
      console.log(cantidadNueva);
      updatedCart[existingProductIndex].cantidad = cantidadNueva;
      setCart(updatedCart);

      console.log("Ya estaba: ", cart);
    } else if (existingProductIndex <= -1) {
      // Si el producto no está en el carrito, añadirlo con cantidad inicial de 1
      const updatedCart = [...cart];
      updatedCart.push({
        ...product,
        cantidad: 1,
      });
      setCart(updatedCart);
      console.log("No estaba: ", cart);
    }
    toast.success("Producto añadido al carrito.");
    const productsNumber = productsInCart;
    setProductsInCart(productsNumber + 1);
  };

  const removeFromCart = (productId) => {
    //si se clicka en eliminar elimina los dos
    setCart((prevCart) =>
      prevCart.filter((item) => item.idProducto !== productId),
    );
    toast.success("Item removed from cart");
    const productsNumber = productsInCart;
    setProductsInCart(productsNumber - 1); // si se elimina un producto con cantidad 2 solo se resta uno.
  };
  return (
    <CartContext.Provider
      value={{
        products,
        loading,
        cart,
        addToCart,
        removeFromCart,
        productsInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

//3. Crear use context hook
export function useCart() {
  const context = useContext(CartContext);
  return context;
}

//4. Integrar el cartprovider en el componente padre
