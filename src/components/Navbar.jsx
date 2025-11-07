import React from 'react';
import { User, LogOut, Shield } from 'lucide-react';

export default function Navbar({ user, onSignOut }) {
  return (
    <header className="w-full border-b border-slate-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-indigo-600 text-white grid place-items-center">
            <Shield className="h-5 w-5" />
          </div>
          <span className="text-xl font-semibold tracking-tight">PeerBazaar</span>
        </div>
        {user ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <User className="h-4 w-4" />
              <span className="font-medium text-slate-800">{user.name || 'Student'}</span>
              <span className="text-slate-400">•</span>
              <span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded">{user.email}</span>
            </div>
            <button
              onClick={onSignOut}
              className="inline-flex items-center gap-2 rounded-md bg-slate-900 text-white px-3 py-2 text-sm hover:bg-slate-800 active:scale-[.99]"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        ) : (
          <div className="text-sm text-slate-600">Only for @satiengg.in students</div>
        )}
      </div>
    </header>
  );
}
