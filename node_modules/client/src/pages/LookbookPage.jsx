import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight } from 'lucide-react';

export function LookbookPage() {
  const { setCurrentPage, setSelectedCategory } = useShop();

  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-500">Editorial Fashion '26</span>
        <h1 className="font-serif text-4xl sm:text-6xl font-extrabold uppercase text-white">The Fashion Studios Lookbook</h1>
        <p className="text-zinc-400 text-sm leading-relaxed">
          High-velocity streetwear meets Italian tailored silhouettes. Curated for statement streetwear enthusiasts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-[500px] group overflow-hidden border border-zinc-800">
          <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80" alt="Look 1" className="w-full h-full object-cover group-hover:scale-105 transition duration-700 opacity-85" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
          <div className="absolute bottom-8 left-8 right-8 text-white space-y-2">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">Look 01 • Winter Heavyweight</span>
            <h3 className="font-serif text-3xl font-bold uppercase">Cobalt Tailored Drop</h3>
            <button onClick={() => { setSelectedCategory('Streetwear'); setCurrentPage('shop'); }} className="bg-white text-zinc-950 px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-blue-600 hover:text-white transition flex items-center space-x-2">
              <span>Shop Look 01</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="relative h-[500px] group overflow-hidden border border-zinc-800">
          <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80" alt="Look 2" className="w-full h-full object-cover group-hover:scale-105 transition duration-700 opacity-85" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
          <div className="absolute bottom-8 left-8 right-8 text-white space-y-2">
            <span className="text-xs font-bold text-red-400 uppercase tracking-widest">Look 02 • Evening Statement</span>
            <h3 className="font-serif text-3xl font-bold uppercase">Burgundy Velvet Luxe</h3>
            <button onClick={() => { setSelectedCategory('Party & Statement Wear'); setCurrentPage('shop'); }} className="bg-white text-zinc-950 px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-blue-600 hover:text-white transition flex items-center space-x-2">
              <span>Shop Look 02</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
