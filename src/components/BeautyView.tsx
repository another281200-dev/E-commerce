/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Product, FilterState } from '../types';
import { PRODUCTS } from '../data';
import { ProductCard } from './ProductCard';
import { FiltersSidebar } from './FiltersSidebar';
import { SlidersHorizontal, Leaf, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BeautyViewProps {
  onAddToCart: (product: Product, size?: string, color?: string) => void;
  searchQuery: string;
}

export const BeautyView: React.FC<BeautyViewProps> = ({ onAddToCart, searchQuery }) => {
  const [filterState, setFilterState] = useState<FilterState>({
    brands: [],
    sizes: [],
    genders: [],
    minPrice: '',
    maxPrice: '',
    skinTypes: [],
  });

  const [activeConcern, setActiveConcern] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<string>('featured');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const beautyProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.category === 'beauty');
  }, []);

  const uniqueBrands = useMemo(() => {
    const brands = new Set<string>();
    beautyProducts.forEach((p) => {
      if (p.brand) brands.add(p.brand);
    });
    return Array.from(brands);
  }, [beautyProducts]);

  const filteredProducts = useMemo(() => {
    let result = [...beautyProducts];

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

    // Concern tag filter
    if (activeConcern !== 'all') {
      result = result.filter(
        (p) => p.tags && p.tags.some((t) => t.toLowerCase().includes(activeConcern))
      );
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
  }, [beautyProducts, searchQuery, activeConcern, filterState, sortOrder]);

  const concernsList = [
    { id: 'all', label: 'All Essentials' },
    { id: 'anti-aging', label: 'Anti-Aging' },
    { id: 'brightening', label: 'Brightening' },
    { id: 'matte', label: 'Velvet Matte' },
    { id: 'perfume', label: 'Artisan Scent' },
  ];

  return (
    <div className="space-y-8 pb-16" id="beauty-view-container">
      
      {/* Eco-conscious Glow Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-pink-50 shadow-md h-[220px] sm:h-[300px]" id="beauty-hero-banner">
        <div className="absolute inset-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlg1hegTn6y-_oe01Vdb9Sj3_EcPIpbkijpt5YNI-uyn8LEF7JAHA48ABMK2hvedM5Fyb3mszFleQCaV5y9zsKVHgsvNaEODVLUdIeiFdSxskpolVhwcJo6HXYru71qNRuvn4l08H3sS-o7eXTdubzoD0rT2VOhNUa4kgTZspfm6JSGHyh9UhNde3B_7eDH9mHUtVuI4MIEO3tm5IVByKk7Tw19kc4zg3JZlYRVwSv7LKKKKm3CBIz38_3cc0krVM4cx-nHNf2ZrVI"
            alt="Eco-conscious Glow Collection"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center opacity-85 hover:scale-102 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-900/40 to-transparent"></div>
        </div>

        <div className="relative h-full flex flex-col justify-center px-6 sm:px-12 text-white max-w-xl">
          <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-pink-300 font-mono flex items-center gap-1">
            <Leaf className="w-3.5 h-3.5" />
            <span>Eco-conscious Glow</span>
          </span>
          <h1 className="mt-2 font-black text-3xl sm:text-4xl tracking-tight leading-tight">
            Advanced Botanic <br />Skincare
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-slate-200 leading-relaxed max-w-sm hidden sm:block">
            Formulated with certified organic elements, 100% vegan extracts, and dermatologically tested time-release pure active ingredients.
          </p>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        
        {/* Sidebar filters - Desktop */}
        <div className="hidden lg:block space-y-6">
          {/* Shop by Concern tab selection list */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-5">
            <h3 className="font-bold text-xs text-slate-800 uppercase tracking-widest mb-4">Shop by Concern</h3>
            <div className="space-y-1.5">
              {concernsList.map((concern) => (
                <button
                  key={concern.id}
                  onClick={() => {
                    setActiveConcern(concern.id);
                    setIsMobileFiltersOpen(false);
                  }}
                  className={`w-full flex items-center justify-between text-xs py-2 px-3 rounded-lg font-medium transition-all ₹{
                    activeConcern === concern.id
                      ? 'bg-pink-50 text-pink-600 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                  type="button"
                >
                  <span className="capitalize">{concern.label}</span>
                </button>
              ))}
            </div>
          </div>

          <FiltersSidebar
            filterState={filterState}
            setFilterState={setFilterState}
            availableBrands={uniqueBrands}
            category="beauty"
          />
        </div>

        {/* Right side products listing */}
        <div className="lg:col-span-3 space-y-5">
          
          {/* Top Control Panel */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800 text-sm">Beauty Apothecary</span>
              <span className="text-xs text-slate-400 font-mono">
                Showing {filteredProducts.length} results
              </span>
            </div>

            <div className="flex items-center gap-2.5 self-end sm:self-auto">
              {/* Mobile filters activator */}
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
                className="bg-slate-50 border border-slate-200 rounded-lg py-2 pl-3 pr-8 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-pink-500 cursor-pointer"
                id="sort-select-beauty"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Product grid stage */}
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-slate-50 border border-dashed border-slate-200 rounded-xl px-4 text-center">
              <AlertCircle className="w-8 h-8 text-slate-400 mb-2" />
              <div className="text-slate-400 font-bold mb-1 text-sm">No beauty items found</div>
              <p className="text-xs text-slate-500 max-w-xs">Try clearing some of your price, rating, or brand selections to expand the search results.</p>
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
                  setActiveConcern('all');
                }}
                className="mt-4 rounded-lg bg-pink-600 px-4 py-2 text-xs font-bold text-white hover:bg-pink-700 transition-colors"
                type="button"
              >
                Reset Beauty Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
              ))}
            </div>
          )}

          {/* Certifications Row */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 grid grid-cols-1 gap-6 sm:grid-cols-3 text-center">
            <div className="space-y-1.5">
              <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <Leaf className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">100% Cruelty-Free</h4>
              <p className="text-[10px] text-slate-500 leading-relaxed">Leaping Bunny certified, never tested on animals, and formulated ethically.</p>
            </div>
            <div className="space-y-1.5">
              <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-pink-100 text-pink-600">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">Clean Formulations</h4>
              <p className="text-[10px] text-slate-500 leading-relaxed">Sulfate-free, paraben-free, artificial dye-free, and phthalate-free promise.</p>
            </div>
            <div className="space-y-1.5">
              <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <Leaf className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">Sustainable Packaging</h4>
              <p className="text-[10px] text-slate-500 leading-relaxed">Fully recyclable UV-protective amber glass vessels and soy ink printed sleeves.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden" id="mobile-beauty-filters">
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
                <span className="font-bold text-slate-800 text-sm">Refine Skincare</span>
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
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">By Concern</span>
                  <div className="grid grid-cols-2 gap-2">
                    {concernsList.map((concern) => (
                      <button
                        key={concern.id}
                        onClick={() => setActiveConcern(concern.id)}
                        className={`text-xs py-2 px-3 rounded-lg font-medium text-center border transition-all ₹{
                          activeConcern === concern.id
                            ? 'bg-pink-50 border-pink-200 text-pink-600 font-semibold'
                            : 'bg-slate-50 border-transparent text-slate-600 hover:bg-slate-100'
                        }`}
                        type="button"
                      >
                        {concern.label}
                      </button>
                    ))}
                  </div>
                </div>

                <FiltersSidebar
                  filterState={filterState}
                  setFilterState={setFilterState}
                  availableBrands={uniqueBrands}
                  category="beauty"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 mt-6">
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2.5 rounded-lg text-xs tracking-wider uppercase transition-colors"
                  type="button"
                >
                  Apply Skincare Filters ({filteredProducts.length})
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
