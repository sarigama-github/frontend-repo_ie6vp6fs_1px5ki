import React, { useState } from 'react';
import { Mail, Lock, AlertCircle } from 'lucide-react';

const EMAIL_DOMAIN = 'satiengg.in';

export default function AuthGate({ onAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const trimmed = email.trim().toLowerCase();
    const isValidDomain = trimmed.endsWith(`@${EMAIL_DOMAIN}`);

    if (!isValidDomain) {
      setError(`Only @${EMAIL_DOMAIN} email addresses can sign in.`);
      return;
    }
    if (password.length < 6) {
      setError('Please use a password with at least 6 characters.');
      return;
    }

    // Simulated auth flow for demo: in a full app, call backend here.
    onAuthenticated({ email: trimmed, name: trimmed.split('@')[0] });
  };

  return (
    <div className="max-w-md mx-auto bg-white border rounded-2xl shadow-sm p-6">
      <h2 className="text-xl font-semibold">Sign in to PeerBazaar</h2>
      <p className="text-sm text-gray-600 mt-1">Only SATI (@{EMAIL_DOMAIN}) emails are allowed.</p>
      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={`name@${EMAIL_DOMAIN}`}
            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        {error && (
          <div className="flex items-start gap-2 text-sm text-rose-600">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}
        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg font-medium transition">
          Continue
        </button>
      </form>
    </div>
  );
}
