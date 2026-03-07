'use client';

import Link from 'next/link';
import { useCart, PRODUCTOS_DATA } from '@/context/CartContext';

export default function ProductosPage() {
  // Extraemos las funciones y el estado del carrito
  const { getPrecioActual, isLocal } = useCart();

  return (
    <main className="min-h-screen bg-[#FDFCF0] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Encabezado */}
        <header className="mb-16">
          <h1 className="text-4xl font-serif text-[#2D2A26] mb-4 italic">Nuestro Catálogo</h1>
          <p className="text-stone-500 italic font-light">
            {isLocal 
              ? "Seleccionamos las mejores piezas de nuestra variedad para tu mesa." 
              : "Seleccionamos las mejores piezas de nuestra variedad para tu mesa."
            }
          </p>
        </header>

        {/* Rejilla de Productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {PRODUCTOS_DATA.map((queso) => (
            <Link 
              href={`/productos/${queso.id}`} 
              key={queso.id} 
              className="group flex flex-col cursor-pointer"
            >
              {/* Contenedor de Imagen con Efecto Zoom */}
              <div className="relative aspect-square overflow-hidden bg-stone-200 mb-4 rounded-sm shadow-sm">
                <img 
                  src={queso.imagen} 
                  alt={queso.nombre}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                
                {/* Etiqueta flotante */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#2D2A26]">
                  {isLocal ? 'Artesanal' : 'Artesanal'}
                </div>

                {/* Overlay sutil al hacer hover */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Información del Queso */}
              <h3 className="text-lg font-serif text-[#2D2A26] group-hover:text-[#E5B044] transition-colors duration-300">
                {queso.nombre}
              </h3>
              <p className="text-xs text-stone-400 mb-3 font-light uppercase tracking-tighter">Queso 100% de Vaca</p>
              
              <div className="flex justify-between items-center mt-auto">
                <div className="flex flex-col">
                   <span className="text-xl font-bold text-[#2D2A26] tracking-tighter">
                    ${getPrecioActual(queso.id).toFixed(2)}
                  </span>
                  <span className="text-[9px] text-stone-400 uppercase font-bold tracking-widest">por kilo</span>
                </div>
                
                <span className="text-[10px] font-bold uppercase tracking-tighter border-b border-[#E5B044] pb-1 group-hover:text-[#E5B044] transition-all">
                  Ver detalles
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}