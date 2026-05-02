"use client";

import React from "react";

export default function StatsPanel() {
  return (
    <div className="w-full max-w-lg">
      <div className="grid gap-4">
        <div className="relative rounded-2xl p-6 bg-gradient-to-br from-emerald-500 to-green-500 text-white shadow-2xl border border-white/20 overflow-hidden">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest font-semibold text-white/90">Marketplace Pulse</p>
              <p className="text-4xl md:text-5xl font-extrabold mt-2">0</p>
              <p className="text-sm text-white/80 mt-1">active listings ready to browse.</p>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="rounded-xl bg-white/12 px-4 py-2 text-sm font-semibold">Categories <span className="ml-2 font-black">4</span></div>
              <div className="mt-3 flex flex-wrap gap-2 justify-end">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/12 text-white text-sm font-semibold">Fresh</span>
                <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/12 text-white text-sm font-semibold">Local</span>
                <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/12 text-white text-sm font-semibold">Fair price</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl p-5 bg-white/95 border border-gray-100 shadow-md">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-600">Why it feels better</h4>
          <p className="mt-3 text-gray-700">The page is structured to feel premium, calm, and easy to scan without losing the energy of a live marketplace.</p>
        </div>
      </div>
    </div>
  );
}
