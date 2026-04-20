import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState(() =>
    JSON.parse(localStorage.getItem("carrito") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarItem = (item) => {
    setCarrito((prev) => {
      const idx = prev.findIndex(
        (c) => c.id === item.id && c.variante_id === item.variante_id
      );
      if (idx >= 0) {
        const nuevo = [...prev];
        nuevo[idx] = { ...nuevo[idx], cantidad: nuevo[idx].cantidad + item.cantidad };
        return nuevo;
      }
      return [...prev, item];
    });
  };

  const actualizarCantidad = (index, cantidad) => {
    setCarrito((prev) => {
      const nuevo = [...prev];
      if (cantidad <= 0) nuevo.splice(index, 1);
      else nuevo[index] = { ...nuevo[index], cantidad };
      return nuevo;
    });
  };

  const limpiarCarrito = () => setCarrito([]);

  const totalItems = carrito.reduce((acc, i) => acc + i.cantidad, 0);
  const subtotal = carrito.reduce((acc, i) => acc + i.precio * i.cantidad, 0);

  return (
    <CartContext.Provider value={{ carrito, agregarItem, actualizarCantidad, limpiarCarrito, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
