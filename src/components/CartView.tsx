/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CartItem, ViewState } from '../types';
import { Trash2, Plus, Minus, Check, ShoppingBag, ArrowLeft, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CartViewProps {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  setView: (view: ViewState) => void;
}

export const CartView: React.FC<CartViewProps> = ({
  cartItems,
  setCartItems,
  setView,
}) => {
  const updateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return { ...item, quantity: Math.max(1, newQty) };
          }
          return item;
        })
    );
  };

  const deleteItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const toggleCheck = (productId: string) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          return { ...item, checked: !item.checked };
        }
        return item;
      })
    );
  };

  const toggleSelectAll = () => {
    const allChecked = cartItems.every((item) => item.checked);
    setCartItems((prev) =>
      prev.map((item) => ({ ...item, checked: !allChecked }))
    );
  };

  const checkedItems = cartItems.filter((item) => item.checked);
  const subtotal = checkedItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const isAllChecked = cartItems.length > 0 && cartItems.every((item) => item.checked);

  return (
    <div className="pb-16 space-y-6" id="cart-view-container">
      {/* View Title */}
      <div>
        <h1 className="font-black text-2xl tracking-tight text-slate-900">Your Shopping Cart</h1>
        <p className="text-xs text-slate-500">Review selected imports and speed parameters before transaction placement.</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white border border-slate-200/80 rounded-2xl p-6 text-center shadow-sm max-w-lg mx-auto">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-4">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h2 className="font-bold text-slate-800 text-sm">Your cart is empty</h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">
            Take a look at our current summer arrivals and next-generation tech and bring home beautiful items today!
          </p>
          <button
            onClick={() => setView('home')}
            className="mt-6 rounded-lg bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 shadow-md transition-all flex items-center gap-2"
            type="button"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* Main items listing - Left Pane */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Control Header block */}
            <div className="flex items-center justify-between bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm">
              <label className="flex items-center gap-3 cursor-pointer text-xs font-bold text-slate-700 uppercase tracking-wider">
                <input
                  type="checkbox"
                  checked={isAllChecked}
                  onChange={toggleSelectAll}
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span>Select All ({cartItems.length} items)</span>
              </label>
              
              <button
                onClick={() => setCartItems([])}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 transition-colors"
                type="button"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Cart</span>
              </button>
            </div>

            {/* List of Cart Items */}
            <div className="space-y-4">
              <AnimatePresence initial={false}>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.2 }}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border rounded-xl p-4 shadow-sm transition-colors ₹{
                      item.checked ? 'border-indigo-100 bg-indigo-50/15' : 'border-slate-200/80'
                    }`}
                    id={`cart-item-₹{item.product.id}`}
                  >
                    
                    {/* Checkbox and Product Details block */}
                    <div className="flex items-start gap-3 sm:gap-4 flex-1">
                      <div className="pt-4 flex-shrink-0">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => toggleCheck(item.product.id)}
                          className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                        />
                      </div>

                      {/* Product image */}
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      {/* Title, description, size/color info */}
                      <div className="flex-1 space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-xs sm:text-sm text-slate-800 line-clamp-1">
                            {item.product.name}
                          </h3>
                        </div>
                        <p className="text-[10px] sm:text-xs text-slate-400 font-mono">
                          Brand: {item.product.brand}
                        </p>
                        
                        {/* Display color or size selection if exists */}
                        <div className="flex flex-wrap gap-2 pt-1 text-[10px]">
                          {item.selectedSize && (
                            <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 font-medium text-slate-600">
                              Size: {item.selectedSize}
                            </span>
                          )}
                          {item.selectedColor && (
                            <span className="inline-flex items-center rounded bg-indigo-50 px-2 py-0.5 font-medium text-indigo-600">
                              Color: {item.selectedColor}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Price and quantity controls - Right side */}
                    <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3 pl-7 sm:pl-0">
                      {/* Price info */}
                      <div className="text-left sm:text-right">
                        <span className="block font-bold text-sm sm:text-base text-slate-900 font-sans">
                          ₹{(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        {item.quantity > 1 && (
                          <span className="block text-[10px] text-slate-400 font-mono">
                            (₹{item.product.price.toFixed(2)} each)
                          </span>
                        )}
                      </div>

                      {/* Quantity select, delete buttons */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-1">
                          <button
                            onClick={() => updateQuantity(item.product.id, -1)}
                            className="flex h-6 w-6 items-center justify-center rounded-md hover:bg-white text-slate-500 hover:text-indigo-600 transition-colors"
                            type="button"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-extrabold text-slate-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-md hover:bg-white text-slate-500 hover:text-indigo-600 transition-colors"
                            type="button"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Trash button */}
                        <button
                          onClick={() => deleteItem(item.product.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-rose-500 hover:bg-rose-50 hover:border-rose-200 transition-all"
                          type="button"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
          </div>

          {/* Checkout Invoice summary block - Right Pane */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm h-fit space-y-6" id="cart-summary-invoice">
            <h3 className="font-extrabold text-xs text-slate-800 uppercase tracking-widest pb-3 border-b border-slate-100">
              Order Subtotal
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Items checked</span>
                <span className="font-semibold">{checkedItems.length}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Shipping speed</span>
                <span className="font-semibold text-emerald-600">Calculated next step</span>
              </div>
              
              <div className="border-t border-slate-100 pt-3 flex justify-between items-baseline">
                <span className="text-sm font-bold text-slate-800">Total subtotal</span>
                <span className="text-xl font-extrabold text-indigo-600 font-sans">
                  ₹{subtotal.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => setView('checkout')}
                disabled={checkedItems.length === 0}
                className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none transition-all flex items-center justify-center gap-2"
                type="button"
              >
                <Lock className="w-4 h-4" />
                <span>Proceed to Checkout</span>
              </button>

              <button
                onClick={() => setView('home')}
                className="w-full text-center text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
                type="button"
              >
                Continue Shopping
              </button>
            </div>

            <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200/50 flex gap-2.5 text-[10px] text-slate-500 leading-relaxed">
              <Lock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>We protect your card data using industry-standard AES encryption keys. Complete checkout on our secure ledger.</span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
