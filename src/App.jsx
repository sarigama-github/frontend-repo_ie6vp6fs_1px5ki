import React, { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import AuthGate from './components/AuthGate.jsx';
import ListingGrid from './components/ListingGrid.jsx';
import Footer from './components/Footer.jsx';
import CreateListingForm from './components/CreateListingForm.jsx';
import ProfileForm from './components/ProfileForm.jsx';
import { LogOut, User as UserIcon, PlusCircle } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);

  // Load session from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('peerbazaar:user');
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const handleAuthenticated = (u) => {
    setUser(u);
    try {
      localStorage.setItem('peerbazaar:user', JSON.stringify(u));
    } catch {}
    setShowAuth(false);
  };

  const signOut = () => {
    setUser(null);
    try { localStorage.removeItem('peerbazaar:user'); } catch {}
  };

  const greeting = useMemo(() => {
    if (!user?.email) return '';
    const name = user.name || user.email.split('@')[0];
    return `Welcome, ${name}`;
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />

      <main>
        <Hero onGetStarted={() => setShowAuth(true)} />

        {!user && (
          <section className="max-w-6xl mx-auto px-4">
            {showAuth ? (
              <AuthGate onAuthenticated={handleAuthenticated} />
            ) : (
              <div className="bg-white border rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Sign in to create listings</h3>
                    <p className="text-sm text-gray-600">Use your @satiengg.in email to continue.</p>
                  </div>
                  <button onClick={() => setShowAuth(true)} className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">
                    Get started
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {user && (
          <section className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <UserIcon className="text-indigo-600" size={20} />
                <div>
                  <div className="font-semibold">{greeting}</div>
                  <div className="text-xs text-gray-600">Signed in as {user.email}</div>
                </div>
              </div>
              <button onClick={signOut} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border bg-white hover:bg-gray-50 text-sm">
                <LogOut size={16} /> Sign out
              </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <CreateListingForm user={user} onCreated={() => { /* no-op; user can refresh grid */ }} />
              <ProfileForm user={user} />
            </div>
          </section>
        )}

        <ListingGrid />
      </main>

      <Footer />

      {/* Floating quick action for signed-in users on small screens */}
      {user && (
        <button
          onClick={() => {
            const el = document.querySelector('form');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="fixed bottom-5 right-5 lg:hidden inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-3 rounded-full shadow-lg"
          aria-label="Create a listing"
        >
          <PlusCircle size={18} /> Create
        </button>
      )}
    </div>
  );
}
