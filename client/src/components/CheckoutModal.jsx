import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    shippingCost,
    cartTotal,
    clearCart,
    showToast
  } = useShop();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: 'Aditya Kumar',
    email: 'adityakhhu@gmail.com',
    phone: '+91 98765 43210',
    address: '123 Fashion District, MG Road',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110001',
    paymentMethod: 'Razorpay'
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
    showToast('Order placed successfully!', 'success');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            if (!orderPlaced) setIsCheckoutOpen(false);
          }}
          className="absolute inset-0 bg-black"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-zinc-950 border border-zinc-800 text-slate-100 w-full max-w-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col rounded-2xl"
        >
          {/* Header */}
          <div className="bg-charcoal text-white p-6 flex justify-between items-center">
            <div>
              <span className="text-[10px] font-bold text-butter uppercase tracking-widest">Secure Checkout</span>
              <h2 className="font-serif text-2xl font-bold uppercase mt-0.5">Fashion Studios Express</h2>
            </div>
            {!orderPlaced && (
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="text-gray-400 hover:text-white transition"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto flex-1">
            {orderPlaced ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-cobalt">Order Confirmed #SB-{Math.floor(100000 + Math.random() * 900000)}</span>
                  <h3 className="font-serif text-3xl font-bold uppercase">Thank You For Shopping</h3>
                  <p className="text-gray-500 text-xs max-w-sm mx-auto">
                    We have received your order. A confirmation email has been dispatched to <span className="font-bold text-charcoal">{formData.email}</span>.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setOrderPlaced(false);
                    setIsCheckoutOpen(false);
                  }}
                  className="bg-charcoal text-white text-xs uppercase font-bold px-8 py-4 hover:bg-cobalt transition"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <form onSubmit={handlePlaceOrder} className="space-y-6">
                {step === 1 ? (
                  <div className="space-y-4">
                    <h3 className="font-bold text-sm uppercase tracking-wider text-charcoal border-b pb-2">1. Shipping Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-500 tracking-wider block mb-1">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:border-cobalt"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-500 tracking-wider block mb-1">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:border-cobalt"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-[10px] font-bold uppercase text-gray-500 tracking-wider block mb-1">Street Address</label>
                        <input
                          type="text"
                          name="address"
                          required
                          value={formData.address}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:border-cobalt"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-500 tracking-wider block mb-1">City</label>
                        <input
                          type="text"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:border-cobalt"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-gray-500 tracking-wider block mb-1">Pincode</label>
                        <input
                          type="text"
                          name="pincode"
                          required
                          value={formData.pincode}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:border-cobalt"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full bg-charcoal text-white hover:bg-cobalt text-xs font-bold uppercase py-3.5 tracking-wider flex items-center justify-center space-x-2 transition mt-6"
                    >
                      <span>Proceed to Payment</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center border-b pb-2">
                      <h3 className="font-bold text-sm uppercase tracking-wider text-charcoal">2. Payment & Summary</h3>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-xs text-cobalt font-bold uppercase hover:underline"
                      >
                        Edit Shipping
                      </button>
                    </div>

                    {/* Order Summary box */}
                    <div className="bg-gray-50 p-4 space-y-2 text-xs">
                      <div className="flex justify-between text-gray-600">
                        <span>Items Subtotal</span>
                        <span className="font-bold text-charcoal">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span className="font-bold text-charcoal">{shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold text-charcoal border-t border-gray-200 pt-2">
                        <span>Total Payable</span>
                        <span className="text-base text-cobalt">₹{cartTotal.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    {/* Payment Options */}
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase text-gray-500 tracking-wider block">Select Payment Gateway</label>
                      <div className="grid grid-cols-2 gap-4">
                        <label className="border border-cobalt bg-blue-50/50 p-4 flex flex-col cursor-pointer">
                          <span className="font-bold text-xs uppercase text-charcoal">Razorpay / UPI</span>
                          <span className="text-[10px] text-gray-500 mt-1">GPay, PhonePe, Cards, NetBanking</span>
                        </label>
                        <label className="border border-gray-200 p-4 flex flex-col cursor-pointer hover:border-gray-400">
                          <span className="font-bold text-xs uppercase text-charcoal">Cash on Delivery</span>
                          <span className="text-[10px] text-gray-500 mt-1">Pay when your order arrives</span>
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-[10px] text-gray-400">
                      <ShieldCheck className="w-4 h-4 text-green-600" />
                      <span>256-Bit SSL Encrypted Secure Checkout</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-cherry text-white hover:bg-red-700 text-xs font-bold uppercase py-4 tracking-wider flex items-center justify-center space-x-2 transition"
                    >
                      <span>Pay ₹{cartTotal.toLocaleString('en-IN')} & Place Order</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
