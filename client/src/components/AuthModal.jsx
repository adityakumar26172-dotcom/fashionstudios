import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function AuthModal() {
  const { isAuthOpen, setIsAuthOpen, login, showToast } = useShop();
  const [isLoginTab, setIsLoginTab] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || (!isLoginTab && !name)) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    const mockUser = {
      name: isLoginTab ? email.split('@')[0].toUpperCase() : name,
      email: email,
      role: email.includes('admin') ? 'admin' : 'user'
    };

    login(mockUser);
  };

  return (
    <AnimatePresence>
      {isAuthOpen && (
        <div className="modal-overlay p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsAuthOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-zinc-950 border border-zinc-800 w-full max-w-sm shadow-2xl overflow-hidden z-10 max-h-[85vh] flex flex-col rounded-2xl"
          >
            {/* Header */}
            <div className="bg-zinc-900 text-white p-5 sm:p-6 relative border-b border-zinc-800 shrink-0">
              <button
                onClick={() => setIsAuthOpen(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white transition p-1.5 bg-zinc-800/50 rounded-full"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest">Fashion Studios Club</span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold uppercase mt-1">
                {isLoginTab ? 'Welcome Back' : 'Create Account'}
              </h2>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-zinc-800 bg-zinc-950 shrink-0">
              <button
                onClick={() => setIsLoginTab(true)}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition ${
                  isLoginTab ? 'border-b-2 border-indigo-500 text-indigo-400 bg-zinc-950' : 'text-zinc-500 hover:text-zinc-300 bg-zinc-900/50'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLoginTab(false)}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition ${
                  !isLoginTab ? 'border-b-2 border-indigo-500 text-indigo-400 bg-zinc-950' : 'text-zinc-500 hover:text-zinc-300 bg-zinc-900/50'
                }`}
              >
                Register
              </button>
            </div>

            {/* Form / Scrollable Content */}
            <div className="overflow-y-auto flex-1">
              <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 bg-zinc-950">
                {!isLoginTab && (
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Full Name</label>
                    <div className="relative">
                      <UserIcon className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
                      <input
                        type="text"
                        required
                        placeholder="Aditya Kumar"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 pl-11 pr-4 py-3 text-xs text-white focus:outline-none focus:border-indigo-500 transition rounded-none"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 pl-11 pr-4 py-3 text-xs text-white focus:outline-none focus:border-indigo-500 transition rounded-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 pl-11 pr-4 py-3 text-xs text-white focus:outline-none focus:border-indigo-500 transition rounded-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white hover:bg-indigo-500 text-xs font-bold uppercase py-4 tracking-wider flex items-center justify-center space-x-2 transition mt-4 shadow-xl"
                >
                  <span>{isLoginTab ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
