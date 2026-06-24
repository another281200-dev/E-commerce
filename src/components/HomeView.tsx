/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ViewState } from '../types';
import { CATEGORIES } from '../data';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeViewProps {
  setView: (view: ViewState) => void;
  onFeaturedAction?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setView }) => {
  return (
    <div className="space-y-10 pb-16" id="home-view-container">
      
      {/* Prime Premium Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-900 shadow-xl" id="home-hero-banner">
        <div className="absolute inset-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAk6HbJBr3WPvjYmrUsJV-blBKEsLlLprQ5uTQfZFBcxj4JuSBzCDvuyEPDC_sPgQQhx3Beu_D2F3fOMz0I8iq6Kmn0DWTXOg2J3_Q3dNYhhhBqcVWbJToVo8BiEUR5871uwdCPCQVUE-8d-VoKF5lXf1aXJ07Y5-5K6risJ3zJIn3DJDzcEQieC8e6NmgWlDrX8vmw-h8XHbFG2CqMNTK7wP0Ddtho7QGxa_7_VuZXWHUGzIUtC_JL2kTpPAjidmj4BNdhMcOpNZVz"
            alt="Global Market Showcase Banner"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center opacity-65 hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/60 to-transparent"></div>
        </div>

        <div className="relative max-w-2xl px-6 py-16 sm:px-12 sm:py-24 lg:px-16 lg:py-32 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/25 border border-indigo-500/30 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-300"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Summer Global Launch</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-none"
          >
            Discover the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-400 to-amber-300">World of Goods</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-sm sm:text-base text-slate-200 leading-relaxed max-w-lg"
          >
            Curated premium tech, artisanal fashion trends, and organic skincare, imported straight to your doorstep with carbon-neutral shipping.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <button
              onClick={() => setView('electronics')}
              className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg hover:bg-indigo-700 hover:shadow-indigo-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2"
              type="button"
            >
              <span>Explore Tech Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView('fashion')}
              className="rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-100 border border-slate-700/80 px-5 py-3 text-sm font-bold shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all"
              type="button"
            >
              Shop Summer Trends
            </button>
          </motion.div>
        </div>
      </div>

      {/* Trust Badges Bar */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 bg-slate-50 border border-slate-200/60 rounded-xl p-5" id="trust-indicators">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">Free Shipping</h4>
            <p className="text-[11px] text-slate-500">Orders over ₹150 global-wide</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">Secure Checkouts</h4>
            <p className="text-[11px] text-slate-500">Industry-standard SSL protocols</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">Hassle-Free Returns</h4>
            <p className="text-[11px] text-slate-500">30-day money back guarantee</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-100 text-pink-600">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">Curated Quality</h4>
            <p className="text-[11px] text-slate-500">Verified authentic brands only</p>
          </div>
        </div>
      </div>

      {/* Categories Bento Grid Section */}
      <div className="space-y-5" id="categories-grid-section">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-black text-2xl tracking-tight text-slate-900">Shop by Category</h2>
            <p className="text-xs text-slate-500">Explore premium collections from world-class artisans</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => {
                // Route safely
                if (cat.id === 'electronics' || cat.id === 'fashion' || cat.id === 'beauty') {
                  setView(cat.id as ViewState);
                } else {
                  // Fallback to electronics or keep on home with a subtle warning if not built
                  setView('electronics');
                }
              }}
              className="group relative h-64 overflow-hidden rounded-xl border border-slate-200 bg-slate-950 shadow-sm hover:shadow-md hover:border-indigo-500/40 cursor-pointer transition-all"
            >
              <div className="absolute inset-0">
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-center opacity-70 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5 text-white flex items-end justify-between">
                <div>
                  <span className="block text-[10px] uppercase font-bold tracking-widest text-indigo-300 font-mono">
                    {cat.tagline}
                  </span>
                  <h3 className="mt-1 font-bold text-lg leading-tight">
                    {cat.name}
                  </h3>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 group-hover:bg-indigo-600 text-white transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
    </div>
  );
};
