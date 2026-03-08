'use client';

import Link from 'next/link';

export default function NuestraHistoria() {
  return (
    <main className="min-h-screen bg-[#FDFCF0] text-[#2D2A26] pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Encabezado */}
        <header className="text-center mb-24">
          <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-stone-400 mb-4 block">La herencia de Bartola</span>
          <h1 className="text-6xl md:text-7xl font-serif italic mb-6">Nuestra Historia</h1>
          <div className="w-20 h-[1px] bg-[#E5B044] mx-auto"></div>
        </header>

        {/* Sección 1: El Becerro y Bartola */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-28">
          <div className="order-2 md:order-1">
            <h2 className="text-[10px] uppercase font-bold tracking-widest text-[#E5B044] mb-4">El Inicio</h2>
            <h3 className="text-3xl font-serif mb-6 italic">Todo comenzó con un becerro</h3>
            <p className="text-lg leading-relaxed font-light text-stone-600 mb-6">
              Nuestra aventura no nació en una oficina, sino en el corral. Criamos un becerro desde pequeño con toda la paciencia del mundo. Con el tiempo, se puso tan bonito que surgió un trato que cambiaría nuestras vidas: mi hermano me lo cambió por una becerra.
            </p>
            <p className="text-lg leading-relaxed font-light text-stone-600">
              Esa becerra se llamaba **Bartola**. Más que ganado, era nuestra mascota. Ella nos daba leche para la casa, pero Bartola era generosa, y pronto nos vimos con más leche de la que podíamos beber.
            </p>
          </div>
          <div className="order-1 md:order-2 aspect-[4/5] bg-stone-200 overflow-hidden shadow-2xl relative">
            <img 
              src="/productos/todos/foto2.jpg" 
              alt="Bartola y el inicio" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 border-[15px] border-[#FDFCF0]/20 pointer-events-none"></div>
          </div>
        </section>

        {/* Cita central: El Generosidad de la Tierra */}
        <section className="text-center mb-28 py-16 bg-white/40 border-y border-stone-200">
          <blockquote className="text-3xl font-serif italic text-stone-700 max-w-2xl mx-auto px-4">
            "No nos terminábamos la leche, ni el queso, ni el yogurt... la abundancia de Bartola nos obligó a emprender."
          </blockquote>
        </section>

        {/* Sección 2: El Oficio Aprendido */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-28">
          <div className="aspect-square bg-stone-200 overflow-hidden shadow-xl">
            <img 
              src="/productos/todos/foto1.jpg" 
              alt="Queso artesanal hila a mano" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-[10px] uppercase font-bold tracking-widest text-[#E5B044] mb-4">El Oficio</h2>
            <h3 className="text-3xl font-serif mb-6 italic">De compartir a emprender</h3>
            <p className="text-lg leading-relaxed font-light text-stone-600 mb-6">
              Primero llevábamos la leche a un quesero local, hasta que un buen amigo nos tendió la mano y nos enseñó los secretos del queso y el yogurt artesanal. Queríamos lo mejor para nuestros niños: algo natural, puro, sin procesos industriales.
            </p>
            <p className="text-lg leading-relaxed font-light text-stone-600">
              Cuando otros negocios empezaron a decaer, decidimos nombrar nuestro emprendimiento en honor a un lugar sagrado para nosotros: **Los Huamiles, "Los huamiles es un desmonte a pie del cerro que es profundamente querido por nuestra familia. Por esta razón decidimos nombrar así nuestro negocio"; el nombre Los Huamiles nos ha dado la bendición de salir adelante.**
            </p>
          </div>
        </section>

        {/* Sección 3: La Diferencia */}
        <section className="max-w-2xl mx-auto text-center mb-32">
          <h2 className="text-[10px] uppercase font-bold tracking-widest text-[#E5B044] mb-4">Hoy</h2>
          <h3 className="text-4xl font-serif mb-8 italic">Un queso sin competencia</h3>
          <p className="text-xl leading-relaxed font-light text-stone-600">
            En un mundo lleno de productos artificiales, nosotros elegimos el camino difícil: **lo natural**. Sabíamos que al hacer un queso honesto, el mercado nos abriría las puertas. Hoy, nos enorgullece decir que esa esencia pura es nuestra mayor fortaleza.
          </p>
        </section>

        {/* Botón Final */}
        <footer className="text-center">
          <Link 
            href="/productos" 
            className="inline-block bg-[#2D2A26] text-white px-16 py-6 uppercase font-bold tracking-[0.2em] text-[10px] hover:bg-[#E5B044] transition-all shadow-[0_20px_50px_rgba(0,0,0,0.1)] active:scale-95"
          >
            Llevar el sabor a casa
          </Link>
        </footer>
      </div>
    </main>
  );
}


