import React from 'react';

export const FiltersSidebar = ({ title = 'Filters' }) => {
  return (
    <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <p className="mt-3 text-sm text-slate-600">Filter controls are not active in this simplified build.</p>
    </aside>
  );
};
