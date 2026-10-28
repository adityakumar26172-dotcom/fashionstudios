import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Search, User, Menu, X, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const {
    currentPage,
    setCurrentPage,
    cartItemCount,
    user,
    logout,
    setIsAuthOpen,
    setSelectedCategory,
    setSearchQuery
  } = useShop();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navigateTo = (page, category = null) => {
    if (category) setSelectedCategory(category);
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-zinc-800 bg-[#050508]/80 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-zinc-300 hover:text-white transition"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo */}
        <div className="flex-1 md:flex-none text-center md:text-left cursor-pointer" onClick={() => navigateTo('home')}>
          <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tighter uppercase italic text-white group">
            FASHION<span className="text-indigo-500 font-normal">STUDIOS</span>
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-bold tracking-widest uppercase text-zinc-300">
          <button onClick={() => navigateTo('home')} className={`hover:text-indigo-400 transition py-1 ${currentPage === 'home' ? 'text-indigo-400 border-b-2 border-indigo-500' : ''}`}>Home</button>
          <button onClick={() => navigateTo('shop', 'All')} className={`hover:text-indigo-400 transition py-1 ${currentPage === 'shop' ? 'text-indigo-400 border-b-2 border-indigo-500' : ''}`}>Shop Catalog</button>
          <button onClick={() => navigateTo('lookbook')} className={`hover:text-indigo-400 transition py-1 ${currentPage === 'lookbook' ? 'text-indigo-400 border-b-2 border-indigo-500' : ''}`}>Lookbook</button>
          <button onClick={() => navigateTo('shop', 'Party & Statement Wear')} className="text-pink-400 hover:opacity-80 transition py-1">Statement</button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2.5 text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 rounded-full transition hover:border-indigo-500"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {user ? (
            <div className="hidden sm:flex items-center space-x-3 bg-zinc-900 border border-zinc-800 px-3.5 py-1.5 rounded-full">
              <span className="text-xs font-bold text-indigo-400 uppercase">{user.name.split(' ')[0]}</span>
              <button onClick={logout} className="text-zinc-400 hover:text-pink-400 transition" title="Logout">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthOpen(true)}
              className="p-2.5 text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 rounded-full transition hover:border-indigo-500 hidden sm:block"
              title="Sign In"
            >
              <User className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => navigateTo('cart')}
            className="p-2.5 text-zinc-100 hover:text-indigo-400 transition relative bg-zinc-900 border border-zinc-800 rounded-full shadow-lg hover:border-indigo-500 flex items-center justify-center"
            title="Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4 text-zinc-200" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-zinc-950">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Search Input Bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-zinc-950 border-b border-zinc-800 px-4 py-4"
          >
            <div className="max-w-xl mx-auto relative">
              <input
                type="text"
                placeholder="Search drops, jackets, hoodies..."
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    navigateTo('shop');
                    setIsSearchOpen(false);
                  }
                }}
                className="w-full bg-zinc-900 border border-zinc-700 text-xs text-white px-4 py-3 pl-11 focus:outline-none focus:border-indigo-500"
                autoFocus
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-3.5" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-20 left-0 right-0 w-full bg-zinc-950/95 backdrop-blur-2xl border-b border-zinc-800 px-6 py-6 space-y-4 text-xs font-bold uppercase tracking-widest text-zinc-200 shadow-2xl z-50 overflow-hidden"
          >
            <button onClick={() => navigateTo('home')} className="block w-full text-left py-2 hover:text-indigo-400 transition">Home</button>
            <button onClick={() => navigateTo('shop', 'All')} className="block w-full text-left py-2 hover:text-indigo-400 transition">Shop Catalog</button>
            <button onClick={() => navigateTo('lookbook')} className="block w-full text-left py-2 hover:text-indigo-400 transition">Lookbook</button>
            <button onClick={() => navigateTo('shop', 'Party & Statement Wear')} className="block w-full text-left py-2 text-pink-400 transition">Statement Wear</button>
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
              {user ? (
                <button onClick={() => { logout(); setIsMenuOpen(false); }} className="text-pink-400 flex items-center space-x-2">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              ) : (
                <button onClick={() => { setIsAuthOpen(true); setIsMenuOpen(false); }} className="text-indigo-400 flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
