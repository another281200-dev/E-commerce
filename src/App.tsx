/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ViewState, CartItem, Product } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ElectronicsView } from './components/ElectronicsView';
import { FashionView } from './components/FashionView';
import { BeautyView } from './components/BeautyView';
import { CartView } from './components/CartView';
import { CheckoutView } from './components/CheckoutView';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, X, Check } from 'lucide-react';

export default function App() {
  const [activeView, setView] = useState<ViewState>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // Custom toast notification states
  const [notification, setNotification] = useState<{ message: string; subText?: string; visible: boolean } | null>(null);

  // Load cart items from localStorage on initial build
  useEffect(() => {
    const saved = localStorage.getItem('globalmarket_cart');
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch (err) {
        console.error('Error parsing cart storage', err);
      }
    }
  }, []);

  // Save to localStorage when updated
  useEffect(() => {
    localStorage.setItem('globalmarket_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product: Product, size?: string, color?: string) => {
    setCartItems((prev) => {
      // Check if existing item
      const exists = prev.find((item) => item.product.id === product.id);
      if (exists) {
        return prev.map((item) => {
          if (item.product.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      }
      return [...prev, { product, quantity: 1, selectedSize: size, selectedColor: color, checked: true }];
    });

    // Fire premium Toast feedback
    setNotification({
      message: `Added to Shopping Cart!`,
      subText: product.name,
      visible: true
    });
  };

  // Close toast automatically after 3.5 seconds
  useEffect(() => {
    if (notification?.visible) {
      const timer = setTimeout(() => {
        setNotification((prev) => prev ? { ...prev, visible: false } : null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Aggregate item quantities
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Route renderer helper
  const renderActiveView = () => {
    switch (activeView) {
      case 'home':
        return <HomeView setView={setView} />;
      case 'electronics':
        return <ElectronicsView onAddToCart={handleAddToCart} searchQuery={searchQuery} />;
      case 'fashion':
        return <FashionView onAddToCart={handleAddToCart} searchQuery={searchQuery} />;
      case 'beauty':
        return <BeautyView onAddToCart={handleAddToCart} searchQuery={searchQuery} />;
      case 'cart':
        return <CartView cartItems={cartItems} setCartItems={setCartItems} setView={setView} />;
      case 'checkout':
        return <CheckoutView cartItems={cartItems} setCartItems={setCartItems} setView={setView} />;
      default:
        return <HomeView setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans select-none" id="app-root-stage">
      
      {/* Top Main Navigation Header */}
      <Header
        activeView={activeView}
        setView={setView}
        cartCount={totalCartCount}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Layout Block */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            id="view-stage-wrapper"
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Corporate Polished Footer */}
      <Footer setView={setView} />

      {/* Interactive Toast Notifications */}
      <AnimatePresence>
        {notification?.visible && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm bg-slate-900 text-white rounded-xl p-4 shadow-2xl flex items-start gap-3 border border-slate-800"
            id="global-toast-notification"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 shrink-0 border border-emerald-500/20">
              <Check className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex-1 text-left min-w-0">
              <span className="block font-bold text-xs sm:text-sm tracking-tight text-white">{notification.message}</span>
              {notification.subText && (
                <span className="block text-[11px] text-slate-400 truncate mt-0.5">{notification.subText}</span>
              )}
            </div>
            <button
              onClick={() => setNotification((prev) => prev ? { ...prev, visible: false } : null)}
              className="text-slate-500 hover:text-white transition-colors"
              type="button"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
