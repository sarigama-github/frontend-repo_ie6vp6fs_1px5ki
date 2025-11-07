import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Hero({ onGetStarted }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-white to-rose-100" aria-hidden />
      <div className="relative max-w-6xl mx-auto px-4 pt-16 pb-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              PeerBazaar — SATI's trusted campus marketplace
            </h1>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Buy and sell pre-loved books, gadgets, and essentials with verified @satiengg.in accounts. Safe, fast, and made for students.
            </p>
            <ul className="mt-6 space-y-2 text-gray-700">
              {[
                'Sign in with your college email only',
                'Create a profile and list items in minutes',
                'Chat with peers and close deals quickly',
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <CheckCircle2 className="text-indigo-600 mt-0.5" size={18} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center gap-3">
              <button onClick={onGetStarted} className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg shadow transition">
                Get started <ArrowRight size={18} />
              </button>
              <a href="#market" className="text-indigo-700 font-medium">Browse listings</a>
            </div>
          </div>
          <div className="md:pl-8">
            <div className="rounded-2xl border bg-white/60 backdrop-blur p-5 shadow-sm">
              <img src="https://images.unsplash.com/photo-1519337265831-281ec6cc8514?q=80&w=1200&auto=format&fit=crop" alt="Market" className="rounded-xl w-full h-64 object-cover" />
              <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                {['Books', 'Electronics', 'Hostel', 'Sports', 'Cycles', 'Notes'].map((c) => (
                  <div key={c} className="px-3 py-2 rounded-lg bg-indigo-50 text-indigo-700 text-center">{c}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
