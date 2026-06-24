/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Product, FilterState } from '../types';
import { PRODUCTS } from '../data';
import { ProductCard } from './ProductCard';
import { FiltersSidebar } from './FiltersSidebar';
import { ChevronRight, SlidersHorizontal, Cpu, ShieldCheck, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ElectronicsViewProps {
  onAddToCart: (product: Product, size?: string, color?: string) => void;
  searchQuery: string;
}

export const ElectronicsView: React.FC<ElectronicsViewProps> = ({ onAddToCart, searchQuery }) => {
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

  const electronicsProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.category === 'electronics');
  }, []);

  const uniqueBrands = useMemo(() => {
    const brands = new Set<string>();
    electronicsProducts.forEach((p) => {
      if (p.brand) brands.add(p.brand);
    });
    return Array.from(brands);
  }, [electronicsProducts]);

  const filteredProducts = useMemo(() => {
    let result = [...electronicsProducts];

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
  }, [electronicsProducts, searchQuery, activeSubCategory, filterState, sortOrder]);

  const subCategories = [
    { id: 'all', label: 'All Next-Gen Tech' },
    { id: 'laptops', label: 'Laptops' },
    { id: 'phones', label: 'Smartphones' },
    { id: 'headphones', label: 'Audio & Headwear' },
    { id: 'tablets', label: 'Tablets' },
    { id: 'cameras', label: 'Mirrorless Cameras' },
  ];

  return (
    <div className="space-y-8 pb-16" id="electronics-view-container">
      
      {/* Electronics Premium Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-900 shadow-md h-[220px] sm:h-[300px]" id="electronics-hero-banner">
        <div className="absolute inset-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_PykFakvG3e05DluDgWdgvb3r0kSVvgNHNDOOVSGRGI0MtO2C9MKjbQeQ5YQh8crbrK8etuO9fXn_2pRW40dScktpaKSpqkovP2_S_vcc3GzJbARl0S4xWZ8YACybiLZS5CM3XJxzAzwM2dZikFN6KBKmnHWlOX0SWNUR8n-fdURm5m0LBDNL_HwdqX9qZPHyUMAmIjs1lFDCJJBMdd3fx9H9CLYaxa7XRYnVXIbErcLZMBnSHLQUAeB2mcoVyXDwrNdUeZF1brOk"
            alt="Next-Gen Tech Collection"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center opacity-85 hover:scale-102 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-900/40 to-transparent"></div>
        </div>

        <div className="relative h-full flex flex-col justify-center px-6 sm:px-12 text-white max-w-xl">
          <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-blue-400 font-mono flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5" />
            <span>Next-Gen Tech</span>
          </span>
          <h1 className="mt-2 font-black text-3xl sm:text-4xl tracking-tight leading-tight">
            Advanced Personal <br />Workspace
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-slate-200 leading-relaxed max-w-sm hidden sm:block">
            M3 workstation laptops, titanium-built smartphones, active noise cancellation headphones, and ultra-high dynamic range tablets.
          </p>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        
        {/* Sidebar filters - Desktop */}
        <div className="hidden lg:block space-y-6">
          {/* Shop by Subcategory */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-5">
            <h3 className="font-bold text-xs text-slate-800 uppercase tracking-widest mb-4">Department</h3>
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
                      ? 'bg-blue-50 text-blue-600 font-semibold'
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
            category="electronics"
          />
        </div>

        {/* Right side products list */}
        <div className="lg:col-span-3 space-y-5">
          
          {/* Controls row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800 text-sm">Tech &amp; Electronics</span>
              <span className="text-xs text-slate-400 font-mono">
                Showing {filteredProducts.length} results
              </span>
            </div>

            <div className="flex items-center gap-2.5 self-end sm:self-auto">
              {/* Mobile trigger */}
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
                className="bg-slate-50 border border-slate-200 rounded-lg py-2 pl-3 pr-8 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                id="sort-select-electronics"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Catalog list stage */}
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-slate-50 border border-dashed border-slate-200 rounded-xl px-4 text-center">
              <div className="text-slate-400 font-bold mb-1 text-sm">No electronics items found</div>
              <p className="text-xs text-slate-500 max-w-xs">We couldn't match your search keywords or price specifications. Try clearing options.</p>
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
                className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition-colors"
                type="button"
              >
                Reset Electronics Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
              ))}
            </div>
          )}

          {/* Secure Guarantee Callout Banner */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <ShieldCheck className="w-5.5 h-5.5" />
              </div>
              <div className="text-left">
                <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider">Extended Global Warranty</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed max-w-md">Every electronic product imported carries a standard 2-year worry-free warranty, covering accidental hardware defects with fast international replacements.</p>
              </div>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-indigo-600 font-bold">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Priority Expedited Delivery Available</span>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden" id="mobile-electronics-filters">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs"
            ></motion.div>

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="absolute inset-y-0 right-0 w-full max-w-sm bg-white p-6 shadow-2xl flex flex-col h-full overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <span className="font-bold text-slate-800 text-sm">Refine Tech</span>
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
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">By Department</span>
                  <div className="grid grid-cols-2 gap-2">
                    {subCategories.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => setActiveSubCategory(sub.id)}
                        className={`text-xs py-2 px-3 rounded-lg font-medium text-center border transition-all ₹{
                          activeSubCategory === sub.id
                            ? 'bg-blue-50 border-blue-200 text-blue-600 font-semibold'
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
                  category="electronics"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 mt-6">
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg text-xs tracking-wider uppercase transition-colors"
                  type="button"
                >
                  Apply Tech Filters ({filteredProducts.length})
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
