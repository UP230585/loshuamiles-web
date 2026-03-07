'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

// Fuente única de verdad para los precios de toda la app
export const PRODUCTOS_DATA = [
  { id: 1, nombre: "Asadero tipo Oaxaca", precio: 170, precioLocal: 130, imagen: "https://images.unsplash.com/photo-1559561853-08451507cbe7?q=80&w=800" },
  { id: 2, nombre: "Fresco", precio: 160, precioLocal: 125, imagen: "https://images.unsplash.com/photo-1626967739436-cc80924c502b?q=80&w=800" },
  { id: 3, nombre: "Añejo", precio: 180, precioLocal: 140, imagen: "https://images.unsplash.com/photo-1452195100486-9cc805987862?q=80&w=800" },
  { id: 4, nombre: "Panela", precio: 160, precioLocal: 125, imagen: "https://images.unsplash.com/photo-1634484307049-923f04494f31?q=80&w=800" },
  { id: 5, nombre: "Requesón", precio: 100, precioLocal: 80, imagen: "https://images.unsplash.com/photo-1634484307049-923f04494f31?q=80&w=800" },
  { 
    id: 6, 
    nombre: "Yogurt Artesanal", 
    precio: 60, 
    precioLocal: 45, 
    imagen: "https://images.unsplash.com/photo-1634484307049-923f04494f31?q=80&w=800",
    sabores: ["Fresa", "Nuez", "Manzana", "Piña-Coco", "Cereal", "Frambuesa", "Zarzamora"] 
  }
];

interface CartItem {
  id: number;
  nombre: string;
  cantidad: number;
  imagen: string;
  pesoLabel: string;
  multiplicador: number; 
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (id: number, pesoLabel: string, multiplicador: number) => void;
  removeFromCart: (id: number, peso: string) => void;
  updateQuantity: (id: number, peso: string, delta: number) => void;
  clearCart: () => void;
  isLocal: boolean;
  toggleLocal: (code: string) => void;
  getPrecioActual: (id: number) => number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLocal, setIsLocal] = useState(false);

  const getPrecioActual = (id: number) => {
    const p = PRODUCTOS_DATA.find(q => q.id === id);
    if (!p) return 0;
    return isLocal ? p.precioLocal : p.precio;
  };

  const addToCart = (id: number, pesoLabel: string, multiplicador: number) => {
    const producto = PRODUCTOS_DATA.find(p => p.id === id);
    if (!producto) return;

    setCart((prev) => {
      const exists = prev.find(item => item.id === id && item.pesoLabel === pesoLabel);
      if (exists) {
        return prev.map(item => (item.id === id && item.pesoLabel === pesoLabel) 
          ? { ...item, cantidad: item.cantidad + 1 } : item);
      }
      return [...prev, { 
        id, 
        nombre: producto.nombre, 
        imagen: producto.imagen, 
        cantidad: 1, 
        pesoLabel, 
        multiplicador 
      }];
    });
  };

  const toggleLocal = (code: string) => {
    if (code.toUpperCase() === 'MONTESA') {
      setIsLocal(true);
    } else {
      setIsLocal(false);
    }
  };

  const removeFromCart = (id: number, peso: string) => {
    setCart(prev => prev.filter(i => !(i.id === id && i.pesoLabel === peso)));
  };

  const updateQuantity = (id: number, peso: string, delta: number) => {
    setCart(prev => prev.map(i => (i.id === id && i.pesoLabel === peso) 
      ? { ...i, cantidad: Math.max(1, i.cantidad + delta) } : i));
  };

  const clearCart = () => setCart([]);
  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <CartContext.Provider value={{ 
      cart, addToCart, removeFromCart, updateQuantity, clearCart, 
      isLocal, toggleLocal, getPrecioActual, totalItems 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de un CartProvider");
  return context;
};