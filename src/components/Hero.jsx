import React from 'react';
import { LockKeyhole, UserCheck } from 'lucide-react';

export default function Hero({ onGetStarted }) {
  return (
    <section className="bg-gradient-to-b from-indigo-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Verify your SATI email with OTP
          </h1>
          <p className="mt-3 text-gray-600">
            Quick, passwordless sign-in for @satiengg.in accounts. Receive a one-time
            passcode in your inbox and get started.
          </p>
          <div className="mt-6">
            <button onClick={onGetStarted} className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg">
              <LockKeyhole size={18} /> Get started
            </button>
          </div>
        </div>
        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-indigo-600 text-white grid place-items-center font-bold">OTP</div>
            <div>
              <div className="font-semibold">One-time passcode</div>
              <div className="text-sm text-gray-600">Secure, email-based verification</div>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            We only allow sign-ins from the official domain. Codes expire in a few minutes
            to keep your account safe.
          </div>
        </div>
      </div>
    </section>
  );
}
