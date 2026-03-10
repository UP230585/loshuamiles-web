'use client';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export const PRODUCTOS_DATA = [
  { 
    id: 1, 
    nombre: "Asadero tipo Oaxaca", 
    precio: 170, 
    precioLocal: 130, 
    precioLeon: 200,
    imagen: "/productos/asadero/principal.jpg",
    imagenesGaleria: ["/productos/asadero/principal.jpg", "/productos/asadero/foto1.jpg"],
    descripcionGourmet: "Nuestro queso estrella. Elaborado artesanalmente con leche fresca del día, logrando una elasticidad perfecta."
  },
  { 
    id: 2, 
    nombre: "Fresco", 
    precio: 165, 
    precioLocal: 125, 
    precioLeon: 200,
    imagen: "/productos/fresco/principal.jpg",
    imagenesGaleria: ["/productos/fresco/principal.jpg", "/productos/fresco/foto1.jpg"],
    descripcionGourmet: "Textura suave y sabor delicado. El compañero ideal para tus platillos mexicanos tradicionales."
  },
  { 
    id: 3, 
    nombre: "Añejo", 
    precio: 180, 
    precioLocal: 140, 
    precioLeon: 240,
    imagen: "/productos/anejo/principal.jpg",
    imagenesGaleria: ["/productos/anejo/principal.jpg", "/productos/anejo/foto1.jpg"],
    descripcionGourmet: "Sabor intenso y textura firme. Un queso con carácter, ideal para maridar."
  },
  { 
    id: 4, 
    nombre: "Panela", 
    precio: 165, 
    precioLocal: 125, 
    precioLeon: 200,
    imagen: "/productos/panela/principal.jpg",
    imagenesGaleria: ["/productos/panela/principal.jpg", "/productos/panela/foto1.jpg"],
    descripcionGourmet: "Ligero y fresco. Perfecto para asar o disfrutar en ensaladas."
  },
  { 
    id: 5, 
    nombre: "Requesón", 
    precio: 100, 
    precioLocal: 80, 
    precioLeon: 140,
    imagen: "/productos/requeson/principal.jpg",
    imagenesGaleria: ["/productos/requeson/principal.jpg", "/productos/requeson/foto1.jpg"],
    descripcionGourmet: "Crema de queso suave y nutritiva. Elaborado con los estándares más altos de frescura."
  },
  { 
    id: 6, 
    nombre: "Yogurt Artesanal", 
    precio: 60, 
    precioLocal: 45, 
    precioLeon: 70,
    imagen: "/productos/yogurt/principal.jpg",
    imagenesGaleria: ["/productos/yogurt/principal.jpg", "/productos/yogurt/foto2.jpg"],
    descripcionGourmet: "Cremoso y natural. Mezclado con fruta real seleccionada.",
    sabores: ["Fresa", "Nuez", "Manzana", "Piña-Coco", "Cereal", "Frambuesa", "Zarzamora"] 
  }
];

type Zona = 'LOCAL' | 'LEON' | 'NORMAL';

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
  zona: Zona;
  setZona: (z: string) => void; 
  getPrecioActual: (id: number) => number;
  getTelefonoWhatsApp: () => string;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [zona, setZonaState] = useState<Zona>('NORMAL');

  useEffect(() => {
    const saved = localStorage.getItem('zona-huamiles') as Zona;
    if (saved) setZonaState(saved);
  }, []);

  const setZona = (inputUser: string) => {
    // Validar que no esté vacío
    if (!inputUser || inputUser.trim().length === 0) return;

    const texto = inputUser.toLowerCase().trim()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, ""); 

    const variantesLeon = [
      'leon', 'leon gto', 'leon guanajuato', 'leon de los aldama', 
      'leon de los aldamas', 'león', 'león gto', 'león guanajuato'
    ];

    const variantesLocal = [
      'montesa', 'la montesa', 'los campos', 'las negritas', 'negritas', 
      'el epazote', 'epazote', 'fraguas', 'las fraguas', 'el salitre', 
      'el arco', 'pilotos', 'ojo de agua', 'el ojo de agua', 'el hojo de agua',
    ];

    let zonaFinal: Zona = 'NORMAL';

    if (variantesLeon.some(v => texto.includes(v))) {
      zonaFinal = 'LEON';
    } else if (variantesLocal.some(v => texto.includes(v))) {
      zonaFinal = 'LOCAL';
    }

    setZonaState(zonaFinal);
    localStorage.setItem('zona-huamiles', zonaFinal);
  };

  const getPrecioActual = (id: number) => {
    const p = PRODUCTOS_DATA.find(q => q.id === id);
    if (!p) return 0;
    if (zona === 'LOCAL') return p.precioLocal;
    if (zona === 'LEON') return p.precioLeon; 
    return p.precio;
  };

  const getTelefonoWhatsApp = () => {
    if (zona === 'LOCAL') return "524969611765";
    if (zona === 'LEON') return "524922004655";
    return "524499354569";
  };

  const addToCart = (id: number, pesoLabel: string, multiplicador: number) => {
    const producto = PRODUCTOS_DATA.find(p => p.id === id);
    if (!producto) return;
    setCart((prev) => {
      const exists = prev.find(item => item.id === id && item.pesoLabel === pesoLabel);
      if (exists) return prev.map(item => (item.id === id && item.pesoLabel === pesoLabel) ? { ...item, cantidad: item.cantidad + 1 } : item);
      return [...prev, { id, nombre: producto.nombre, imagen: producto.imagen, cantidad: 1, pesoLabel, multiplicador }];
    });
  };

  const removeFromCart = (id: number, peso: string) => setCart(prev => prev.filter(i => !(i.id === id && i.pesoLabel === peso)));
  const updateQuantity = (id: number, peso: string, delta: number) => setCart(prev => prev.map(i => (i.id === id && i.pesoLabel === peso) ? { ...i, cantidad: Math.max(1, i.cantidad + delta) } : i));
  const clearCart = () => setCart([]);
  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <CartContext.Provider value={{ 
      cart, addToCart, removeFromCart, updateQuantity, clearCart, 
      zona, setZona, getPrecioActual, getTelefonoWhatsApp, totalItems 
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