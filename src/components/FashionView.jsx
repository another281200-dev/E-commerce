import React, { useMemo } from 'react';
import { PRODUCTS } from '../data';
import { ProductCard } from './ProductCard';

export const FashionView = ({ onAddToCart, searchQuery }) => {
  const products = useMemo(() => {
    return PRODUCTS.filter((product) => product.category === 'fashion').filter((product) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Fashion</h1>
        <p className="mt-2 text-sm text-slate-600">Explore seasonal styles and refined wardrobe essentials.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
};
