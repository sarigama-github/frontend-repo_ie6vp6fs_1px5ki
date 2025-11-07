import React, { useMemo, useState } from 'react';
import { PlusCircle, Loader2, IndianRupee, Tag, MapPin, Image as ImageIcon, CheckCircle2, AlertCircle } from 'lucide-react';

export default function CreateListingForm({ user, onCreated }) {
  const backend = import.meta.env.VITE_BACKEND_URL;
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Books');
  const [location, setLocation] = useState('Campus');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [images, setImages] = useState([]);
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const canSubmit = useMemo(() => {
    return title.trim().length >= 3 && Number(price) > 0 && category && user?.email;
  }, [title, price, category, user]);

  const addImage = () => {
    const url = imageUrl.trim();
    if (!url) return;
    setImages((prev) => Array.from(new Set([...prev, url])));
    setImageUrl('');
  };

  const removeImage = (url) => setImages((prev) => prev.filter((u) => u !== url));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const payload = {
        title: title.trim(),
        price: Number(price),
        category: category.trim(),
        location: location.trim(),
        description: description.trim(),
        images,
        active,
        seller_email: user.email,
      };

      const res = await fetch(`${backend}/listings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.detail || 'Failed to create listing');
      }
      await res.json();
      setSuccess('Listing posted successfully');
      setTitle('');
      setPrice('');
      setCategory('Books');
      setLocation('Campus');
      setDescription('');
      setImages([]);
      setActive(true);
      onCreated?.();
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Books', 'Electronics', 'Hostel', 'Cycles', 'Sports', 'Notes', 'Other'];

  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <PlusCircle className="text-indigo-600" size={20} />
        <h3 className="font-semibold">Create a listing</h3>
      </div>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Eg: C Programming by Yashavant Kanetkar" className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 inline-flex items-center gap-1"><IndianRupee size={14}/> Price</label>
          <input type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="500" className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 inline-flex items-center gap-1"><Tag size={14}/> Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border rounded-lg px-3 py-2 bg-white">
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 inline-flex items-center gap-1"><MapPin size={14}/> Location</label>
          <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Campus / Hostel / City" className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Condition, usage, what’s included" className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1 inline-flex items-center gap-1"><ImageIcon size={14}/> Images (URLs)</label>
          <div className="flex gap-2">
            <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." className="flex-1 border rounded-lg px-3 py-2" />
            <button type="button" onClick={addImage} className="px-3 py-2 border rounded-lg bg-white hover:bg-gray-50">Add</button>
          </div>
          {images.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {images.map((u) => (
                <div key={u} className="relative">
                  <img src={u} alt="preview" className="w-20 h-16 object-cover rounded-md border" />
                  <button type="button" onClick={() => removeImage(u)} className="absolute -top-2 -right-2 text-xs bg-white border rounded-full px-1">×</button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="md:col-span-2 flex items-center gap-2">
          <input id="active" type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} className="h-4 w-4" />
          <label htmlFor="active" className="text-sm">Active (visible in marketplace)</label>
        </div>
        {error && (
          <div className="md:col-span-2 inline-flex items-center gap-2 text-rose-600 text-sm"><AlertCircle size={16}/> {error}</div>
        )}
        {success && (
          <div className="md:col-span-2 inline-flex items-center gap-2 text-emerald-600 text-sm"><CheckCircle2 size={16}/> {success}</div>
        )}
        <div className="md:col-span-2">
          <button disabled={!canSubmit || loading} className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white px-4 py-2 rounded-lg">
            {loading && <Loader2 className="animate-spin" size={16} />} Post listing
          </button>
        </div>
      </form>
    </div>
  );
}
