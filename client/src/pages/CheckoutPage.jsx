import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShieldCheck, CheckCircle, ArrowRight } from 'lucide-react';

export function CheckoutPage() {
  const { cartTotal, shippingCost, cartSubtotal, clearCart, setCurrentPage, showToast } = useShop();
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Aditya Kumar',
    email: 'adityakhhu@gmail.com',
    address: '123 Fashion District',
    city: 'New Delhi',
    pincode: '110001'
  });

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
    showToast('Order placed successfully!', 'success');
  };

  if (orderPlaced) {
    return (
      <div className="py-24 max-w-xl mx-auto px-4 text-center space-y-6">
        <div className="w-20 h-20 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Order Confirmed #SB-{Math.floor(100000 + Math.random() * 900000)}</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold uppercase text-white">Thank You For Your Order</h1>
          <p className="text-zinc-400 text-xs">A confirmation email and tracking link have been sent to <span className="text-white font-bold">{formData.email}</span>.</p>
        </div>
        <button
          onClick={() => { setOrderPlaced(false); setCurrentPage('home'); }}
          className="bg-white text-zinc-950 font-bold uppercase text-xs tracking-widest px-8 py-4 hover:bg-blue-600 hover:text-white transition"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-24 max-w-3xl mx-auto px-4 sm:px-6">
      <h1 className="font-serif text-3xl font-bold uppercase text-white mb-8">Secure Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="bg-zinc-900/80 border border-zinc-800 p-8 space-y-6">
        {step === 1 ? (
          <div className="space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-widest text-blue-400 border-b border-zinc-800 pb-3">1. Shipping Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold uppercase text-zinc-500 block mb-1">Full Name</label>
                <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 text-xs text-white px-3.5 py-3 focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-zinc-500 block mb-1">Email Address</label>
                <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 text-xs text-white px-3.5 py-3 focus:outline-none focus:border-blue-500" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[10px] font-bold uppercase text-zinc-500 block mb-1">Street Address</label>
                <input type="text" required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 text-xs text-white px-3.5 py-3 focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-zinc-500 block mb-1">City</label>
                <input type="text" required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 text-xs text-white px-3.5 py-3 focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-zinc-500 block mb-1">Pincode</label>
                <input type="text" required value={formData.pincode} onChange={e => setFormData({...formData, pincode: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 text-xs text-white px-3.5 py-3 focus:outline-none focus:border-blue-500" />
              </div>
            </div>

            <button type="button" onClick={() => setStep(2)} className="w-full bg-white text-zinc-950 hover:bg-blue-600 hover:text-white text-xs font-bold uppercase py-4 tracking-wider flex items-center justify-center space-x-2 transition mt-6">
              <span>Proceed to Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
              <h3 className="font-bold text-xs uppercase tracking-widest text-blue-400">2. Payment & Summary</h3>
              <button type="button" onClick={() => setStep(1)} className="text-xs text-zinc-400 hover:text-white uppercase font-bold">Edit Shipping</button>
            </div>

            <div className="bg-zinc-950 p-4 border border-zinc-800 space-y-2 text-xs">
              <div className="flex justify-between text-zinc-400"><span>Subtotal</span><span className="text-white font-bold">₹{cartSubtotal.toLocaleString('en-IN')}</span></div>
              <div className="flex justify-between text-zinc-400"><span>Shipping</span><span className="text-white font-bold">{shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}</span></div>
              <div className="flex justify-between text-sm font-bold text-white border-t border-zinc-800 pt-2"><span>Total</span><span className="text-blue-400">₹{cartTotal.toLocaleString('en-IN')}</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="border border-blue-500 bg-blue-500/10 p-4 cursor-pointer">
                <span className="font-bold text-xs uppercase text-white block">Razorpay / UPI</span>
                <span className="text-[10px] text-zinc-400">Cards, GPay, NetBanking</span>
              </div>
              <div className="border border-zinc-800 p-4 cursor-pointer hover:border-zinc-700">
                <span className="font-bold text-xs uppercase text-white block">Cash on Delivery</span>
                <span className="text-[10px] text-zinc-400">Pay upon delivery</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-[10px] text-zinc-500">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>256-Bit SSL Encrypted Secure Checkout</span>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-500 text-xs font-bold uppercase py-4 tracking-wider transition shadow-2xl">
              Pay ₹{cartTotal.toLocaleString('en-IN')} & Place Order
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
