/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { CartItem, ViewState } from '../types';
import { HelpCircle, CheckCircle, ArrowLeft, ShieldCheck, MapPin, CreditCard, Tag, Sparkles, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CheckoutViewProps {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  setView: (view: ViewState) => void;
  authUser: { id: string; name: string; email: string } | null;
  isAuthenticated: boolean;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  cartItems,
  setCartItems,
  setView,
  authUser,
  isAuthenticated,
}) => {
  // Address form fields
  const [address, setAddress] = useState({
    fullName: 'Jane Doe',
    street: '1248 Alpine Summit Trail',
    city: 'Seattle',
    state: 'WA',
    zip: '98101',
    country: 'United States',
  });

  // Payment form fields
  const [payment, setPayment] = useState({
    cardName: 'JANE DOE',
    cardNumber: '4111 2222 3333 4444',
    expiry: '12/28',
    cvv: '',
  });

  // Interactive configurations
  const [shippingSpeed, setShippingSpeed] = useState<'standard' | 'express' | 'priority'>('standard');
  const [promoInput, setPromoInput] = useState('');
  const [activeDiscount, setActiveDiscount] = useState<{ code: string; percent?: number; amount?: number } | null>(null);
  const [promoError, setPromoError] = useState('');
  const [showCvvTip, setShowCvvTip] = useState(false);
  const [formErrors, setFormErrors] = useState<{ cvv?: string; fullName?: string }>({});
  const [sessionValid, setSessionValid] = useState<boolean | null>(null);
  const [sessionError, setSessionError] = useState('');
  const [sessionExpiry, setSessionExpiry] = useState('');

  // Success Modal Overlay
  const [orderComplete, setOrderComplete] = useState(false);
  const [generatedOrderNumber, setGeneratedOrderNumber] = useState('');

  // Calculations
  const checkedItems = cartItems.filter((item) => item.checked);
  const itemsSubtotal = checkedItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const shippingCost = {
    standard: 0.00,
    express: 15.00,
    priority: 35.00,
  }[shippingSpeed];

  const discountAmount = useMemoAmount();
  function useMemoAmount() {
    if (!activeDiscount) return 0;
    if (activeDiscount.percent) {
      return itemsSubtotal * (activeDiscount.percent / 100);
    }
    if (activeDiscount.amount) {
      return activeDiscount.amount;
    }
    return 0;
  }

  const grandTotal = Math.max(0, itemsSubtotal + shippingCost - discountAmount);

  useEffect(() => {
    const validateSession = async () => {
      if (!isAuthenticated) {
        setSessionValid(false);
        setSessionError('You must be signed in to complete checkout.');
        return;
      }

      const token = localStorage.getItem('authToken');
      if (!token) {
        setSessionValid(false);
        setSessionError('Authentication token not found. Please sign in again.');
        return;
      }

      try {
        const response = await fetch('/api/auth/validate', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error('Session expired or invalid.');
        }

        const data = await response.json();
        setSessionValid(Boolean(data.valid));
        setSessionExpiry(data.expiresAt || '');
      } catch (error) {
        setSessionValid(false);
        setSessionError(error instanceof Error ? error.message : 'Unable to validate session.');
      }
    };

    validateSession();
  }, [isAuthenticated]);

  const applyPromoCode = () => {
    setPromoError('');
    const code = promoInput.trim().toUpperCase();
    if (code === 'SAVE10') {
      setActiveDiscount({ code: 'SAVE10', percent: 10 });
      setPromoInput('');
    } else if (code === 'WELCOME') {
      setActiveDiscount({ code: 'WELCOME', amount: 15.00 });
      setPromoInput('');
    } else {
      setPromoError('Invalid code! Try "SAVE10" or "WELCOME"');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionValid) {
      setSessionError('Please sign in and validate your session before placing an order.');
      return;
    }
    const errors: { cvv?: string; fullName?: string } = {};

    if (!payment.cvv || payment.cvv.length < 3) {
      errors.cvv = 'CVV must be 3 or 4 digits';
    }
    if (!address.fullName.trim()) {
      errors.fullName = 'Full recipient name is required';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    // Generate order number and prompt complete modal
    const mockOrderNum = `GM-₹{Math.floor(100000 + Math.random() * 900000)}-US`;
    setGeneratedOrderNumber(mockOrderNum);
    setOrderComplete(true);
  };

  const finishCheckoutSuccess = () => {
    // Clear items that were purchased (checked)
    setCartItems((prev) => prev.filter((item) => !item.checked));
    setView('home');
  };

  if (sessionValid === false) {
    return (
      <div className="pb-16 space-y-6" id="checkout-view-container">
        <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-center shadow-sm">
          <h1 className="text-2xl font-extrabold text-rose-800">Authentication Required</h1>
          <p className="mt-3 text-sm text-rose-700">
            {sessionError || 'Please sign in to continue with checkout.'}
          </p>
          <button
            type="button"
            onClick={() => setView('login')}
            className="mt-6 inline-flex items-center justify-center rounded-2xl bg-rose-600 px-6 py-3 text-sm font-semibold text-white hover:bg-rose-700 transition-colors"
          >
            Sign in to continue
          </button>
        </div>
      </div>
    );
  }

  if (sessionValid === null) {
    return (
      <div className="pb-16 flex min-h-[50vh] items-center justify-center">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm text-center">
          <p className="text-sm text-slate-500">Validating your secure session before checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-16 space-y-6" id="checkout-view-container">
      
      {/* Header breadcrumb */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setView('cart')}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-indigo-600 transition-colors shadow-xs"
            type="button"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="font-black text-2xl tracking-tight text-slate-900">Secure Checkout</h1>
            <p className="text-xs text-slate-500 font-mono text-emerald-600">Secure ledger connectivity authenticated</p>
            {authUser && (
              <p className="mt-1 text-xs text-slate-500">Signed in as <span className="font-semibold text-slate-900">{authUser.name.split(' ')[0]}</span></p>
            )}
          </div>
        </div>
        {sessionExpiry && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            Session expires at {new Date(sessionExpiry).toLocaleString()}.
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        
        {/* Forms stage - Left Pane */}
        <form onSubmit={handlePlaceOrder} className="lg:col-span-2 space-y-6" id="checkout-main-form">
          
          {/* Shipping Address Section */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <MapPin className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider">1. Shipping Address</h3>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Recipient Full Name</label>
                <input
                  type="text"
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  className={`w-full rounded-lg bg-slate-50 border py-2.5 px-3 text-xs focus:bg-white focus:outline-none transition-colors ₹{
                    formErrors.fullName ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-indigo-500'
                  }`}
                  required
                />
                {formErrors.fullName && (
                  <p className="mt-1 text-[10px] font-semibold text-rose-500">{formErrors.fullName}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Street Address</label>
                <input
                  type="text"
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  className="w-full rounded-lg bg-slate-50 border border-slate-200 py-2.5 px-3 text-xs focus:bg-white focus:border-indigo-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">City</label>
                <input
                  type="text"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="w-full rounded-lg bg-slate-50 border border-slate-200 py-2.5 px-3 text-xs focus:bg-white focus:border-indigo-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">State / Prov</label>
                  <input
                    type="text"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="w-full rounded-lg bg-slate-50 border border-slate-200 py-2.5 px-3 text-xs focus:bg-white focus:border-indigo-500 focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">ZIP / Postal</label>
                  <input
                    type="text"
                    value={address.zip}
                    onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                    className="w-full rounded-lg bg-slate-50 border border-slate-200 py-2.5 px-3 text-xs focus:bg-white focus:border-indigo-500 focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Delivery speed section */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider">2. Delivery Speed</h3>
            </div>

            <div className="space-y-2.5">
              {[
                { id: 'standard', title: 'Standard shipping', desc: 'Arrives in 5-8 business days', cost: 'FREE' },
                { id: 'express', title: 'Express shipping', desc: 'Arrives in 2-3 business days', cost: '₹15.00' },
                { id: 'priority', title: 'Priority overnight', desc: 'Arrives in 24 hours guaranteed', cost: '₹35.00' },
              ].map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center justify-between p-3.5 border rounded-xl cursor-pointer transition-all ₹{
                    shippingSpeed === opt.id
                      ? 'border-indigo-500 bg-indigo-50/20'
                      : 'border-slate-200/80 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping_speed"
                      value={opt.id}
                      checked={shippingSpeed === opt.id}
                      onChange={() => setShippingSpeed(opt.id as any)}
                      className="h-4 w-4 border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                    <div className="text-left">
                      <span className="block text-xs font-bold text-slate-800">{opt.title}</span>
                      <span className="block text-[11px] text-slate-500">{opt.desc}</span>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-slate-900 font-sans">{opt.cost}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Payment Card Section */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <CreditCard className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider">3. Payment Information</h3>
            </div>

            {/* Visual Credit Card Preview Container */}
            <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-indigo-900 p-6 text-white shadow-md max-w-sm overflow-hidden" id="card-graphic-preview">
              <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-indigo-500/10 blur-xl"></div>
              <div className="flex justify-between items-start mb-8">
                <div>
                  <span className="block text-[10px] uppercase font-mono tracking-widest text-indigo-300">Global Ledger card</span>
                  <span className="text-lg font-black tracking-tight">Visa Signature</span>
                </div>
                <div className="h-9 w-12 bg-white/10 rounded-md backdrop-blur-xs border border-white/10 flex items-center justify-center font-bold text-xs">
                  VISA
                </div>
              </div>

              <div className="space-y-4">
                <span className="block font-mono text-base tracking-widest sm:text-lg">
                  {payment.cardNumber || '•••• •••• •••• ••••'}
                </span>

                <div className="flex justify-between text-[11px] font-mono">
                  <div>
                    <span className="block text-[8px] uppercase tracking-wider text-indigo-300">Cardholder</span>
                    <span className="font-bold uppercase tracking-wide truncate max-w-[150px]">
                      {payment.cardName || 'YOUR FULL NAME'}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[8px] uppercase tracking-wider text-indigo-300">Expires</span>
                    <span className="font-bold">{payment.expiry || 'MM/YY'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Fields for payment details */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Cardholder Name</label>
                <input
                  type="text"
                  value={payment.cardName}
                  onChange={(e) => setPayment({ ...payment, cardName: e.target.value })}
                  className="w-full rounded-lg bg-slate-50 border border-slate-200 py-2.5 px-3 text-xs focus:bg-white focus:border-indigo-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Card Number</label>
                <input
                  type="text"
                  value={payment.cardNumber}
                  onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                  className="w-full rounded-lg bg-slate-50 border border-slate-200 py-2.5 px-3 text-xs focus:bg-white focus:border-indigo-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={payment.expiry}
                  onChange={(e) => setPayment({ ...payment, expiry: e.target.value })}
                  className="w-full rounded-lg bg-slate-50 border border-slate-200 py-2.5 px-3 text-xs focus:bg-white focus:border-indigo-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  <span>CVV Code</span>
                  <button
                    type="button"
                    onClick={() => setShowCvvTip(!showCvvTip)}
                    className="text-slate-400 hover:text-indigo-600 cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                </label>

                <div className="relative">
                  <input
                    type="password"
                    placeholder="123"
                    maxLength={4}
                    value={payment.cvv}
                    onChange={(e) => setPayment({ ...payment, cvv: e.target.value })}
                    className={`w-full rounded-lg bg-slate-50 border py-2.5 px-3 text-xs focus:bg-white focus:outline-none transition-colors ₹{
                      formErrors.cvv ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-indigo-500'
                    }`}
                    required
                  />
                  {formErrors.cvv && (
                    <p className="mt-1 text-[10px] font-semibold text-rose-500">{formErrors.cvv}</p>
                  )}
                </div>

                <AnimatePresence>
                  {showCvvTip && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute z-20 mt-1 bg-slate-900 text-white rounded-lg p-3 text-[10px] leading-relaxed max-w-xs shadow-md border border-slate-700"
                      id="cvv-explanation-tooltip"
                    >
                      The CVV (Card Verification Value) is the 3-digit number on the signature stripe of Visa/MC, or the 4-digit number on the front of Amex.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

        </form>

        {/* Invoice calculations summary block - Right Pane */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm h-fit space-y-6" id="checkout-invoice-pane">
          <h3 className="font-extrabold text-xs text-slate-800 uppercase tracking-widest pb-3 border-b border-slate-100">
            Order Review
          </h3>

          {/* Quick list preview of checked items being purchased */}
          <div className="space-y-3.5 max-h-48 overflow-y-auto scrollbar-thin">
            {checkedItems.map((item) => (
              <div key={item.product.id} className="flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 overflow-hidden rounded border bg-slate-50 shrink-0">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <span className="block font-semibold text-slate-800 truncate max-w-[130px]">
                      {item.product.name}
                    </span>
                    <span className="block text-[10px] text-slate-400 font-mono">
                      Qty: {item.quantity}
                    </span>
                  </div>
                </div>
                <span className="font-bold text-slate-900 font-sans">
                  ₹{(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Promo code block */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Promo Code</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="SAVE10 or WELCOME"
                value={promoInput}
                onChange={(e) => {
                  setPromoInput(e.target.value);
                  setPromoError('');
                }}
                className="flex-1 rounded-lg bg-slate-50 border border-slate-200 py-1.5 px-3 text-xs focus:bg-white focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                type="button"
                onClick={applyPromoCode}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-1.5 px-3 rounded-lg shadow-sm transition-colors"
              >
                Apply
              </button>
            </div>
            {promoError && (
              <p className="text-[10px] font-semibold text-rose-500">{promoError}</p>
            )}
            
            {activeDiscount && (
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/50 px-2.5 py-1 text-[10px] font-bold text-emerald-600">
                <Check className="w-3 h-3 text-emerald-600" />
                <span>Discount applied: "{activeDiscount.code}" (-₹{discountAmount.toFixed(2)})</span>
              </div>
            )}
          </div>

          {/* Checkout calculations breakdown */}
          <div className="space-y-3.5 text-xs pt-4 border-t border-slate-100">
            <div className="flex justify-between text-slate-500">
              <span>Items Total ({checkedItems.length})</span>
              <span className="font-semibold font-sans">₹{itemsSubtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-slate-500">
              <span>Delivery Charges</span>
              <span className="font-semibold font-sans">
                {shippingCost === 0 ? 'FREE' : `₹₹{shippingCost.toFixed(2)}`}
              </span>
            </div>

            {activeDiscount && (
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>Promo Discount</span>
                <span className="font-sans">&ndash;₹{discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="border-t border-slate-100 pt-3 flex justify-between items-baseline">
              <span className="text-sm font-extrabold text-slate-800">Grand total</span>
              <span className="text-xl font-extrabold text-indigo-600 font-sans">
                ₹{grandTotal.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handlePlaceOrder}
              className="w-full rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:shadow-indigo-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
              type="button"
            >
              <span>Place your order</span>
            </button>
            <p className="text-[10px] text-center text-slate-400 mt-2.5 font-mono">Secure transactional connection standard</p>
          </div>
        </div>

      </div>

      {/* Checkout Successful Modal Overlay */}
      <AnimatePresence>
        {orderComplete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="success-modal-overlay">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm"
            ></motion.div>

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="relative max-w-md w-full bg-white rounded-2xl p-6 sm:p-8 text-center shadow-2xl overflow-hidden border border-slate-100"
            >
              <div className="absolute top-0 inset-x-0 h-2.5 bg-indigo-600"></div>

              {/* Animated green check circle */}
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-5">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>

              <h2 className="font-extrabold text-xl text-slate-950 tracking-tight">Order Placed Successfully!</h2>
              <p className="text-xs text-slate-500 mt-1.5">Thank you for shopping at GlobalMarket. Your custom import has been ledgered.</p>

              {/* Order specifications sheet */}
              <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-4.5 text-left text-xs my-6 space-y-2.5 font-mono">
                <div className="flex justify-between border-b border-slate-200/55 pb-2">
                  <span className="text-slate-400">Order Number</span>
                  <span className="font-bold text-slate-800">{generatedOrderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Recipient</span>
                  <span className="font-bold text-slate-800">{address.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Est. Arrival</span>
                  <span className="font-bold text-slate-800 text-emerald-600">
                    {shippingSpeed === 'standard' ? '5-8 business days' : shippingSpeed === 'express' ? '2-3 business days' : 'Priority (24 hours)'}
                  </span>
                </div>
                <div className="flex justify-between border-t border-slate-200/55 pt-2 font-sans font-bold">
                  <span className="text-slate-700">Total Charged</span>
                  <span className="text-sm text-indigo-600">₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={finishCheckoutSuccess}
                className="w-full rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white shadow-md hover:bg-indigo-700 transition-colors"
                type="button"
              >
                Return to GlobalMarket Home
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
