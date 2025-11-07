import React, { useEffect, useState } from 'react';

const emailDomain = 'satiengg.in';

function isAllowedEmail(email) {
  return /^(?!\.)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email) && email.endsWith(`@${emailDomain}`);
}

export default function AuthGate({ onAuthed }) {
  const [step, setStep] = useState('enter');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [devCode, setDevCode] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('peerbazaar:user');
    if (saved) {
      try {
        const u = JSON.parse(saved);
        if (u?.email && u?.email.endsWith(`@${emailDomain}`)) {
          onAuthed(u);
        }
      } catch {}
    }
  }, [onAuthed]);

  const backend = import.meta.env.VITE_BACKEND_URL || '';

  const requestOtp = async (e) => {
    e.preventDefault();
    setMessage('');
    setDevCode('');
    if (!isAllowedEmail(email)) {
      setMessage(`Use your @${emailDomain} email (e.g., krishna28cse@${emailDomain})`);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${backend}/auth/otp/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || 'Failed to request code');
      if (data.dev_code) setDevCode(data.dev_code);
      setStep('verify');
      setMessage('We sent a 6-digit code to your email.');
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    const code = (new FormData(e.currentTarget).get('code') || '').toString().trim();
    if (!code) return;
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(`${backend}/auth/otp/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || 'Verification failed');
      if (data.allowed) {
        localStorage.setItem('peerbazaar:user', JSON.stringify({ email: data.email, name: data.name }));
        onAuthed({ email: data.email, name: data.name });
      } else {
        setMessage('Not allowed. This service is for @satiengg.in students.');
      }
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto border border-slate-200 rounded-xl p-6 bg-white shadow-sm">
      {step === 'enter' && (
        <form onSubmit={requestOtp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Full name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full rounded-md border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Krishna Sharma"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">College email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-md border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder={`krishna28cse@${emailDomain}`}
            />
            <p className="mt-1 text-xs text-slate-500">Only emails like krishna28cse@{emailDomain} are allowed.</p>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex justify-center rounded-md bg-indigo-600 text-white px-4 py-2 font-medium hover:bg-indigo-500 disabled:opacity-60"
          >
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
          {message && <p className="text-sm text-slate-600">{message}</p>}
        </form>
      )}

      {step === 'verify' && (
        <form onSubmit={verifyOtp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Enter 6-digit code</label>
            <input
              name="code"
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              required
              className="mt-1 w-full rounded-md border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 tracking-widest text-center"
              placeholder="000000"
            />
            {devCode && (
              <p className="mt-2 text-xs text-emerald-600">Dev code: <span className="font-mono font-medium">{devCode}</span></p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex justify-center rounded-md bg-slate-900 text-white px-4 py-2 font-medium hover:bg-slate-800 disabled:opacity-60"
          >
            {loading ? 'Verifying...' : 'Verify & Continue'}
          </button>
          {message && <p className="text-sm text-slate-600">{message}</p>}
        </form>
      )}
    </div>
  );
}
