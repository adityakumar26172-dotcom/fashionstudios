import React from 'react';
import { useShop } from '../context/ShopContext';
import { Heart, TrendingUp, SlidersHorizontal } from 'lucide-react';

export function ShopPage() {
  const { filteredProducts, addToCart, toggleWishlist, setSelectedCategory, selectedCategory, setSelectedSort, selectedSort } = useShop();

  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-red-400 font-bold text-xs uppercase tracking-widest flex items-center space-x-1">
            <TrendingUp className="w-4 h-4 mr-1" /> New Season
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold uppercase tracking-tight mt-1 text-white">
            {selectedCategory === 'All' ? 'Complete Collection' : selectedCategory}
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase text-zinc-400 mr-2">
            <SlidersHorizontal className="w-4 h-4 text-blue-500" />
            <span>Sort:</span>
          </div>
          {['featured', 'price-low', 'price-high'].map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSort(s)}
              className={`text-xs uppercase font-bold px-4 py-2 border transition ${selectedSort === s ? 'bg-blue-600 text-white border-blue-500' : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-600'}`}
            >
              {s.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {filteredProducts.map((product) => (
          <div key={product._id} className="bg-zinc-900/60 glass-panel group border border-zinc-800 hover:border-blue-500/50 hover:shadow-2xl transition duration-500 flex flex-col justify-between">
            <div className="relative aspect-[3/4] bg-zinc-950 overflow-hidden">
              <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition duration-700" />
              <button onClick={() => toggleWishlist(product)} className="absolute top-3 right-3 p-2.5 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 rounded-full text-zinc-300 hover:text-red-400 transition">
                <Heart className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">{product.category}</span>
                <h3 className="font-semibold text-sm text-zinc-100 group-hover:text-blue-400 transition line-clamp-1 mt-1">{product.title}</h3>
              </div>
              <div className="flex items-center justify-between border-t border-zinc-800 pt-3">
                <span className="font-bold text-sm text-white">₹{product.price.toLocaleString('en-IN')}</span>
                <button onClick={() => addToCart(product)} className="bg-white text-zinc-950 text-xs uppercase font-bold px-4 py-2 hover:bg-blue-600 hover:text-white transition">
                  Add +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
