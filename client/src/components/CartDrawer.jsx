import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    shippingCost,
    cartTotal,
    freeShippingThreshold,
    setIsCheckoutOpen
  } = useShop();

  const progress = Math.min((cartSubtotal / freeShippingThreshold) * 100, 100);
  const remainingForFreeShipping = Math.max(freeShippingThreshold - cartSubtotal, 0);

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="w-screen max-w-md bg-zinc-950 text-zinc-100 border-l border-zinc-800 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-blue-500" />
                <h2 className="font-serif text-xl font-bold uppercase tracking-tight text-white">Shopping Bag</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-zinc-400 hover:text-white transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Free Shipping Progress */}
            <div className="bg-zinc-900/80 p-4 border-b border-zinc-800 text-xs">
              {remainingForFreeShipping > 0 ? (
                <p className="text-zinc-400 mb-2 font-medium">
                  Add <span className="font-bold text-blue-400">₹{remainingForFreeShipping.toLocaleString('en-IN')}</span> more for <span className="font-bold text-white">Free Express Shipping</span>!
                </p>
              ) : (
                <p className="text-emerald-400 font-bold mb-2 uppercase tracking-wider flex items-center">
                  ✨ You qualify for Free Express Shipping!
                </p>
              )}
              <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-blue-500 h-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="text-center py-20 space-y-4">
                  <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto text-zinc-600 border border-zinc-800">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-lg font-bold uppercase text-white">Your bag is empty</h3>
                  <p className="text-zinc-500 text-xs">Discover our latest drops and elevate your wardrobe.</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="inline-block bg-white text-zinc-950 text-xs uppercase font-bold px-6 py-3 hover:bg-blue-500 hover:text-white transition"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item, index) => (
                  <div key={index} className="flex space-x-4 pb-6 border-b border-zinc-800/80 group">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-20 h-24 object-cover bg-zinc-900 border border-zinc-800 flex-shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-sm text-zinc-100 line-clamp-1">{item.title}</h4>
                          <button
                            onClick={() => removeFromCart(index)}
                            className="text-zinc-500 hover:text-red-400 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-zinc-500 mt-1">Size: {item.selectedSize} | Color: {item.selectedColor}</p>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center border border-zinc-800 bg-zinc-900">
                          <button
                            onClick={() => updateQuantity(index, -1)}
                            className="p-1 hover:bg-zinc-800 text-zinc-400 transition"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-bold text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(index, 1)}
                            className="p-1 hover:bg-zinc-800 text-zinc-400 transition"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="font-bold text-sm text-white">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-zinc-800 bg-zinc-900/50 space-y-4">
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-zinc-400">
                    <span>Subtotal</span>
                    <span className="font-bold text-white">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Estimated Shipping</span>
                    <span className="font-bold text-white">
                      {shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-white border-t border-zinc-800 pt-2">
                    <span>Total</span>
                    <span className="text-base text-blue-400">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full bg-white text-zinc-950 hover:bg-blue-500 hover:text-white text-xs font-bold uppercase py-4 tracking-wider flex items-center justify-center space-x-2 transition"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
