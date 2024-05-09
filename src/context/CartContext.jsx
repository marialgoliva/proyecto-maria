/**
 * Archivo: CartContext.jsx
 * Descripción: Este archivo contiene la implementación del contexto y el proveedor del carrito de compras.
 * Proporciona funciones y estados relacionados con la gestión de productos y el carrito.
 */

"use client";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

//Crear el contexto
export const CartContext = createContext();

//Crear el provider
/**
 * Función que se encarga de manejar el estado de los productos y el carrito
 * @param {Object} children - Componentes hijos
 * @returns {Object} - Componente Provider
 * @example
 * return (
 * <CartProvider>
 * <App />
 * </CartProvider>
 * )
 *
 */
export function CartProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [updatedProduct, setUpdatedProduct] = useState(false);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [contador, setContador] = useState(0);
  const storedProducts =
    typeof window !== "undefined" ? localStorage.getItem("products") : ""; //Evitar el mensaje de error cuando no  se esta en el entorno del navegador

  //Obtener los productos de la base de datos
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
    if (!storedProducts || updatedProduct) {
      localStorage.removeItem("products");
      fetchProducts();
    } else {
      setProducts(JSON.parse(storedProducts));
      setLoading(false);
    }
  }, [storedProducts, updatedProduct]);

  //Guardar los productos en el localStorage
  useEffect(() => {
    if (products.length !== 0) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);

  //Obtener el carrito almacenado en el localStorage, y setearlo en el estado
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, [user]);

  //Obtener los productos del carrito los almacenamos en el localStorage
  //Actualizar el contador
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      //Si el carrito está vacío se elimina del localStorage
      localStorage.removeItem("cart");
    }
    setContador(cart.reduce((total, item) => total + item.cantidad, 0));
  }, [cart, user]);

  /**
   * Función para añadir un producto al carrito
   * @param {Object} product - Producto a añadir
   */
  const addToCart = (product) => {
    console.log("producto que vamos a añadir en el carrito", product);
    // Verificar si el producto ya está en el carrito
    const existingProductIndex = cart.findIndex(
      (item) =>
        item.idProducto === product.idProducto && item.talla === product.talla,
    );

    if (existingProductIndex > -1) {
      // Si el producto ya está en el carrito, aumentar la cantidad
      const updatedCart = [...cart];
      const cantidadNueva =
        updatedCart[existingProductIndex].cantidad + product.cantidad;
      updatedCart[existingProductIndex].cantidad = cantidadNueva;
      setCart(updatedCart);
    } else if (existingProductIndex <= -1) {
      // Si el producto no está en el carrito, añadirlo con cantidad inicial de 1
      const updatedCart = [...cart];
      updatedCart.push({
        ...product,
        cantidad: product.cantidad ? product.cantidad : 1,
      });
      setCart(updatedCart);
    }
    toast.success("Producto añadido al carrito.");
  };

  /**
   * Función para eliminar un producto del carrito
   * @param {string} productId - ID del producto a eliminar
   */
  const removeFromCart = (productId) => {
    // Verificar si el producto ya está en el carrito
    const updatedCart = cart
      .map((item) => {
        if (item.idProducto === productId) {
          if (item.cantidad > 1) {
            return {
              ...item,
              cantidad: item.cantidad - 1,
            };
          } else {
            return null;
          }
        }
        return item;
      })
      .filter(Boolean); // Filtra los elementos nulos (productos eliminados)

    setCart(updatedCart);

    toast.success("Item removed from cart");
  };

  /**
   * Función para vaciar el carrito
   */
  const deleteCart = () => {
    setCart([]); // Vaciar el carrito
    localStorage.removeItem("cart"); //Eliminarlo del localStorage
    setContador(0); // Resetear el contador de productos en el carrito
  };

  /**
   * Función para aumentar la cantidad de un producto en el carrito
   * @param {Object} product - Producto al que se le aumentará la cantidad
   */
  const addQuantity = (product) => {
    const existingProductIndex = cart.findIndex(
      (item) =>
        item.idProducto === product.idProducto && item.talla === product.talla,
    );
    const updatedCart = [...cart];
    const cantidadNueva = updatedCart[existingProductIndex].cantidad + 1;
    updatedCart[existingProductIndex].cantidad = cantidadNueva;
    setCart(updatedCart);
  };

  /**
   * Función para reducir la cantidad de un producto en el carrito
   * @param {Object} product - Producto al que se le reducirá la cantidad
   */
  const reduceQuantity = (product) => {
    const existingProductIndex = cart.findIndex(
      (item) =>
        item.idProducto === product.idProducto && item.talla === product.talla,
    );
    if (product.cantidad === 1) {
      removeFromCart(product.idProducto);
    } else {
      const updatedCart = [...cart];
      const cantidadNueva = updatedCart[existingProductIndex].cantidad - 1;
      updatedCart[existingProductIndex].cantidad = cantidadNueva;
      setCart(updatedCart);
    }
  };

  return (
    <CartContext.Provider
      value={{
        products,
        loading,
        cart,
        addToCart,
        removeFromCart,
        contador,
        deleteCart,
        addQuantity,
        reduceQuantity,
        setUser,
        setUpdatedProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

//Crear use context hook
export function useCart() {
  const context = useContext(CartContext);
  return context;
}
