'use client';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useState } from 'react';

export default function CarritoPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, isLocal, toggleLocal, getPrecioActual } = useCart();
  const [codigoInput, setCodigoInput] = useState('');
  
  // Total calculado en tiempo real basándose en el precio base actual del contexto
  const totalDinero = cart.reduce((acc, item) => {
    const precioBase = getPrecioActual(item.id);
    return acc + (precioBase * item.multiplicador * item.cantidad);
  }, 0);

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#FDFCF0] pt-40 px-6 text-center">
        <h1 className="text-3xl font-serif text-[#2D2A26] mb-6 italic">Tu bolsa está vacía</h1>
        <Link href="/productos" className="bg-[#2D2A26] text-white px-8 py-4 uppercase text-[10px] font-bold tracking-[0.2em] inline-block">
          Explorar la Quesería
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FDFCF0] pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <h1 className="text-4xl font-serif text-[#2D2A26] italic">Tu Pedido</h1>
          <button onClick={clearCart} className="text-[10px] uppercase font-bold text-red-800/60 hover:text-red-800">Vaciar Bolsa</button>
        </div>

        <div className="bg-white/60 backdrop-blur-sm border border-stone-200 rounded-sm p-4 md:p-8 shadow-sm">
          {cart.map((item) => {
            const precioVigenteUnidad = getPrecioActual(item.id) * item.multiplicador;
            return (
              <div key={`${item.id}-${item.pesoLabel}`} className="grid grid-cols-1 md:grid-cols-4 items-center gap-6 py-8 border-b border-stone-100 last:border-0">
                <div className="col-span-2 flex items-center gap-6">
                  <img src={item.imagen} alt={item.nombre} className="w-20 h-20 object-cover" />
                  <div>
                    <h3 className="font-serif text-xl text-[#2D2A26]">{item.nombre}</h3>
                    <p className="text-[#E5B044] text-[11px] font-bold uppercase tracking-widest">{item.pesoLabel}</p>
                    <button onClick={() => removeFromCart(item.id, item.pesoLabel)} className="text-[9px] uppercase text-stone-400 mt-2 underline">Quitar</button>
                  </div>
                </div>

                <div className="flex justify-center items-center gap-4">
                  <button onClick={() => updateQuantity(item.id, item.pesoLabel, -1)} className="w-8 h-8 rounded-full border border-stone-200">-</button>
                  <span className="text-stone-600 font-medium">{item.cantidad}</span>
                  <button onClick={() => updateQuantity(item.id, item.pesoLabel, 1)} className="w-8 h-8 rounded-full border border-stone-200">+</button>
                </div>

                <div className="text-right">
                  <p className="text-lg font-medium text-[#2D2A26]">
                    ${(precioVigenteUnidad * item.cantidad).toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })}

          <div className="mt-12 pt-8 border-t-2 border-[#2D2A26]">
            <div className="flex justify-between items-center mb-10">
              <span className="text-sm uppercase font-bold tracking-[0.3em] text-stone-400">Total Estimado</span>
              <span className="text-4xl font-serif text-[#2D2A26]">${totalDinero.toFixed(2)}</span>
            </div>
            <button 
              onClick={() => {
                const mensaje = `🧀 *Nuevo Pedido - Los Huamiles*\n\n` + 
                  cart.map(i => `• ${i.cantidad}x ${i.nombre} [${i.pesoLabel}] - $${(getPrecioActual(i.id) * i.multiplicador * i.cantidad).toFixed(2)}`).join('\n') + 
                  `\n\n💰 *Total Estimado: $${totalDinero.toFixed(2)}*`;
                window.open(`https://wa.me/524969611765?text=${encodeURIComponent(mensaje)}`);
              }}
              className="w-full bg-[#2D2A26] text-white py-5 font-bold uppercase text-xs tracking-[0.3em] hover:bg-[#E5B044]"
            >
              Confirmar por WhatsApp
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}