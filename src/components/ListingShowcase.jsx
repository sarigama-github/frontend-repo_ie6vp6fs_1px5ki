import React from 'react';

const items = [
  { id: 1, title: 'Used Laptop', price: '₹22,000', status: 'Active' },
  { id: 2, title: 'Maths Textbook Bundle', price: '₹800', status: 'Active' },
  { id: 3, title: 'Desk Chair', price: '₹1,500', status: 'Inactive' },
  { id: 4, title: 'Arduino Kit', price: '₹650', status: 'Active' },
];

export default function ListingShowcase() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-900">Latest listings</h2>
        <a className="text-sm text-indigo-600 hover:text-indigo-500" href="#">View all</a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((it) => (
          <div key={it.id} className="rounded-xl border border-slate-200 p-4 bg-white shadow-sm">
            <div className="aspect-video rounded-lg bg-slate-100 mb-3" />
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-slate-900">{it.title}</h3>
              <span className="text-sm font-semibold text-slate-900">{it.price}</span>
            </div>
            <span className={`mt-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
              it.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
            }`}>
              {it.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
