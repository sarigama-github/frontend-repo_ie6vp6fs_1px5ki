import React, { useMemo, useState } from 'react';
import { User, Phone, Building2, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ProfileForm({ user }) {
  const backend = import.meta.env.VITE_BACKEND_URL;
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState('');
  const [branch, setBranch] = useState('');
  const [year, setYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const canSubmit = useMemo(() => name.trim().length >= 2 && /^\+?\d{7,15}$/.test(phone || ''), [name, phone]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit || !user?.email) return;
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const payload = {
        email: user.email,
        name: name.trim(),
        phone: phone.trim(),
        branch: branch.trim(),
        year: year.trim(),
      };
      const res = await fetch(`${backend}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.detail || 'Failed to save profile');
      }
      await res.json();
      setSuccess('Profile saved');
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <User className="text-indigo-600" size={20} />
        <h3 className="font-semibold">My profile</h3>
      </div>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input disabled value={user?.email || ''} className="w-full border rounded-lg px-3 py-2 bg-gray-50 text-gray-600" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 inline-flex items-center gap-1"><Phone size={14}/> Phone</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91XXXXXXXXXX" className="w-full border rounded-lg px-3 py-2" />
          <p className="text-xs text-gray-500 mt-1">Use a reachable number for buyers/sellers.</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 inline-flex items-center gap-1"><Building2 size={14}/> Branch</label>
          <input value={branch} onChange={(e) => setBranch(e.target.value)} placeholder="CSE / ECE / ME / CE ..." className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Year</label>
          <input value={year} onChange={(e) => setYear(e.target.value)} placeholder="1st / 2nd / 3rd / 4th" className="w-full border rounded-lg px-3 py-2" />
        </div>
        {error && (
          <div className="md:col-span-2 inline-flex items-center gap-2 text-rose-600 text-sm"><AlertCircle size={16}/> {error}</div>
        )}
        {success && (
          <div className="md:col-span-2 inline-flex items-center gap-2 text-emerald-600 text-sm"><CheckCircle2 size={16}/> {success}</div>
        )}
        <div className="md:col-span-2">
          <button disabled={!canSubmit || loading} className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white px-4 py-2 rounded-lg">
            {loading && <Loader2 className="animate-spin" size={16} />} Save profile
          </button>
        </div>
      </form>
    </div>
  );
}
