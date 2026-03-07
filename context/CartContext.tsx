'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

export const PRODUCTOS_DATA = [
  { 
    id: 1, 
    nombre: "Asadero tipo Oaxaca", 
    precio: 170, 
    precioLocal: 130, 
    imagen: "/productos/asadero/principal.jpg",
    imagenesGaleria: ["/productos/asadero/principal.jpg", "/productos/asadero/foto1.jpg"],
    descripcionGourmet: "Nuestro queso estrella. Elaborado artesanalmente con leche fresca del día, logrando una elasticidad perfecta y un sabor cremoso incomparable."
  },
  { 
    id: 2, 
    nombre: "Fresco", 
    precio: 160, 
    precioLocal: 125, 
    imagen: "/productos/fresco/principal.jpg",
    imagenesGaleria: ["/productos/fresco/principal.jpg", "/productos/fresco/foto1.jpg"],
    descripcionGourmet: "Textura suave y sabor delicado. El compañero ideal para tus platillos mexicanos tradicionales."
  },
  { 
    id: 3, 
    nombre: "Añejo", 
    precio: 180, 
    precioLocal: 140, 
    imagen: "/productos/anejo/principal.jpg",
    imagenesGaleria: ["/productos/anejo/principal.jpg", "/productos/anejo/foto1.jpg", "/productos/anejo/foto2.jpg", "/productos/anejo/foto3.jpg", "/productos/anejo/foto4.jpg", "/productos/anejo/foto5.jpg", "/productos/anejo/foto6.jpg", "/productos/anejo/foto7.jpg"],
    descripcionGourmet: "Sabor intenso y textura firme. Un queso con carácter, ideal para maridar o desmoronar sobre tus platillos favoritos."
  },
  { 
    id: 4, 
    nombre: "Panela", 
    precio: 160, 
    precioLocal: 125, 
    imagen: "/productos/panela/principal.jpg",
    imagenesGaleria: ["/productos/panela/principal.jpg", "/productos/panela/foto1.jpg", "/productos/panela/foto2.jpg", "/productos/panela/foto3.jpg"],
    descripcionGourmet: "Ligero y fresco. Perfecto para asar o disfrutar en ensaladas por su bajo contenido en grasa."
  },
  { 
    id: 5, 
    nombre: "Requesón", 
    precio: 100, 
    precioLocal: 80, 
    imagen: "/productos/requeson/principal.jpg",
    imagenesGaleria: ["/productos/requeson/principal.jpg", "/productos/requeson/foto1.jpg"],
    descripcionGourmet: "Crema de queso suave y nutritiva. Elaborado con los estándares más altos de frescura."
  },
  { 
    id: 6, 
    nombre: "Yogurt Artesanal", 
    precio: 60, 
    precioLocal: 45, 
    imagen: "/productos/yogurt/principal.jpg",
    imagenesGaleria: ["/productos/yogurt/principal.jpg", "/productos/yogurt/foto2.jpg"],
    descripcionGourmet: "Cremoso y natural. Mezclado con fruta real seleccionada, sin conservadores artificiales.",
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