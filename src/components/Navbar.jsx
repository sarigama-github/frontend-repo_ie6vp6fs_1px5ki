import React from 'react';
import { ShoppingBag, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-indigo-600 text-white"><ShoppingBag size={20} /></div>
          <div>
            <div className="text-xl font-bold tracking-tight">PeerBazaar</div>
            <div className="text-[11px] uppercase tracking-wider text-gray-500">by Glitch Hub</div>
          </div>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-700">
          <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
          <a href="#market" className="hover:text-indigo-600 transition-colors">Marketplace</a>
          <a href="#about" className="hover:text-indigo-600 transition-colors">About</a>
        </nav>
        <div className="flex items-center gap-2">
          <span className="hidden sm:flex items-center gap-1 text-xs text-gray-600"><ShieldCheck size={14}/> SATI Email Only</span>
        </div>
      </div>
    </header>
  );
}
