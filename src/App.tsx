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
import { LoginView } from './components/LoginView';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, X, Check } from 'lucide-react';

export default function App() {
  const [activeView, setView] = useState<ViewState>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [authUser, setAuthUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const [pendingView, setPendingView] = useState<ViewState | null>(null);

  // Custom toast notification states
  const [notification, setNotification] = useState<{ message: string; subText?: string; visible: boolean } | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    setAuthUser(null);
    setPendingView(null);
    setNotification({ message: 'Logged out', subText: 'You have been signed out securely.', visible: true });
    setView('home');
  };

  // Load cart items and auth user from localStorage on initial build
  const verifyAuthToken = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setAuthUser(null);
      return;
    }

    try {
      const response = await fetch('/api/auth/validate', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error('Token validation failed');
      }
      const data = await response.json();
      setAuthUser(data.user ?? null);
      if (!data.user) {
        localStorage.removeItem('authUser');
      }
    } catch (err) {
      console.warn('Auth validation failed', err);
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
      setAuthUser(null);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('globalmarket_cart');
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch (err) {
        console.error('Error parsing cart storage', err);
      }
    }

    const authUserJson = localStorage.getItem('authUser');
    if (authUserJson) {
      try {
        setAuthUser(JSON.parse(authUserJson));
      } catch (err) {
        console.error('Error parsing auth user', err);
      }
    }

    verifyAuthToken();
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

  const handleViewChange = (view: ViewState) => {
    if ((view === 'cart' || view === 'checkout') && !authUser) {
      setPendingView(view);
      setNotification({ message: 'Sign in required', subText: 'Please log in before accessing your cart or checkout.', visible: true });
      setView('login');
      return;
    }

    setView(view);
  };

  const handleLoginSuccess = (redirectTo?: ViewState) => {
    const authUserJson = localStorage.getItem('authUser');
    if (authUserJson) {
      try {
        setAuthUser(JSON.parse(authUserJson));
      } catch (err) {
        console.error('Error parsing auth user', err);
      }
    }

    if (redirectTo && redirectTo !== 'login') {
      setPendingView(null);
      setView(redirectTo);
      return;
    }
    setView('home');
  };

  // Route renderer helper
  const renderActiveView = () => {
    switch (activeView) {
      case 'home':
        return <HomeView setView={handleViewChange} />;
      case 'electronics':
        return <ElectronicsView onAddToCart={handleAddToCart} searchQuery={searchQuery} />;
      case 'fashion':
        return <FashionView onAddToCart={handleAddToCart} searchQuery={searchQuery} />;
      case 'beauty':
        return <BeautyView onAddToCart={handleAddToCart} searchQuery={searchQuery} />;
      case 'cart':
        return <CartView cartItems={cartItems} setCartItems={setCartItems} setView={handleViewChange} isAuthenticated={Boolean(authUser)} authUser={authUser} />;
      case 'checkout':
        return <CheckoutView cartItems={cartItems} setCartItems={setCartItems} setView={handleViewChange} isAuthenticated={Boolean(authUser)} authUser={authUser} />;
      case 'login':
        return <LoginView pendingView={pendingView} onLoginSuccess={handleLoginSuccess} />;
      default:
        return <HomeView setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans select-none" id="app-root-stage">
      
      {/* Top Main Navigation Header */}
      <Header
        activeView={activeView}
        setView={handleViewChange}
        cartCount={totalCartCount}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        authUser={authUser}
        onLogout={handleLogout}
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
      <Footer setView={handleViewChange} />

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
