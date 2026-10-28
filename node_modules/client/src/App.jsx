import React from 'react';
import { useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { LookbookPage } from './pages/LookbookPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AuthModal } from './components/AuthModal';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const { currentPage, toast } = useShop();

  return (
    <div className="min-h-screen bg-[#050508] text-slate-100 font-sans selection:bg-indigo-600 selection:text-white relative">
      <div className="hero-glow top-0 left-1/4" />
      <div className="hero-glow top-1/2 right-10" />

      <AuthModal />

      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-zinc-900 border border-indigo-500/50 text-white text-xs font-bold uppercase tracking-wider px-6 py-4 shadow-2xl rounded-none flex items-center space-x-3 backdrop-blur-xl"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping" />
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />

      {/* RENDER CURRENT PAGE */}
      <main className="relative z-10">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'shop' && <ShopPage />}
        {currentPage === 'lookbook' && <LookbookPage />}
        {currentPage === 'cart' && <CartPage />}
        {currentPage === 'checkout' && <CheckoutPage />}
      </main>

      {/* FOOTER */}
      <footer className="bg-[#050508] text-white pt-16 pb-12 border-t border-zinc-900 relative z-10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <span className="font-serif text-2xl font-extrabold tracking-tighter uppercase italic text-white">
              FASHION<span className="text-indigo-500 font-normal">STUDIOS</span>
            </span>
            <p className="text-zinc-500 text-xs leading-relaxed">
              Pioneering modern luxury streetwear. Engineered in India, recognized globally.
            </p>
          </div>

          <div>
            <h5 className="font-bold text-xs uppercase tracking-widest text-amber-300 mb-4">Client Service</h5>
            <ul className="space-y-2 text-xs text-zinc-400 uppercase font-medium">
              <li><a href="#" className="hover:text-white transition">Order Tracking</a></li>
              <li><a href="#" className="hover:text-white transition">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-white transition">Size Guide</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-xs uppercase tracking-widest text-amber-300 mb-4">Navigation</h5>
            <ul className="space-y-2 text-xs text-zinc-400 uppercase font-medium">
              <li><a href="#" className="hover:text-white transition">New Arrivals</a></li>
              <li><a href="#" className="hover:text-white transition">Streetwear</a></li>
              <li><a href="#" className="hover:text-white transition">Luxury Tailoring</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h5 className="font-bold text-xs uppercase tracking-widest text-amber-300">Fashion Club</h5>
            <div className="flex">
              <input
                type="email"
                placeholder="ENTER YOUR EMAIL"
                className="bg-zinc-900 border border-zinc-800 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 flex-1"
              />
              <button className="bg-indigo-600 text-white px-4 text-xs font-bold uppercase hover:bg-indigo-500 transition">
                Join
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
