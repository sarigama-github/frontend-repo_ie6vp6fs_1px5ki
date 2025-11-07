import React from 'react';
import { Github, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="about" className="mt-12 border-t bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <div className="text-lg font-bold">PeerBazaar</div>
          <p className="text-gray-600 mt-2">A student-to-student marketplace for SATI. Built with love by Glitch Hub.</p>
        </div>
        <div>
          <div className="font-semibold mb-3">Contact</div>
          <ul className="space-y-2 text-gray-600">
            <li className="inline-flex items-center gap-2"><Mail size={16}/> support@peerbazaar.in</li>
            <li className="inline-flex items-center gap-2"><Github size={16}/> github.com/glitch-hub</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Community</div>
          <p className="text-gray-600">Stay safe: deal on campus, verify items before buying, and use your SATI email only.</p>
        </div>
      </div>
      <div className="py-4 text-center text-xs text-gray-500">© {new Date().getFullYear()} PeerBazaar • Glitch Hub</div>
    </footer>
  );
}
