/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, ShoppingCart, Globe, ChevronDown, User, Menu, X, Tag, Sparkles, Percent } from 'lucide-react';
import { ViewState } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  activeView: ViewState;
  setView: (view: ViewState) => void;
  cartCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  authUser: { id: string; name: string; email: string } | null;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  setView,
  cartCount,
  searchQuery,
  setSearchQuery,
  authUser,
  onLogout,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems: { label: string; view: ViewState; icon?: React.ReactNode }[] = [
    { label: 'All', view: 'home' },
    { label: 'Electronics', view: 'electronics', icon: <Sparkles className="w-3.5 h-3.5 text-blue-500" /> },
    { label: 'Fashion', view: 'fashion', icon: <Tag className="w-3.5 h-3.5 text-amber-500" /> },
    { label: 'Beauty & Care', view: 'beauty', icon: <Sparkles className="w-3.5 h-3.5 text-pink-500" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-900 text-white shadow-md" id="app-header">
      {/* Top Banner Accent */}
      <div className="bg-indigo-600 px-4 py-1.5 text-center text-xs font-medium tracking-wider text-indigo-50" id="header-accent-banner">
        <span>✈️ FREE GLOBAL SHIPPING FOR ORDERS OVER ₹150 &bull; CODE: <span className="font-bold">SAVE10</span></span>
      </div>

      {/* Main Navigation Row */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Logo Brand */}
          <div 
            className="flex shrink-0 cursor-pointer items-center gap-2" 
            onClick={() => setView('home')}
            id="logo-container"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 font-black text-xl tracking-tight shadow-md shadow-indigo-900/40">
              G
            </div>
            <div className="hidden sm:block">
              <span className="font-extrabold text-xl tracking-tight bg-linear-to-r from-white to-indigo-200 bg-clip-text text-transparent">GlobalMarket</span>
              <span className="block text-[10px] text-indigo-400 font-mono tracking-widest uppercase">Shop the World</span>
            </div>
          </div>

          {/* Expanded Search Bar */}
          <div className="flex-1 max-w-xl mx-2 sm:mx-6" id="search-bar-wrapper">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                <Search className="h-5 w-5" />
              </span>
              <input
                type="text"
                placeholder="Search products, categories, brands..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  // Auto route to a category if they search from home, or keep active category view
                  if (activeView === 'home' && e.target.value) {
                    setView('electronics'); // Go to catalog to see products
                  }
                }}
                className="w-full rounded-full bg-slate-800 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-400 border border-slate-700/80 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                id="global-search-input"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-white"
                  type="button"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Action Menu Buttons */}
          <div className="flex items-center gap-2 sm:gap-4" id="utility-nav">
            
            {/* Country/Lang selector */}
            <div className="hidden md:flex items-center gap-1.5 cursor-pointer text-sm font-medium text-slate-300 hover:text-white px-2 py-1 rounded-md hover:bg-slate-800 transition-colors">
              <Globe className="h-4 w-4" />
              <span>EN / INR</span>
              <ChevronDown className="h-3 w-3 text-slate-400" />
            </div>

            {/* Account Info */}
            <button
              onClick={() => (authUser ? onLogout() : setView('login'))}
              className="hidden sm:flex items-center gap-1.5 text-sm text-slate-300 hover:text-white px-2 py-1 rounded-md hover:bg-slate-800 transition-colors"
              type="button"
              id="account-nav-button"
            >
              <User className="h-4 w-4" />
              <div className="text-left">
                <span className="block text-[10px] text-slate-400 font-sans">
                  {authUser ? `Hi, ${authUser.name.split(' ')[0]}` : 'Hello, Sign In'}
                </span>
                <span className="block font-semibold leading-tight">
                  {authUser ? 'Sign Out' : 'Account & Lists'}
                </span>
              </div>
            </button>

            {/* Shopping Cart Indicator */}
            <div 
              onClick={() => setView('cart')}
              className={`relative flex items-center justify-center gap-2 cursor-pointer rounded-full p-2.5 transition-all ${
                activeView === 'cart' 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white'
              }`}
              id="shopping-cart-button"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <motion.span 
                  key={cartCount}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-slate-900"
                  id="cart-badge"
                >
                  {cartCount}
                </motion.span>
              )}
              <span className="hidden lg:inline text-sm font-semibold pr-1">Cart</span>
            </div>

            {/* Mobile Navigation Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 md:hidden"
              type="button"
              id="mobile-menu-trigger"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Categories Bar / Sub Navigation */}
      <div className="border-t border-slate-800 bg-slate-950 px-4 py-2 text-sm text-slate-300" id="sub-navigation">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-6 overflow-x-auto scrollbar-none py-1">
            
            {/* Department Categories dropdown style toggle */}
            <div className="flex items-center gap-1.5 font-bold text-white cursor-pointer hover:text-indigo-400 transition-colors">
              <Menu className="h-4 w-4" />
              <span>All Departments</span>
            </div>

            {navigationItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setView(item.view);
                  setSearchQuery('');
                }}
                className={`flex items-center gap-1.5 transition-colors ${
                  activeView === item.view 
                    ? 'text-indigo-400 font-semibold border-b-2 border-indigo-500 pb-1 -mb-1' 
                    : 'text-slate-300 hover:text-white'
                }`}
                type="button"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}

            <button 
              onClick={() => {
                setView('electronics');
                setSearchQuery('');
              }}
              className="text-pink-400 hover:text-pink-300 font-semibold flex items-center gap-1 transition-all"
              type="button"
            >
              <Percent className="w-3.5 h-3.5" />
              <span>Today's Deals</span>
            </button>
          </div>

          <div className="hidden lg:block text-xs font-mono text-slate-400">
            <span>✨ Personalized recommendations waiting!</span>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-t border-slate-800 bg-slate-900 p-4 shadow-xl"
            id="mobile-drawer-menu"
          >
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">Departments</span>
              {navigationItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    setView(item.view);
                    setSearchQuery('');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 rounded-lg p-2.5 text-sm font-medium transition-colors ${
                    activeView === item.view 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                  }`}
                  type="button"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
              <button
                onClick={() => {
                  setView('electronics');
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 rounded-lg bg-pink-900/30 text-pink-300 p-2.5 text-sm font-semibold hover:bg-pink-900/50 transition-colors"
                type="button"
              >
                <Percent className="w-4 h-4" />
                <span>Today's Deals</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
