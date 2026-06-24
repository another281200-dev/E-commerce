/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ViewState } from '../types';
import { Globe, ShieldCheck, Mail, BookOpen, Facebook, Twitter, Instagram, Award } from 'lucide-react';

interface FooterProps {
  setView: (view: ViewState) => void;
}

export const Footer: React.FC<FooterProps> = ({ setView }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800" id="app-footer">
      
      {/* Top Value Propositions banner */}
      <div className="border-b border-slate-900 bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Globe className="w-4 h-4" />
            </div>
            <div className="text-left text-xs">
              <h4 className="font-bold text-white uppercase tracking-wider">Global Sourcing</h4>
              <p className="text-[11px] text-slate-500">Hand-selected items from top worldwide suppliers.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-left text-xs">
              <h4 className="font-bold text-white uppercase tracking-wider">Carbon-Neutral Delivery</h4>
              <p className="text-[11px] text-slate-500">Every shipment is offset for eco preservation.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="text-left text-xs">
              <h4 className="font-bold text-white uppercase tracking-wider">Ethical Procurement</h4>
              <p className="text-[11px] text-slate-500">Dignity, fair wages and labor standards verified.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Award className="w-4 h-4" />
            </div>
            <div className="text-left text-xs">
              <h4 className="font-bold text-white uppercase tracking-wider">Authorized Authenticity</h4>
              <p className="text-[11px] text-slate-500">100% brand-original hardware &amp; wear.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Four-Tier Categories navigation */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Brand & info */}
        <div className="space-y-4 text-left">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-indigo-600 font-extrabold text-sm text-white shadow-md">
              G
            </div>
            <span className="font-extrabold text-white tracking-tight">GlobalMarket</span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-500 max-w-xs">
            Connecting premium international artisans directly with global households. Transacting with full encryption, absolute quality control, and zero-compromise sustainability standards.
          </p>
          <div className="flex items-center gap-3 text-slate-500">
            <Facebook className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
            <Twitter className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
            <Instagram className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>

        {/* Catalog Categories Links */}
        <div className="text-left">
          <h4 className="font-bold text-xs text-white uppercase tracking-widest mb-4">Shop Collections</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setView('electronics')} className="hover:text-white transition-colors" type="button">
                Next-Gen Tech
              </button>
            </li>
            <li>
              <button onClick={() => setView('fashion')} className="hover:text-white transition-colors" type="button">
                Summer Trends 2024
              </button>
            </li>
            <li>
              <button onClick={() => setView('beauty')} className="hover:text-white transition-colors" type="button">
                Eco-conscious Beauty
              </button>
            </li>
            <li>
              <button onClick={() => setView('home')} className="hover:text-white transition-colors" type="button">
                Elevated Interiors
              </button>
            </li>
          </ul>
        </div>

        {/* Global Network countries info */}
        <div className="text-left">
          <h4 className="font-bold text-xs text-white uppercase tracking-widest mb-4">International Hubs</h4>
          <ul className="space-y-2 text-xs text-slate-500">
            <li>Seattle, WA &bull; North America</li>
            <li>London, UK &bull; European Region</li>
            <li>Tokyo, Japan &bull; Asia-Pacific</li>
            <li>Sydney, NSW &bull; Oceania Sector</li>
          </ul>
        </div>

        {/* Corporate contact */}
        <div className="text-left space-y-4">
          <div>
            <h4 className="font-bold text-xs text-white uppercase tracking-widest mb-2">Need Assistance?</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Our multi-lingual global desk is staffed 24/7. Reach out anywhere, anytime.</p>
          </div>
          <div className="rounded-lg bg-slate-900 border border-slate-800 p-3.5 text-[11px] font-mono flex items-center gap-2">
            <Mail className="w-4 h-4 text-indigo-400" />
            <span>global@desk-support.net</span>
          </div>
        </div>

      </div>

      {/* Copyblock footer section */}
      <div className="border-t border-slate-900 bg-slate-950 px-4 py-6 text-center text-xs text-slate-600 font-mono" id="app-footer-credit">
        <span>&copy; {new Date().getFullYear()} GlobalMarket Industries Corp. All rights reserved &bull; Privacy policy &bull; Terms of use &bull; SSL secured</span>
      </div>

    </footer>
  );
};
