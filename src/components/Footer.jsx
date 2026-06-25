import React from 'react';

export const Footer = ({ setView }) => {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold">GlobalMarket</p>
          <p className="mt-3 text-sm text-slate-400">Premium products, secure checkout, and worldwide shipping.</p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
          <button type="button" onClick={() => setView('electronics')} className="text-slate-400 hover:text-white">
            Electronics
          </button>
          <button type="button" onClick={() => setView('fashion')} className="text-slate-400 hover:text-white">
            Fashion
          </button>
          <button type="button" onClick={() => setView('beauty')} className="text-slate-400 hover:text-white">
            Beauty
          </button>
        </div>
      </div>
    </footer>
  );
};
