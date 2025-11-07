import React, { useState } from 'react';
import { Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';

const EMAIL_DOMAIN = 'satiengg.in';

export default function AuthGate({ onAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
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

    try {
      setLoading(true);
      const base = import.meta.env.VITE_BACKEND_URL;
      const res = await fetch(`${base}/auth/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const msg = data?.detail || 'Unable to validate email. Please try again.';
        throw new Error(msg);
      }

      const data = await res.json();
      // Expecting { valid: true, email: string }
      if (data?.valid) {
        onAuthenticated({ email: trimmed, name: trimmed.split('@')[0] });
      } else {
        setError('Email validation failed.');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
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
        <button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-2.5 rounded-lg font-medium transition inline-flex items-center justify-center gap-2">
          {loading && <Loader2 className="animate-spin" size={18} />} 
          {loading ? 'Validating…' : 'Continue'}
        </button>
      </form>
    </div>
  );
}
