import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, TrendingUp, Sparkles, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export function HomePage() {
  const { products, setCurrentPage, setSelectedCategory, addToCart, toggleWishlist } = useShop();

  const navigateCategory = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] bg-[#050508] text-white overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0 opacity-45 bg-cover bg-center scale-105" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2000&q=80')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-[#050508]/80 to-transparent z-10"></div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl space-y-6"
          >
            <span className="inline-block bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase backdrop-blur-md">
              Winter '26 Capsule Drop
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight uppercase leading-[0.95] text-white">
              REDEFINE YOUR <span className="text-gradient">AESTHETIC.</span>
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 font-light max-w-lg leading-relaxed">
              High-velocity streetwear fused with Italian tailoring craftsmanship. Bold cuts, premium weights, zero compromises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button onClick={() => navigateCategory('All')} className="bg-white text-zinc-950 hover:bg-indigo-600 hover:text-white font-bold px-8 py-4 uppercase text-xs tracking-widest flex items-center justify-center space-x-3 transition group shadow-2xl">
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => setCurrentPage('lookbook')} className="border border-zinc-700 hover:border-zinc-400 text-zinc-200 font-bold px-8 py-4 uppercase text-xs tracking-widest transition bg-zinc-900/60 backdrop-blur-md">
                Explore Lookbook
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="text-indigo-400 font-bold text-xs uppercase tracking-widest">Curated Directions</span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold uppercase tracking-tight mt-1 text-white">Featured Collections</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          <div onClick={() => navigateCategory('Streetwear')} className="relative h-80 sm:h-96 group overflow-hidden bg-zinc-900 border border-zinc-800 cursor-pointer shadow-2xl">
            <img src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80" alt="Streetwear" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/30 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[10px] uppercase tracking-widest text-amber-300 font-bold bg-amber-400/10 px-2 py-0.5 border border-amber-300/30">Drop 01</span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold uppercase mt-2">Streetwear Essentials</h3>
              <span className="mt-2 inline-flex items-center text-xs font-bold uppercase tracking-wider text-zinc-300 group-hover:text-amber-300">
                Explore Drop <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </span>
            </div>
          </div>

          <div onClick={() => navigateCategory('Everyday Luxury')} className="relative h-80 sm:h-96 group overflow-hidden bg-zinc-900 border border-zinc-800 cursor-pointer shadow-2xl">
            <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80" alt="Everyday Luxury" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/30 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[10px] uppercase tracking-widest text-pink-400 font-bold bg-pink-400/10 px-2 py-0.5 border border-pink-400/30">Tailored</span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold uppercase mt-2">Everyday Luxury</h3>
              <span className="mt-2 inline-flex items-center text-xs font-bold uppercase tracking-wider text-zinc-300 group-hover:text-pink-400">
                Explore Tailored <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </span>
            </div>
          </div>

          <div onClick={() => navigateCategory('Minimal Classics')} className="relative h-80 sm:h-96 group overflow-hidden bg-zinc-900 border border-zinc-800 cursor-pointer shadow-2xl sm:col-span-2 md:col-span-1">
            <img src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80" alt="Minimal Classics" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/30 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[10px] uppercase tracking-widest text-amber-300 font-bold bg-amber-400/10 px-2 py-0.5 border border-amber-300/30">Timeless</span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold uppercase mt-2">Minimal Classics</h3>
              <span className="mt-2 inline-flex items-center text-xs font-bold uppercase tracking-wider text-zinc-300 group-hover:text-amber-300">
                Explore Minimal <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Drops Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="text-pink-400 font-bold text-xs uppercase tracking-widest flex items-center space-x-1">
              <TrendingUp className="w-4 h-4 mr-1" /> High Demand
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold uppercase tracking-tight mt-1 text-white">Trending Drops</h2>
          </div>
          <button onClick={() => navigateCategory('All')} className="text-xs font-bold uppercase tracking-widest text-indigo-400 hover:text-white flex items-center space-x-1">
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <div key={product._id} className="bg-zinc-900/60 glass-panel group border border-zinc-800 hover:border-indigo-500/50 transition duration-500 flex flex-col justify-between shadow-2xl">
              <div className="relative aspect-[3/4] bg-zinc-950 overflow-hidden">
                <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition duration-700" />
                <button onClick={() => toggleWishlist(product)} className="absolute top-3 right-3 p-2.5 bg-zinc-950/80 border border-zinc-800 rounded-full text-zinc-300 hover:text-pink-400 transition">
                  <ShieldCheck className="w-4 h-4" />
                </button>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">{product.category}</span>
                  <h3 className="font-semibold text-sm text-zinc-100 group-hover:text-indigo-400 transition line-clamp-1 mt-1">{product.title}</h3>
                </div>
                <div className="flex items-center justify-between border-t border-zinc-800 pt-3">
                  <span className="font-bold text-sm text-white">₹{product.price.toLocaleString('en-IN')}</span>
                  <button onClick={() => addToCart(product)} className="bg-white text-zinc-950 text-xs uppercase font-bold px-4 py-2 hover:bg-indigo-600 hover:text-white transition">
                    Add +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
