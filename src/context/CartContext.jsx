"use client";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

//1. Crear el contexto
export const CartContext = createContext();

//2. Crear el provider

export function CartProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [updatedProduct, setUpdatedProduct] = useState(false);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [contador, setContador] = useState(0);
  const storedProducts =
    typeof window !== "undefined" ? localStorage.getItem("products") : ""; //Evitamos el mensaje de error cuando no estamos en el entorno del navegador

  //Obtenemos los productos de la base de datos
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
      fetchProducts();
    } else {
      setProducts(JSON.parse(storedProducts));
      setLoading(false);
    }
  }, [storedProducts, updatedProduct]);

  //Guardamos los productos en el localStorage
  useEffect(() => {
    if (products.length !== 0) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);

  //Obtenemos el carrito almacenado en el localStorage, y los seteamos en el carrito
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    // const storedProductsInCart = localStorage.getItem("productsInCart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
      // setContador(JSON.parse(storedProductsInCart));
    }
  }, [user]);

  //Obtenemos los productos del carrito los almacenamos en el localStorage
  //Actualizamos el contador
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));

      // localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
    } else {
      //Si el carrito está vacío lo eliminamos del localStorage
      localStorage.removeItem("cart");
    }
    setContador(cart.reduce((total, item) => total + item.cantidad, 0));
  }, [cart, user]);

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
    // const productsNumber = productsInCart;
    // setContador(productsNumber + 1);
  };
  const removeFromCart = (productId) => {
    // Verificar si el producto ya está en el carrito
    const updatedCart = cart
      .map((item) => {
        if (item.idProducto === productId) {
          // Si el ID coincide, verifica si la cantidad es mayor que 1
          if (item.cantidad > 1) {
            // Si la cantidad es mayor que la cantidad a reducir, reduce la cantidad en 1
            return {
              ...item,
              cantidad: item.cantidad - 1,
            };
          } else {
            // Si la cantidad es igual o menor que la cantidad a reducir, no lo incluyas en el nuevo array
            return null; // Devuelve null para eliminar el producto del carrito
          }
        }
        // Si el ID no coincide, incluye el producto en el nuevo array sin modificar
        return item;
      })
      .filter(Boolean); // Filtra los elementos nulos (productos eliminados)

    setCart(updatedCart);

    toast.success("Item removed from cart");
    // const productsNumber = productsInCart;
    // setContador(productsNumber - 1); // si se elimina un producto con cantidad 2 solo se resta uno.
  };
  const deleteCart = () => {
    setCart([]); // Vaciamos el carrito
    localStorage.removeItem("cart"); //Lo eliminamos del localStorage
    setContador(0); // Reseteamos el contador de productos en el carrito
  };
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

//3. Crear use context hook
export function useCart() {
  const context = useContext(CartContext);
  return context;
}
