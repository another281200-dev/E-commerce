import React from 'react';

export const CartView = ({ cartItems, setCartItems, setView, authUser }) => {
  const updateQuantity = (productId, delta) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.product.id !== productId) return item;
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      })
    );
  };

  const removeItem = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const checkedItems = cartItems.filter((item) => item.checked !== false);
  const subtotal = checkedItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const handleCheckout = () => {
    if (!authUser) {
      setView('login');
      return;
    }
    setView('checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-10 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Your cart is empty</h1>
        <p className="mt-3 text-sm text-slate-600">Add items from the catalog to start checkout.</p>
        <button type="button" onClick={() => setView('home')} className="mt-6 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
      <div className="space-y-6 rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Shopping Cart</h1>
        {cartItems.map((item) => (
          <div key={item.product.id} className="rounded-3xl border border-slate-200 p-5">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-slate-900">{item.product.name}</h2>
                <p className="mt-1 text-sm text-slate-600">{item.product.description}</p>
                <div className="mt-2 flex flex-wrap gap-3 text-sm text-slate-500">
                  {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                  {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                </div>
              </div>
              <div className="space-y-3 text-right">
                <div className="font-semibold">₹{(item.product.price * item.quantity).toFixed(2)}</div>
                <div className="flex items-center justify-end gap-2">
                  <button type="button" onClick={() => updateQuantity(item.product.id, -1)} className="rounded-full border px-3 py-1 text-sm">
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => updateQuantity(item.product.id, 1)} className="rounded-full border px-3 py-1 text-sm">
                    +
                  </button>
                </div>
                <button type="button" onClick={() => removeItem(item.product.id)} className="text-sm text-rose-600 underline">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
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
        <button type="button" onClick={handleCheckout} className="mt-8 w-full rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700">
          Proceed to Checkout
        </button>
      </aside>
    </div>
  );
};
