'use client'; // <-- Importante para que el contador cambie en vivo

import Link from 'next/link';
import { useCart } from '@/context/CartContext'; // Importamos el gancho del carrito

export default function Navbar() {
  // Extraemos el total de productos del carrito
  const { totalItems } = useCart();

  return (
    <nav className="fixed w-full z-50 bg-[#FDFCF0]/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Enlaces Izquierda */}
        <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest font-bold text-[#2D2A26]">
          <Link href="/productos" className="hover:text-[#E5B044] transition">Quesos</Link>
          <Link href="/historia" className="hover:text-[#E5B044] transition">Nuestra Historia</Link>
        </div>

        {/* Logo Central */}
        <Link href="/" className="text-2xl font-serif font-bold text-[#2D2A26] tracking-tighter">
          LOS <span className="text-[#E5B044]">HUAMILES</span>
        </Link>

        {/* Enlaces Derecha */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest font-bold text-[#2D2A26]">
            <Link href="/contacto" className="hover:text-[#E5B044] transition">Contacto</Link>
          </div>
          
          {/* Icono de Carrito (Dinámico) */}
          <Link href="/carrito" className="relative group">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#2D2A26] group-hover:text-[#E5B044] transition-colors">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
            </svg>
            
            {/* El círculo dorado con el número real */}
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#E5B044] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in duration-300 font-bold">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}