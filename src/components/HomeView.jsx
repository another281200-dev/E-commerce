import React from 'react';
import { CATEGORIES } from '../data';

export const HomeView = ({ setView }) => {
  return (
    <div className="space-y-10">
      <section className="rounded-3xl bg-slate-950 px-8 py-16 text-white shadow-2xl">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.4em] text-indigo-300">GlobalMarket</p>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight">Discover premium collections built for every lifestyle.</h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300">Shop artisanal fashion, high-performance electronics, and clean beauty products with secure worldwide delivery.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setView('electronics')}
              className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Shop Electronics
            </button>
            <button
              type="button"
              onClick={() => setView('fashion')}
              className="rounded-2xl border border-slate-200 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/20"
            >
              Browse Fashion
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {CATEGORIES.map((category) => (
          <div key={category.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="h-40 overflow-hidden rounded-3xl bg-slate-100">
              <img src={category.image || 'https://via.placeholder.com/400'} alt={category.name} className="h-full w-full object-cover" />
            </div>
            <div className="mt-5">
              <p className="text-sm font-medium text-indigo-600">{category.name}</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">{category.tagline}</h2>
              <button
                type="button"
                onClick={() => setView(category.id)}
                className="mt-6 inline-flex items-center rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Explore {category.name}
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
