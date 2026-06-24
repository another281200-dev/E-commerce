/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Product, FilterState } from '../types';
import { PRODUCTS } from '../data';
import { ProductCard } from './ProductCard';
import { FiltersSidebar } from './FiltersSidebar';
import { Mail, CheckCircle2, ChevronRight, SlidersHorizontal, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FashionViewProps {
  onAddToCart: (product: Product, size?: string, color?: string) => void;
  searchQuery: string;
}

export const FashionView: React.FC<FashionViewProps> = ({ onAddToCart, searchQuery }) => {
  const [filterState, setFilterState] = useState<FilterState>({
    brands: [],
    sizes: [],
    genders: [],
    minPrice: '',
    maxPrice: '',
    skinTypes: [],
  });

  const [activeSubCategory, setActiveSubCategory] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<string>('featured');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const fashionProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.category === 'fashion');
  }, []);

  const uniqueBrands = useMemo(() => {
    const brands = new Set<string>();
    fashionProducts.forEach((p) => {
      if (p.brand) brands.add(p.brand);
    });
    return Array.from(brands);
  }, [fashionProducts]);

  const uniqueSizes = ['XS', 'S', 'M', 'L', 'XL', 'One Size', '6', '7', '8', '9', '10'];

  const filteredProducts = useMemo(() => {
    let result = [...fashionProducts];

    // Global Search match
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      );
    }

    // Subcategory Filter
    if (activeSubCategory !== 'all') {
      result = result.filter((p) => p.subCategory === activeSubCategory);
    }

    // Price Filter
    if (filterState.minPrice !== '') {
      result = result.filter((p) => p.price >= (filterState.minPrice as number));
    }
    if (filterState.maxPrice !== '') {
      result = result.filter((p) => p.price <= (filterState.maxPrice as number));
    }

    // Brands Filter
    if (filterState.brands.length > 0) {
      result = result.filter((p) => filterState.brands.includes(p.brand));
    }

    // Sizes Filter
    if (filterState.sizes.length > 0) {
      result = result.filter((p) => 
        p.sizes && p.sizes.some((size) => filterState.sizes.includes(size))
      );
    }

    // Rating Filter
    if (filterState.rating !== undefined) {
      result = result.filter((p) => p.rating >= (filterState.rating as number));
    }

    // Sorting
    if (sortOrder === 'price-low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-high-low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [fashionProducts, searchQuery, activeSubCategory, filterState, sortOrder]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setEmailSubscribed(true);
      setEmailInput('');
    }
  };

  const subCategories = [
    { id: 'all', label: 'All Summer Wear' },
    { id: 'dresses', label: 'Dresses' },
    { id: 'shirts', label: 'Shirts' },
    { id: 'shoes', label: 'Shoes' },
    { id: 'accessories', label: 'Accessories' },
  ];

  return (
    <div className="space-y-8 pb-16" id="fashion-view-container">
      
      {/* Fashion Showcase Summer Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-amber-50 shadow-md h-[220px] sm:h-[300px]" id="fashion-hero-banner">
        <div className="absolute inset-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbhvszltnJKCVwHYExZVOZiZxtRFric7WC_awtxXoRW04l1_0EK_gGEfDG6yI4IW74iKfUx08igNdlEJEPZquwJrrF3zTMZUP-Avo-tUHlYPceaUX764XVLo2p5betHvqDA3jEHdt8Rf77nnOl83V_G6KH_dhUgVGpgXTaZEOL44udauHlNagxsfnuNwSCTh-Dk8LaoqsSdmTPlrgt5E1SIfZ3qhTEgKq6vGOFAtk5ePTsD8oWvj_5YR-xQGAJkwPLD0bGIQ1mePGp"
            alt="Summer Trends 2024 Collection"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center opacity-85 hover:scale-102 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-900/45 to-transparent"></div>
        </div>

        <div className="relative h-full flex flex-col justify-center px-6 sm:px-12 text-white max-w-xl">
          <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-amber-300 font-mono">
            SUMMER TRENDS 2024
          </span>
          <h1 className="mt-2 font-black text-3xl sm:text-4xl tracking-tight leading-tight">
            Artisanal Coastal <br />Collective
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-slate-200 leading-relaxed max-w-sm hidden sm:block">
            Breezy sustainable linens, hand-woven soft leather sandals, and sun protection fedoras for your coastal escape.
          </p>
          <div className="mt-5 flex gap-3">
            <button
              onClick={() => setActiveSubCategory('dresses')}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow hover:bg-indigo-700 transition-colors"
              type="button"
            >
              Shop Women
            </button>
            <button
              onClick={() => setActiveSubCategory('shirts')}
              className="rounded-lg bg-white/20 border border-white/25 hover:bg-white/30 px-4 py-2 text-xs font-bold transition-colors"
              type="button"
            >
              Shop Men
            </button>
          </div>
        </div>
      </div>

      {/* Main filter + catalog layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        
        {/* Left Side Filters Pane - Desktop */}
        <div className="hidden lg:block space-y-6">
          
          {/* Shop by Category list selector */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-5">
            <h3 className="font-bold text-xs text-slate-800 uppercase tracking-widest mb-4">Shop by Category</h3>
            <div className="space-y-1.5">
              {subCategories.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => {
                    setActiveSubCategory(sub.id);
                    setIsMobileFiltersOpen(false);
                  }}
                  className={`w-full flex items-center justify-between text-xs py-2 px-3 rounded-lg font-medium transition-all ₹{
                    activeSubCategory === sub.id
                      ? 'bg-indigo-50 text-indigo-600 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                  type="button"
                >
                  <span>{sub.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>
              ))}
            </div>
          </div>

          <FiltersSidebar
            filterState={filterState}
            setFilterState={setFilterState}
            availableBrands={uniqueBrands}
            availableSizes={uniqueSizes}
            category="fashion"
          />
        </div>

        {/* Right side products listing */}
        <div className="lg:col-span-3 space-y-5">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800 text-sm">Summer Fashion</span>
              <span className="text-xs text-slate-400 font-mono">
                Showing {filteredProducts.length} results
              </span>
            </div>

            <div className="flex items-center gap-2.5 self-end sm:self-auto">
              {/* Mobile filter button trigger */}
              <button
                onClick={() => setIsMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                type="button"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg py-2 pl-3 pr-8 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                id="sort-select-fashion"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Catalog grid */}
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-slate-50 border border-dashed border-slate-200 rounded-xl px-4 text-center">
              <div className="text-slate-400 font-bold mb-1 text-sm">No products found</div>
              <p className="text-xs text-slate-500 max-w-xs">We couldn't find matches for your current combination of active filters. Try resetting them.</p>
              <button
                onClick={() => {
                  setFilterState({
                    brands: [],
                    sizes: [],
                    genders: [],
                    minPrice: '',
                    maxPrice: '',
                    skinTypes: [],
                  });
                  setActiveSubCategory('all');
                }}
                className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition-colors"
                type="button"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
              ))}
            </div>
          )}

          {/* Premium Newsletter Box */}
          <div className="bg-slate-900 overflow-hidden rounded-2xl relative shadow-md" id="fashion-newsletter-card">
            <div className="absolute inset-0 opacity-15 mix-blend-overlay">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbhvszltnJKCVwHYExZVOZiZxtRFric7WC_awtxXoRW04l1_0EK_gGEfDG6yI4IW74iKfUx08igNdlEJEPZquwJrrF3zTMZUP-Avo-tUHlYPceaUX764XVLo2p5betHvqDA3jEHdt8Rf77nnOl83V_G6KH_dhUgVGpgXTaZEOL44udauHlNagxsfnuNwSCTh-Dk8LaoqsSdmTPlrgt5E1SIfZ3qhTEgKq6vGOFAtk5ePTsD8oWvj_5YR-xQGAJkwPLD0bGIQ1mePGp"
                alt="Woven backdrop"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative p-6 sm:p-10 text-white text-center max-w-xl mx-auto space-y-4">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mx-auto">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-lg sm:text-xl tracking-tight">Join the Collective</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Unlock exclusive launches, early access to capsule collections, and 10% off your first global order. No spam, just pure craft.
              </p>

              <AnimatePresence mode="wait">
                {!emailSubscribed ? (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubscribe}
                    className="flex flex-col sm:flex-row items-stretch gap-2.5"
                    id="newsletter-subscription-form"
                  >
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      required
                      className="flex-1 bg-slate-800/80 border border-slate-700/80 rounded-lg px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                    <button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-md transition-colors"
                    >
                      Subscribe
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl p-3.5 flex items-center justify-center gap-2 text-xs font-semibold"
                    id="newsletter-success-feedback"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Welcome to the Collective! Check your inbox.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Filters Drawer Overlay */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden" id="mobile-filter-drawer">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs"
            ></motion.div>

            {/* Sidebar drawer content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="absolute inset-y-0 right-0 w-full max-w-sm bg-white p-6 shadow-2xl flex flex-col h-full overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <span className="font-bold text-slate-800 text-sm">Refine Results</span>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="rounded-md text-slate-400 hover:text-slate-600"
                  type="button"
                >
                  Close
                </button>
              </div>

              <div className="flex-1 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Category</span>
                  <div className="grid grid-cols-2 gap-2">
                    {subCategories.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => setActiveSubCategory(sub.id)}
                        className={`text-xs py-2 px-3 rounded-lg font-medium text-center border transition-all ₹{
                          activeSubCategory === sub.id
                            ? 'bg-indigo-50 border-indigo-200 text-indigo-600 font-semibold'
                            : 'bg-slate-50 border-transparent text-slate-600 hover:bg-slate-100'
                        }`}
                        type="button"
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                </div>

                <FiltersSidebar
                  filterState={filterState}
                  setFilterState={setFilterState}
                  availableBrands={uniqueBrands}
                  availableSizes={uniqueSizes}
                  category="fashion"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 mt-6">
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-lg text-xs tracking-wider uppercase transition-colors"
                  type="button"
                >
                  Apply Filters ({filteredProducts.length})
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
