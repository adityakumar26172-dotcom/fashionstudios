import React from 'react';
import { useShop } from '../context/ShopContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

export function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    shippingCost,
    cartTotal,
    freeShippingThreshold,
    setCurrentPage
  } = useShop();

  const progress = Math.min((cartSubtotal / freeShippingThreshold) * 100, 100);
  const remaining = Math.max(freeShippingThreshold - cartSubtotal, 0);

  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="font-serif text-3xl sm:text-4xl font-bold uppercase text-white mb-8">Shopping Bag ({cart.length})</h1>

      {cart.length === 0 ? (
        <div className="text-center py-20 space-y-6 bg-zinc-900/40 border border-zinc-800">
          <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mx-auto text-zinc-500 border border-zinc-800">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="font-serif text-xl font-bold uppercase text-white">Your bag is currently empty</h2>
          <p className="text-zinc-400 text-xs">Explore our latest drops and elevate your luxury streetwear collection.</p>
          <button
            onClick={() => setCurrentPage('shop')}
            className="bg-white text-zinc-950 px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-blue-600 hover:text-white transition"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Items list */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-zinc-900/60 p-4 border border-zinc-800 text-xs">
              {remaining > 0 ? (
                <p className="text-zinc-300 font-medium mb-2">
                  Add <span className="text-blue-400 font-bold">₹{remaining.toLocaleString('en-IN')}</span> more to qualify for <span className="text-white font-bold">Free Express Shipping</span>!
                </p>
              ) : (
                <p className="text-emerald-400 font-bold uppercase tracking-wider mb-2">✨ You qualify for Free Express Shipping!</p>
              )}
              <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
              </div>
            </div>

            {cart.map((item, index) => (
              <div key={index} className="flex space-x-6 p-6 bg-zinc-900/60 border border-zinc-800 items-center">
                <img src={item.images[0]} alt={item.title} className="w-24 h-32 object-cover bg-zinc-950 flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-sm text-white">{item.title}</h3>
                    <button onClick={() => removeFromCart(index)} className="text-zinc-500 hover:text-red-400 transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-zinc-400">Size: {item.selectedSize} | Color: {item.selectedColor}</p>
                  <div className="flex justify-between items-center pt-2">
                    <div className="flex items-center border border-zinc-700 bg-zinc-950">
                      <button onClick={() => updateQuantity(index, -1)} className="p-1.5 hover:bg-zinc-800 text-zinc-300 transition">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-white">{item.quantity}</span>
                      <button onClick={() => updateQuantity(index, 1)} className="p-1.5 hover:bg-zinc-800 text-zinc-300 transition">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="font-bold text-sm text-white">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-zinc-900/80 border border-zinc-800 p-8 space-y-6 h-fit">
            <h3 className="font-serif text-xl font-bold uppercase text-white border-b border-zinc-800 pb-4">Order Summary</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span className="font-bold text-white">₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Estimated Shipping</span>
                <span className="font-bold text-white">{shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white border-t border-zinc-800 pt-3">
                <span>Total</span>
                <span className="text-base text-blue-400">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={() => setCurrentPage('checkout')}
              className="w-full bg-white text-zinc-950 hover:bg-blue-600 hover:text-white text-xs font-bold uppercase py-4 tracking-wider flex items-center justify-center space-x-2 transition shadow-xl"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
