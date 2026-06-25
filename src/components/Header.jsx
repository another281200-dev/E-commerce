import React from 'react';

export const Header = ({ activeView, setView, cartCount, searchQuery, setSearchQuery, authUser, onLogout }) => {
  const navItems = [
    { label: 'Home', view: 'home' },
    { label: 'Electronics', view: 'electronics' },
    { label: 'Fashion', view: 'fashion' },
    { label: 'Beauty', view: 'beauty' },
    { label: 'Cart', view: 'cart' },
  ];

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <button type="button" onClick={() => setView('home')} className="text-lg font-bold text-slate-900">
          GlobalMarket
        </button>
        <nav className="hidden gap-2 md:flex">
          {navItems.map((item) => (
            <button
              type="button"
              key={item.view}
              onClick={() => setView(item.view)}
              className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                activeView === item.view ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-3 min-w-55">
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search products"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-900"
          />
          <button type="button" onClick={() => setView('cart')} className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
            Cart ({cartCount})
          </button>
          {authUser ? (
            <button type="button" onClick={onLogout} className="rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-900">
              Sign Out
            </button>
          ) : (
            <button type="button" onClick={() => setView('login')} className="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
