"use client";
import { createContext, useContext, useEffect, useState } from "react";

//1. Crear el contexto
export const CartContext = createContext();

//2. Crear el provider

export function CartProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products");
        const productsData = await response.json();
        setProducts(productsData);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <CartContext.Provider value={{ products, loading, cart, addToCart }}>
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
