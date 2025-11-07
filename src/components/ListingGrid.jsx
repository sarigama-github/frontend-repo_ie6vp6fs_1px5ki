import React from 'react';
import { IndianRupee, MapPin, Tag } from 'lucide-react';

const sample = [
  {
    id: 1,
    title: 'Engineering Mechanics by Hibbeler',
    price: 350,
    location: 'Library Block',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop',
    badge: 'Books',
  },
  {
    id: 2,
    title: 'Casio fx-991EX Scientific Calculator',
    price: 900,
    location: 'Hostel A',
    image: 'https://images.unsplash.com/photo-1711344397160-b23d5deaa012?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxDYXNpbyUyMGZ4LTk5MUVYJTIwU2NpZW50aWZpYyUyMENhbGN1bGF0b3J8ZW58MHwwfHx8MTc2MjU0MTE3OHww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    badge: 'Electronics',
  },
  {
    id: 3,
    title: 'Hercules Roadeo Cycle',
    price: 4500,
    location: 'Main Gate',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop',
    badge: 'Cycles',
  },
  {
    id: 4,
    title: 'Hostel Study Table & Chair',
    price: 1200,
    location: 'Hostel C',
    image: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?q=80&w=1200&auto=format&fit=crop',
    badge: 'Hostel',
  },
];

export default function ListingGrid() {
  return (
    <section id="market" className="max-w-6xl mx-auto px-4 py-14">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">Latest listings</h2>
          <p className="text-gray-600">Fresh deals from SATI students.</p>
        </div>
        <button className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50">Create listing</button>
      </div>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sample.map((item) => (
          <article key={item.id} className="group rounded-xl border bg-white overflow-hidden shadow-sm hover:shadow-md transition">
            <div className="relative">
              <img src={item.image} alt={item.title} className="w-full h-44 object-cover" />
              <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-white/90 text-gray-800 text-xs px-2 py-1 rounded-md">
                <Tag size={14} /> {item.badge}
              </span>
            </div>
            <div className="p-4 space-y-2">
              <h3 className="font-semibold line-clamp-2 group-hover:text-indigo-700">{item.title}</h3>
              <div className="flex items-center justify-between text-sm">
                <div className="inline-flex items-center gap-1 font-medium text-indigo-700">
                  <IndianRupee size={16} /> {item.price}
                </div>
                <div className="inline-flex items-center gap-1 text-gray-500">
                  <MapPin size={16} /> {item.location}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
