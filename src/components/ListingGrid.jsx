import React, { useEffect, useMemo, useState } from 'react';
import { IndianRupee, MapPin, Tag, RefreshCcw, AlertTriangle, Image as ImageIcon } from 'lucide-react';

export default function ListingGrid() {
  const [listings, setListings] = useState([]);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const backend = import.meta.env.VITE_BACKEND_URL;

  const fetchListings = async (selected = category) => {
    try {
      setError('');
      setLoading(true);
      const url = new URL(`${backend}/listings`);
      if (selected && selected !== 'all') url.searchParams.set('category', selected);
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error('Failed to load listings');
      const data = await res.json();
      setListings(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Something went wrong');
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings('all');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchListings(category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const categories = useMemo(() => {
    const set = new Set(listings.map((l) => (l.category || '').trim()).filter(Boolean));
    return ['all', ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [listings]);

  const cardImage = (item) => {
    const images = Array.isArray(item.images) ? item.images : [];
    return images[0] || 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop';
  };

  return (
    <section id="market" className="max-w-6xl mx-auto px-4 py-14">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">Latest listings</h2>
          <p className="text-gray-600">Fresh deals from SATI students.</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 border rounded-lg bg-white"
            aria-label="Filter by category"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'all' ? 'All categories' : c}
              </option>
            ))}
          </select>
          <button onClick={() => fetchListings(category)} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border bg-white hover:bg-gray-50">
            <RefreshCcw size={16} /> Refresh
          </button>
        </div>
      </div>

      {loading && (
        <div className="mt-8 text-sm text-gray-600">Loading listings…</div>
      )}
      {error && (
        <div className="mt-8 inline-flex items-center gap-2 text-rose-600 text-sm">
          <AlertTriangle size={16} /> {error}
        </div>
      )}

      {!loading && !error && listings.length === 0 && (
        <div className="mt-8 text-sm text-gray-600">No listings found{category !== 'all' ? ` in ${category}` : ''}. Be the first to post!</div>
      )}

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {listings.map((item) => (
          <article key={item._id || item.id} className="group rounded-xl border bg-white overflow-hidden shadow-sm hover:shadow-md transition">
            <div className="relative">
              {cardImage(item) ? (
                <img src={cardImage(item)} alt={item.title} className="w-full h-44 object-cover" />
              ) : (
                <div className="w-full h-44 grid place-items-center bg-gray-100 text-gray-400">
                  <ImageIcon size={24} />
                </div>
              )}
              {item.category && (
                <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-white/90 text-gray-800 text-xs px-2 py-1 rounded-md">
                  <Tag size={14} /> {item.category}
                </span>
              )}
            </div>
            <div className="p-4 space-y-2">
              <h3 className="font-semibold line-clamp-2 group-hover:text-indigo-700">{item.title}</h3>
              <div className="flex items-center justify-between text-sm">
                <div className="inline-flex items-center gap-1 font-medium text-indigo-700">
                  <IndianRupee size={16} /> {item.price}
                </div>
                <div className="inline-flex items-center gap-1 text-gray-500">
                  <MapPin size={16} /> {item.location || 'Campus'}
                </div>
              </div>
              {item.seller_email && (
                <div className="text-xs text-gray-500">Seller: {item.seller_email}</div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
