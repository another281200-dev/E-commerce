import React, { useEffect, useState } from 'react';

export const CheckoutView = ({ cartItems, setCartItems, setView, authUser }) => {
  const checkedItems = cartItems.filter((item) => item.checked !== false);
  const subtotal = checkedItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    if (!authUser) {
      setView('login');
      return;
    }
    setCartItems((previous) => previous.filter((item) => item.checked === false));
    setOrderPlaced(true);
  };

  if (!authUser) {
    return (
      <div className="rounded-3xl bg-white p-10 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Please sign in</h1>
        <p className="mt-3 text-sm text-slate-600">You need to sign in to complete checkout.</p>
        <button type="button" onClick={() => setView('login')} className="mt-6 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700">
          Sign In
        </button>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="rounded-3xl bg-white p-10 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Order Confirmed</h1>
        <p className="mt-3 text-sm text-slate-600">Thank you for your purchase. Your order is now being processed.</p>
        <button type="button" onClick={() => setView('home')} className="mt-6 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Secure Checkout</h1>
        <form onSubmit={handlePlaceOrder} className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-800">Shipping Address</label>
            <input type="text" placeholder="Full Name" className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-800">Payment Details</label>
            <input type="text" placeholder="Card number" className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm" required />
          </div>
          <button type="submit" className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700">
            Place Order - ₹{subtotal.toFixed(2)}
          </button>
        </form>
      </div>
      <aside className="rounded-3xl bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Order Summary</h2>
        <div className="mt-6 space-y-4 text-sm text-slate-600">
          <div className="flex justify-between">
            <span>Items</span>
            <span>{checkedItems.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
        </div>
      </aside>
    </div>
  );
};
