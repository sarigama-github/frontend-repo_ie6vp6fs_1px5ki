import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AuthGate from './components/AuthGate';
import ListingGrid from './components/ListingGrid';
import Footer from './components/Footer';

export default function App() {
  const [user, setUser] = useState(null);

  const handleGetStarted = () => {
    const el = document.getElementById('auth');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <Hero onGetStarted={handleGetStarted} />

      <main className="max-w-6xl mx-auto px-4">
        <section id="auth" className="py-10">
          {!user ? (
            <AuthGate onAuthenticated={setUser} />
          ) : (
            <div className="bg-white border rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Welcome, {user.name}</h2>
                  <p className="text-gray-600 text-sm">You are signed in with {user.email}</p>
                </div>
                <button onClick={() => setUser(null)} className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50">Sign out</button>
              </div>
              <div className="mt-4 text-sm text-gray-700">You can now create listings and contact sellers. In a full build, this area would show your profile and selling tools.</div>
            </div>
          )}
        </section>
      </main>

      <ListingGrid />
      <Footer />
    </div>
  );
}
