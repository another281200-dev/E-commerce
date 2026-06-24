/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FilterState } from '../types';
import { Star, SlidersHorizontal, RotateCcw } from 'lucide-react';

interface FiltersSidebarProps {
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  availableBrands: string[];
  availableSizes?: string[];
  category: 'electronics' | 'fashion' | 'beauty' | 'home' | 'toys' | 'pet';
}

export const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
  filterState,
  setFilterState,
  availableBrands,
  availableSizes = [],
  category,
}) => {
  const handleBrandChange = (brand: string) => {
    setFilterState((prev) => {
      const isSelected = prev.brands.includes(brand);
      const newBrands = isSelected
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand];
      return { ...prev, brands: newBrands };
    });
  };

  const handleSizeChange = (size: string) => {
    setFilterState((prev) => {
      const isSelected = prev.sizes.includes(size);
      const newSizes = isSelected
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size];
      return { ...prev, sizes: newSizes };
    });
  };

  const handleRatingChange = (rating: number) => {
    setFilterState((prev) => ({
      ...prev,
      rating: prev.rating === rating ? undefined : rating,
    }));
  };

  const handlePriceChange = (field: 'minPrice' | 'maxPrice', value: string) => {
    const num = value === '' ? '' : parseFloat(value);
    setFilterState((prev) => ({
      ...prev,
      [field]: num,
    }));
  };

  const resetFilters = () => {
    setFilterState({
      brands: [],
      sizes: [],
      genders: [],
      minPrice: '',
      maxPrice: '',
      skinTypes: [],
    });
  };

  return (
    <div className="w-full bg-white rounded-xl border border-slate-200/90 p-5 divide-y divide-slate-100" id="filters-sidebar">
      {/* Title block */}
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-2 text-slate-800 font-bold text-sm uppercase tracking-wider">
          <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
          <span>Filters</span>
        </div>
        <button
          onClick={resetFilters}
          className="text-xs text-slate-500 hover:text-indigo-600 font-medium flex items-center gap-1 transition-colors"
          type="button"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Price filter */}
      <div className="py-4">
        <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider mb-3">Price Range</h4>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-3 flex items-center text-xs font-medium text-slate-400">₹</span>
            <input
              type="number"
              placeholder="Min"
              value={filterState.minPrice}
              onChange={(e) => handlePriceChange('minPrice', e.target.value)}
              className="w-full rounded-lg bg-slate-50 border border-slate-200 py-1.5 pl-7 pr-2.5 text-xs focus:bg-white focus:border-indigo-500 focus:outline-none transition-colors"
              id="filter-min-price"
            />
          </div>
          <span className="text-slate-400 text-xs font-bold">&ndash;</span>
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-3 flex items-center text-xs font-medium text-slate-400">₹</span>
            <input
              type="number"
              placeholder="Max"
              value={filterState.maxPrice}
              onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
              className="w-full rounded-lg bg-slate-50 border border-slate-200 py-1.5 pl-7 pr-2.5 text-xs focus:bg-white focus:border-indigo-500 focus:outline-none transition-colors"
              id="filter-max-price"
            />
          </div>
        </div>
      </div>

      {/* Brands filter */}
      {availableBrands.length > 0 && (
        <div className="py-4">
          <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider mb-3">Brand</h4>
          <div className="space-y-2">
            {availableBrands.map((brand) => {
              const isChecked = filterState.brands.includes(brand);
              return (
                <label key={brand} className="flex items-center gap-2.5 text-xs font-medium text-slate-600 hover:text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleBrandChange(brand)}
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>{brand}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Sizes filter (only for fashion category) */}
      {category === 'fashion' && availableSizes.length > 0 && (
        <div className="py-4">
          <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider mb-3">Size</h4>
          <div className="flex flex-wrap gap-1.5">
            {availableSizes.map((size) => {
              const isSelected = filterState.sizes.includes(size);
              return (
                <button
                  key={size}
                  onClick={() => handleSizeChange(size)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all ₹{
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 font-bold shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80'
                  }`}
                  type="button"
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Ratings filter */}
      <div className="py-4">
        <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider mb-3">Customer Review</h4>
        <div className="space-y-2.5">
          {[4.5, 4.0, 3.5].map((ratingThreshold) => {
            const isSelected = filterState.rating === ratingThreshold;
            return (
              <button
                key={ratingThreshold}
                onClick={() => handleRatingChange(ratingThreshold)}
                className={`flex items-center gap-1.5 w-full text-left transition-all ₹{
                  isSelected ? 'text-indigo-600 font-bold' : 'text-slate-600 hover:text-indigo-500'
                }`}
                type="button"
              >
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((starIdx) => (
                    <Star
                      key={starIdx}
                      className={`w-3.5 h-3.5 ₹{
                        starIdx <= Math.floor(ratingThreshold)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs">&amp; Up</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
