import React, { useCallback, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AuthGate from './components/AuthGate';
import ListingShowcase from './components/ListingShowcase';

export default function App() {
  const [user, setUser] = useState(null);
  const handleSignOut = useCallback(() => {
    localStorage.removeItem('peerbazaar:user');
    setUser(null);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar user={user} onSignOut={handleSignOut} />
      <Hero />
      {!user && (
        <div className="mx-auto max-w-6xl px-4">
          <AuthGate onAuthed={setUser} />
        </div>
      )}
      <ListingShowcase />
      <footer className="border-t border-slate-200 py-8 mt-10">
        <div className="mx-auto max-w-6xl px-4 text-sm text-slate-600 flex items-center justify-between">
          <p>© {new Date().getFullYear()} PeerBazaar — A campus marketplace</p>
          <p>Built for @satiengg.in</p>
        </div>
      </footer>
    </div>
  );
}
