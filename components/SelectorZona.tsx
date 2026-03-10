'use client';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';

export default function SelectorZona() {
  const { setZona } = useCart();
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState('');

  useEffect(() => {
    const guardada = localStorage.getItem('zona-huamiles');
    if (!guardada) setVisible(true);
  }, []);

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return; // No permite enviar vacío
    
    setZona(input);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2D2A26]/90 backdrop-blur-md px-6">
      <div className="bg-[#FDFCF0] p-10 max-w-md w-full border border-[#E5B044]/30 shadow-2xl text-center">
        <h2 className="text-4xl font-serif italic mb-2 text-[#2D2A26]">Bienvenido</h2>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-8 font-bold">Selecciona tu ubicación para entrega</p>
        
        <form onSubmit={manejarEnvio}>
          <input 
            autoFocus
            className="w-full bg-transparent border-b border-stone-300 py-3 text-center outline-none focus:border-[#E5B044] mb-8 text-lg text-[#2D2A26]"
            placeholder="¿Desde dónde nos compras?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button 
            disabled={input.trim() === ''}
            className={`w-full py-4 text-[10px] font-bold uppercase tracking-widest transition-all ${
              input.trim() === '' 
              ? 'bg-stone-300 text-stone-500 cursor-not-allowed' 
              : 'bg-[#2D2A26] text-white hover:bg-[#E5B044]'
            }`}
          >
            Entrar a la tienda
          </button>
        </form>
        <p className="mt-6 text-[9px] text-stone-400 italic">Escribe tu comunidad o ciudad para ajustar el contacto del vendedor.</p>
      </div>
    </div>
  );
}