'use client';
import Link from 'next/link';
import { useCart, PRODUCTOS_DATA } from '@/context/CartContext';

export default function Home() {
  const { getPrecioActual, isLocal } = useCart();
  
  // Mostramos Asadero, Fresco y Panela en el inicio
  const QUESOS_DESTACADOS = PRODUCTOS_DATA.filter(p => [1, 2, 4].includes(p.id));

  return (
    <main className="min-h-screen bg-[#FDFCF0]">
      {/* SECCIÓN HERO */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-stone-900/10 z-10" /> 
        <div className="relative z-20 text-center px-4">
          <span className="text-[#E5B044] uppercase tracking-[0.3em] text-sm font-bold mb-4 block">Desde 2012</span>
          <h1 className="text-6xl md:text-8xl font-serif text-[#2D2A26] mb-6 tracking-tighter">
            Los <span className="text-[#E5B044]">Huamiles</span>
          </h1>
          <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto mb-10 font-light italic">
            "El sabor de la tradición, madurado con paciencia y amor por nuestra tierra."
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/productos" className="bg-[#2D2A26] text-white px-10 py-4 hover:bg-[#E5B044] transition-all uppercase text-[10px] tracking-[0.2em] font-bold shadow-lg">
              Ver Catálogo
            </Link>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE DESTACADOS */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <span className="text-[#E5B044] text-xs font-bold uppercase tracking-[0.2em]">Selección Especial</span>
            <h2 className="text-4xl font-serif text-[#2D2A26] mt-2">Nuestros Quesos Destacados</h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {QUESOS_DESTACADOS.map((queso) => (
            <Link key={queso.id} href={`/productos/${queso.id}`} className="group">
              <div className="aspect-[4/5] bg-stone-200 mb-8 overflow-hidden relative shadow-sm">
                <img 
                  src={queso.imagen} 
                  alt={queso.nombre}
                  className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110"
                />
                {isLocal && (
                  <div className="absolute top-4 left-4 bg-[#E5B044] text-white text-[8px] font-bold px-2 py-1 uppercase tracking-widest shadow-lg">
                    Precio Local
                  </div>
                )}
              </div>

              <h3 className="text-2xl font-serif text-[#2D2A26] mb-2 group-hover:text-[#E5B044] transition-colors">
                {queso.nombre}
              </h3>
              <p className="text-[#2D2A26] font-bold tracking-tighter text-xl">
                ${getPrecioActual(queso.id).toFixed(2)} 
                <span className="text-[10px] text-stone-400 font-normal uppercase tracking-widest ml-1">/ kg</span>
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}