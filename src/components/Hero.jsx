import React from 'react';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-indigo-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
              Buy, sell, and exchange on campus
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              PeerBazaar is a passwordless marketplace exclusively for @satiengg.in students. Sign in with a
              one-time code sent to your email and start posting listings in minutes.
            </p>
            <ul className="mt-6 space-y-2 text-slate-700">
              <li>• Passwordless OTP sign-in</li>
              <li>• Profiles tied to @satiengg.in email</li>
              <li>• Simple listing creation</li>
            </ul>
          </div>
          <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-indigo-100 h-24" />
              <div className="rounded-lg bg-indigo-100 h-24" />
              <div className="rounded-lg bg-indigo-100 h-24" />
              <div className="rounded-lg bg-indigo-100 h-24" />
            </div>
            <p className="mt-4 text-sm text-slate-500">Mock listing cards</p>
          </div>
        </div>
      </div>
    </section>
  );
}
