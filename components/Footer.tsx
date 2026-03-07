'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Footer() {
  const { isLocal, toggleLocal } = useCart();
  const [codigoSecreto, setCodigoSecreto] = useState('');

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();
    // Si el usuario escribe MONTESA, se activa la magia
    toggleLocal(codigoSecreto);
    // Limpiamos el input para que no se quede la palabra ahí escrita
    setCodigoSecreto('');
  };

  return (
    <footer className="bg-[#2D2A26] text-[#FDFCF0] pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Columna 1: Marca */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-serif font-bold mb-6">
              LOS <span className="text-[#E5B044]">HUAMILES</span>
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed">
              Maestros queseros. Llevamos lo mejor de nuestra tienda 
              directamente a tu mesa.
            </p>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div>
            <h3 className="text-[#E5B044] text-xs uppercase tracking-widest font-bold mb-6">Explorar</h3>
            <ul className="space-y-4 text-sm text-stone-300">
              <li><Link href="/productos" className="hover:text-white transition">Catálogo de Quesos</Link></li>
              <li><Link href="/historia" className="hover:text-white transition">Nuestra Historia</Link></li>
              <li><Link href="/maridajes" className="hover:text-white transition">Guía de Maridaje</Link></li>
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div>
            <h3 className="text-[#E5B044] text-xs uppercase tracking-widest font-bold mb-6">Contacto</h3>
            <ul className="space-y-4 text-sm text-stone-300">
              <li>Calle 20 de noviembre #11</li>
              <li>4969611765</li>
              <li>loshuamiles@gmail.com</li>
            </ul>
          </div>

          {/* Columna 4: Newsletter (El Acceso Secreto) */}
          <div>
            <h3 className="text-[#E5B044] text-xs uppercase tracking-widest font-bold mb-6">
              {isLocal ? 'ACCESO AUTORIZADO' : 'Suscríbete'}
            </h3>
            <p className="text-sm text-stone-400 mb-4">
              {isLocal 
                ? 'Tarifas de socio Montesa aplicadas correctamente.' 
                : 'Recibe ofertas exclusivas y notas sobre catas.'}
            </p>
            <form onSubmit={manejarEnvio} className="flex">
              <input 
                type="text" 
                placeholder={isLocal ? "CÓDIGO ACTIVO" : "Tu email"} 
                value={codigoSecreto}
                onChange={(e) => setCodigoSecreto(e.target.value)}
                className={`bg-stone-800 border-none px-4 py-2 text-sm w-full outline-none transition-all ${
                  isLocal ? 'text-[#E5B044] font-bold' : 'text-stone-300'
                } focus:ring-1 focus:ring-[#E5B044]`}
              />
              <button 
                type="submit"
                className="bg-[#E5B044] text-[#2D2A26] px-4 py-2 font-bold text-xs uppercase hover:bg-white transition-colors"
              >
                {isLocal ? 'OK' : 'OK'}
              </button>
            </form>
          </div>

        </div>

        {/* Línea Divisoria y Copyright */}
        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-stone-500 italic">
            © 2026 Quesería Los Huamiles. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 grayscale opacity-50">
            <span className="text-xs font-bold uppercase tracking-tighter">Instagram</span>
            <span className="text-xs font-bold uppercase tracking-tighter">Facebook</span>
          </div>
        </div>
      </div>
    </footer>
  );
}