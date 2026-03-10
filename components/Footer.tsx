'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Footer() {
  const { getTelefonoWhatsApp, zona } = useCart();

  return (
    <footer className="bg-[#2D2A26] text-[#FDFCF0] py-16 px-6 mt-auto">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Columna 1: Marca y Eslogan */}
        <div className="space-y-4">
          <h2 className="font-serif italic text-3xl">Los Huamiles</h2>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#E5B044] font-bold">
            Quesería Artesanal
          </p>
          <p className="text-sm font-light italic text-stone-400 max-w-xs leading-relaxed">
            "Sabor natural, tradición familiar."
          </p>
        </div>

        {/* Columna 2: Enlaces Rápidos */}
        <div className="flex flex-col gap-3 text-stone-300">
          <h3 className="text-[11px] uppercase font-bold tracking-widest mb-2 text-white">Navegación</h3>
          <Link href="/productos" className="text-sm hover:text-[#E5B044] transition-colors">Catálogo de Quesos</Link>
          <Link href="/historia" className="text-sm hover:text-[#E5B044] transition-colors">Nuestra Historia</Link>
          <Link href="/carrito" className="text-sm hover:text-[#E5B044] transition-colors">Mi Pedido</Link>
        </div>

        {/* Columna 3: Contacto Dinámico */}
        <div className="space-y-4">
          <h3 className="text-[11px] uppercase font-bold tracking-widest mb-2 text-[#E5B044]">Contacto</h3>
          <div className="pt-2">
            <a 
              href={`https://wa.me/${getTelefonoWhatsApp()}`} 
              target="_blank" 
              className="bg-white/5 border border-white/10 px-6 py-3 text-xs uppercase tracking-widest hover:bg-[#E5B044] hover:text-[#2D2A26] transition-all inline-block"
            >
              WhatsApp del Vendedor
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/5 text-center">
        <p className="text-[9px] uppercase tracking-[0.4em] text-stone-600">
          © {new Date().getFullYear()} LOS HUAMILES — PRODUCTOS NATURALES SIN CONSERVADORES.
        </p>
      </div>
    </footer>
  );
}