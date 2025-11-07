import React, { useState } from 'react';

const BACKEND = import.meta.env.VITE_BACKEND_URL;

export default function AuthGate({ onAuthenticated }) {
  const [step, setStep] = useState('request');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [devCode, setDevCode] = useState('');

  const requestOtp = async () => {
    setLoading(true); setError('');
    try {
      const res = await fetch(`${BACKEND}/auth/otp/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setDevCode(data.dev_code || '');
      setStep('verify');
    } catch (e) {
      setError('Failed to send code. Make sure you use @satiengg.in email.');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true); setError('');
    try {
      const res = await fetch(`${BACKEND}/auth/otp/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });
      if (!res.ok) throw new Error(await res.text());
      const user = await res.json();
      onAuthenticated(user);
    } catch (e) {
      setError('Invalid or expired code. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm">
      {step === 'request' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input value={name} onChange={e => setName(e.target.value)} className="mt-1 w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Your name" />
          </div>
          <div>
            <label className="block text-sm font-medium">SATI Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="you@satiengg.in" />
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <button disabled={loading} onClick={requestOtp} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">
            {loading ? 'Sending...' : 'Send code'}
          </button>
        </div>
      )}

      {step === 'verify' && (
        <div className="space-y-4">
          <div className="text-sm text-gray-600">We sent a 6-digit code to {email}. Enter it below.</div>
          {devCode && (
            <div className="text-xs text-gray-500">Dev code: <span className="font-mono">{devCode}</span></div>
          )}
          <div>
            <label className="block text-sm font-medium">Code</label>
            <input value={code} onChange={e => setCode(e.target.value)} maxLength={6} className="mt-1 w-full border rounded-lg px-3 py-2 tracking-widest text-center font-mono text-lg outline-none focus:ring-2 focus:ring-indigo-500" placeholder="000000" />
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <button disabled={loading} onClick={verifyOtp} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </div>
      )}
    </div>
  );
}
