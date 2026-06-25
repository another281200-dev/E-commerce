import React from 'react';

export const ProductCard = ({ product, onAddToCart }) => {
  const handleAdd = () => {
    onAddToCart(product, product.sizes?.[0] ?? null, product.colors?.[0] ?? null);
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="aspect-4/3 overflow-hidden bg-slate-100">
        <img
          src={product.imageUrl || 'https://via.placeholder.com/400'}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="text-xs uppercase tracking-[0.24em] text-slate-500">{product.brand}</div>
        <h3 className="mt-3 text-lg font-semibold text-slate-900">{product.name}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{product.description}</p>
        <div className="mt-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xl font-bold text-slate-900">₹{product.price.toFixed(2)}</p>
            {product.listPrice && (
              <p className="text-sm text-slate-500 line-through">₹{product.listPrice.toFixed(2)}</p>
            )}
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
