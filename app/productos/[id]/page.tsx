'use client';

import Link from 'next/link';
import { use, useState, useEffect } from 'react';
import { useCart, PRODUCTOS_DATA } from '@/context/CartContext';

export default function DetalleProducto({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { addToCart, isLocal, getPrecioActual } = useCart();
  
  const producto = PRODUCTOS_DATA.find((q) => q.id.toString() === resolvedParams.id);

  // --- ESTADO PARA LA GALERÍA ---
  const [fotoPrincipal, setFotoPrincipal] = useState(producto?.imagenesGaleria?.[0] || producto?.imagen || '');

  // Estados para Yogurt
  const [tamanioYogurt, setTamanioYogurt] = useState('1 L');
  const [saborSeleccionado, setSaborSeleccionado] = useState('Fresa');

  // Estados para Quesos
  const [pesoFijo, setPesoFijo] = useState('1kg');
  const [pesoLibre, setPesoLibre] = useState('');
  const [tamanioPanela, setTamanioPanela] = useState('Mediana');

  // Estados de cálculo
  const [precioVisual, setPrecioVisual] = useState(0);
  const [multiplicadorActual, setMultiplicadorActual] = useState(1);

  useEffect(() => {
    if (!producto) return;

    const precioBaseUnidad = getPrecioActual(producto.id);
    let m = 1;

    if (producto.id === 6) {
      m = tamanioYogurt === '1/2 L' ? 0.5 : 1.0;
    } 
    else if (producto.id === 1 || producto.id === 2) {
      if (pesoFijo === '200g') m = 0.20;
      else if (pesoFijo === '1/2kg') m = 0.50;
      else m = 1.0;
    } 
    else if (producto.id === 4) {
      m = tamanioPanela === 'Mediana' ? 0.5 : 1.0;
    }
    else {
      const input = pesoLibre.toLowerCase().replace(/\s/g, '');
      const numero = parseFloat(input);
      if (!isNaN(numero)) {
        if (input.includes('kg')) m = numero;
        else if (input.includes('g')) m = numero / 1000;
        else m = numero;
      } else {
        m = 1.0;
      }
    }
    
    setMultiplicadorActual(m);
    setPrecioVisual(precioBaseUnidad * m);
  }, [pesoFijo, pesoLibre, tamanioPanela, tamanioYogurt, producto, isLocal, getPrecioActual]);

  if (!producto) return <div className="pt-40 text-center bg-[#FDFCF0] min-h-screen">Producto no encontrado</div>;

  const manejarClickBoton = () => {
    let etiquetaFinal = "";
    if (producto.id === 6) etiquetaFinal = `${tamanioYogurt} - Sabor ${saborSeleccionado}`;
    else if (producto.id === 1 || producto.id === 2) etiquetaFinal = pesoFijo;
    else if (producto.id === 4) etiquetaFinal = `Pieza ${tamanioPanela} (Aprox)`;
    else etiquetaFinal = pesoLibre || "1 kg (base)";
    addToCart(producto.id, etiquetaFinal, multiplicadorActual);
  };

  return (
    <main className="min-h-screen bg-[#FDFCF0] pt-32 pb-20 px-6 text-[#2D2A26]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* COLUMNA IZQUIERDA: GALERÍA */}
        <div className="flex flex-col gap-3">
          {/* Foto Principal */}
          <div className="relative aspect-square overflow-hidden bg-white rounded-sm shadow-sm border border-stone-100">
            <img 
              src={fotoPrincipal} 
              alt={producto.nombre} 
              className="object-cover w-full h-full transition-all duration-500" 
            />
            {isLocal && (
              <div className="absolute top-4 left-4 bg-[#2D2A26] text-white text-[9px] font-bold px-3 py-1 uppercase tracking-[0.2em] shadow-lg">
                Tarifa Local
              </div>
            )}
          </div>
          
          {/* Miniaturas Extra Pequeñas (8 columnas) */}
          {producto.imagenesGaleria && producto.imagenesGaleria.length > 1 && (
            <div className="grid grid-cols-8 gap-1.5 max-w-[75%]">
              {producto.imagenesGaleria.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setFotoPrincipal(img)}
                  className={`aspect-square border transition-all overflow-hidden rounded-[1px] ${
                    fotoPrincipal === img 
                    ? 'border-[#E5B044] ring-1 ring-[#E5B044]' 
                    : 'border-stone-100 opacity-40 hover:opacity-100'
                  }`}
                >
                  <img src={img} className="object-cover w-full h-full scale-110" alt="Vista previa" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* COLUMNA DERECHA: INFO */}
        <div className="flex flex-col justify-center">
          <Link href="/productos" className="text-stone-400 text-[10px] uppercase font-bold tracking-widest mb-6 hover:text-[#E5B044] transition-colors">← Volver al catálogo</Link>
          <h1 className="text-5xl font-serif mb-4 italic">{producto.nombre}</h1>
          
          <div className="flex items-center gap-4 mb-8">
            <p className="text-3xl font-light text-[#E5B044] tracking-tighter">
              ${precioVisual.toFixed(2)}
            </p>
            {isLocal && <span className="text-[10px] bg-stone-100 px-2 py-1 uppercase font-bold text-stone-500">Precio Socio</span>}
          </div>
          
          <div className="border-t border-stone-200 pt-8">
            <p className="text-stone-600 mb-10 italic leading-relaxed text-lg font-light">
              "{producto.descripcionGourmet || "Artesanía láctea de la más alta calidad."}"
            </p>

            {/* OPCIONES ESPECÍFICAS */}
            {producto.id === 6 && (
              <>
                <div className="mb-6">
                  <p className="text-[10px] uppercase font-bold text-stone-400 mb-4 tracking-widest">Tamaño:</p>
                  <div className="flex gap-3">
                    {['1/2 L', '1 L'].map((t) => (
                      <button key={t} onClick={() => setTamanioYogurt(t)} className={`px-6 py-2 text-[10px] font-bold border transition-all ${tamanioYogurt === t ? 'bg-[#2D2A26] text-white' : 'border-stone-200 text-stone-400'}`}>{t}</button>
                    ))}
                  </div>
                </div>
                <div className="mb-8">
                  <p className="text-[10px] uppercase font-bold text-stone-400 mb-4 tracking-widest">Sabor:</p>
                  <div className="grid grid-cols-3 gap-2">
                    {producto.sabores?.map((s) => (
                      <button key={s} onClick={() => setSaborSeleccionado(s)} className={`px-2 py-3 text-[9px] font-bold border transition-all truncate ${saborSeleccionado === s ? 'bg-[#E5B044] text-white' : 'border-stone-200 text-stone-400'}`}>{s}</button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {(producto.id === 1 || producto.id === 2) && (
              <div className="mb-8">
                <p className="text-[10px] uppercase font-bold text-stone-400 mb-4 tracking-widest">Peso:</p>
                <div className="flex gap-3">
                  {['200g', '1/2kg', '1kg'].map((op) => (
                    <button key={op} onClick={() => setPesoFijo(op)} className={`px-6 py-2 text-[10px] font-bold border ${pesoFijo === op ? 'bg-[#2D2A26] text-white' : 'border-stone-200 text-stone-400'}`}>{op}</button>
                  ))}
                </div>
              </div>
            )}

            {producto.id === 4 && (
              <div className="mb-8">
                <p className="text-[10px] uppercase font-bold text-stone-400 mb-4 tracking-widest">Pieza:</p>
                <div className="flex gap-3">
                  {['Mediana', 'Grande'].map((tam) => (
                    <button key={tam} onClick={() => setTamanioPanela(tam)} className={`px-6 py-2 text-[10px] font-bold border ${tamanioPanela === tam ? 'bg-[#2D2A26] text-white' : 'border-stone-200 text-stone-400'}`}>{tam}</button>
                  ))}
                </div>
              </div>
            )}

            {(producto.id === 3 || producto.id === 5) && (
              <div className="mb-8">
                <p className="text-[10px] uppercase font-bold text-stone-400 mb-4 tracking-widest">Peso:</p>
                <input type="text" placeholder="Ej: 800g o 1.5kg" value={pesoLibre} onChange={(e) => setPesoLibre(e.target.value)} className="w-full bg-white border border-stone-200 p-4 text-sm outline-none focus:border-[#E5B044]" />
              </div>
            )}
            
            <button onClick={manejarClickBoton} className="w-full bg-[#2D2A26] text-white py-5 hover:bg-[#E5B044] transition-all uppercase font-bold tracking-[0.2em] text-[10px] shadow-xl">
              Añadir al pedido
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}