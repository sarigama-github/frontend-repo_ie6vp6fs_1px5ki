import React from 'react';
import { Mail, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="text-indigo-600" size={20} />
          <span className="font-semibold">PeerBazaar</span>
          <span className="text-sm text-gray-500">• OTP Sign-in</span>
        </div>
        <a href="mailto:support@satiengg.in" className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
          <Mail size={16} /> Support
        </a>
      </div>
    </header>
  );
}
