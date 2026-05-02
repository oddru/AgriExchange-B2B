"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import Link from "next/link";

const categories = ["all", "vegetable", "fruit", "root"];

const features = [
  {
    icon: "🌾",
    title: "Farm Direct",
    description: "Direct connections with verified local growers for authentic sourcing.",
  },
  {
    icon: "⚡",
    title: "Instant Discovery",
    description: "Find quality produce in seconds with smart search and filters.",
  },
  {
    icon: "✓",
    title: "Live Stock",
    description: "Real-time inventory updates show exactly what's available now.",
  },
  {
    icon: "💰",
    title: "Fair Pricing",
    description: "Transparent prices direct from producers, no hidden markups.",
  },
];

export default function Home() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const listings = api.listing.getAll.useQuery();

  const filtered = listings.data?.filter((item) => {
    const matchesCategory =
      filter === "all" ? true : item.category === filter;

    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-amber-50 via-slate-50 to-emerald-50 overflow-hidden">
      {/* Professional background design */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle agricultural pattern - wheat field lines */}
        <svg className="absolute top-0 right-0 w-full h-96 opacity-5" viewBox="0 0 1200 500" preserveAspectRatio="none">
          <defs>
            <pattern id="wheat" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <path d="M100,0 Q100,50 100,100" stroke="currentColor" strokeWidth="1" fill="none"/>
            </pattern>
          </defs>
          <rect width="1200" height="500" fill="url(#wheat)" stroke="currentColor"/>
        </svg>

        {/* Soft gradient orbs - muted and professional */}
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-emerald-200/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-amber-200/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-slate-200/3 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            {/* Left: Logo & Main Message */}
            <div className="space-y-5">
              <div className="inline-block relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-600/10 to-amber-600/10 rounded-full blur-2xl" />
                <img
                  src="/agri-ex-logo.png"
                  alt="AgriExchange"
                  className="h-72 w-auto object-contain relative"
                />
              </div>

              <div className="space-y-3">
                <div className="inline-flex items-center rounded-full border border-emerald-300/50 bg-gradient-to-r from-emerald-50 to-slate-50 px-4 py-2 text-sm font-bold text-emerald-700 shadow-sm">
                  ✓ Verified Local Growers
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-tight">
                  Picked Fresh,
                  <span className="block bg-gradient-to-r from-emerald-700 to-amber-700 bg-clip-text text-transparent">Priced Right.</span>
                </h1>

                <p className="text-lg text-slate-600 max-w-lg font-medium">
                  Direct from farmers • Transparent pricing • Real-time inventory
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/create"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-3 font-bold text-white shadow-md hover:shadow-lg hover:from-emerald-700 hover:to-emerald-800 transition transform hover:scale-105"
                >
                  <span>+ Sell Produce</span>
                </Link>
                <button className="inline-flex items-center gap-2 rounded-full border-2 border-emerald-300 bg-white px-6 py-3 font-bold text-emerald-700 hover:bg-emerald-50 transition shadow-sm">
                  Browse Now
                </button>
              </div>
            </div>

            {/* Right: Feature Cards - Professional */}
            <div className="grid gap-3 sm:grid-cols-2">
              {features.map((feature, idx) => {
                const colors = [
                  { bg: "bg-gradient-to-br from-amber-100 to-orange-100", text: "text-amber-900", icon: "text-amber-700" },
                  { bg: "bg-gradient-to-br from-slate-100 to-slate-200", text: "text-slate-900", icon: "text-slate-700" },
                  { bg: "bg-gradient-to-br from-emerald-100 to-emerald-200", text: "text-emerald-900", icon: "text-emerald-700" },
                  { bg: "bg-gradient-to-br from-cyan-100 to-blue-100", text: "text-blue-900", icon: "text-blue-700" }
                ];
                return (
                  <div
                    key={idx}
                    className={`group rounded-lg ${colors[idx].bg} p-5 shadow-md hover:shadow-lg hover:-translate-y-1 transition transform border border-slate-200/50`}
                  >
                    <div className={`text-3xl mb-2 group-hover:scale-110 transition ${colors[idx].icon}`}>{feature.icon}</div>
                    <h3 className={`text-base font-bold ${colors[idx].text} mb-1`}>{feature.title}</h3>
                    <p className={`text-xs ${colors[idx].text} opacity-75 leading-snug`}>{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section - Professional */}
      <div className="relative px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl bg-gradient-to-r from-slate-700 via-slate-800 to-slate-700 p-6 md:p-8 text-white shadow-lg relative overflow-hidden border border-slate-600/30">
            {/* Decorative pattern lines */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            
            <div className="grid md:grid-cols-4 gap-4 md:gap-6 relative z-10">
              <div className="text-center md:text-left">
                <div className="text-3xl md:text-4xl font-black text-emerald-300">4</div>
                <p className="text-xs font-semibold text-slate-300 mt-2 uppercase tracking-wide">Categories</p>
              </div>
              <div className="text-center md:text-left">
                <div className="text-3xl md:text-4xl font-black text-emerald-300">0</div>
                <p className="text-xs font-semibold text-slate-300 mt-2 uppercase tracking-wide">Active Listings</p>
              </div>
              <div className="text-center md:text-left">
                <div className="text-3xl md:text-4xl font-black text-emerald-300">100%</div>
                <p className="text-xs font-semibold text-slate-300 mt-2 uppercase tracking-wide">Transparency</p>
              </div>
              <div className="text-center md:text-left">
                <div className="text-3xl md:text-4xl font-black text-emerald-300">⚡</div>
                <p className="text-xs font-semibold text-slate-300 mt-2 uppercase tracking-wide">Live Updates</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Section - Compact */}
      <div className="relative px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="mx-auto max-w-7xl">
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Browse Products</h2>

            <div className="space-y-3 rounded-lg bg-white/60 backdrop-blur-sm border border-slate-200/50 p-4 shadow-sm">
              <div className="relative group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400/10 to-amber-400/10 blur opacity-50 group-focus-within:opacity-100 transition" />
                <input
                  type="text"
                  placeholder="🔍 Search vegetables, fruits, grains..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="relative w-full px-5 py-2.5 rounded-full border border-slate-300 bg-white text-slate-900 placeholder-slate-500 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/30 font-medium"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setFilter(c)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition transform hover:scale-105 ${
                      filter === c
                        ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-md scale-105"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                    }`}
                  >
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="relative px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900">Available Products</h2>
              {filtered && filtered.length > 0 && (
                <p className="text-xs text-emerald-600 font-bold mt-1 uppercase">
                  {filtered.length} item{filtered.length !== 1 ? "s" : ""} found
                </p>
              )}
            </div>
          </div>

          {filtered && filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((item) => (
                <Link href={`/listing/${item.id}`} key={item.id} className="group">
                  <div className="overflow-hidden rounded-lg border border-slate-300 bg-white shadow-md hover:shadow-lg hover:border-emerald-300 transition-all duration-300 hover:-translate-y-1 relative">
                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-bl-2xl" />
                    
                    {/* Image Container */}
                    <div className="relative h-40 overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300">
                      <img
                        src={item.imageUrl || "https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=500&h=500&fit=crop"}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                      {/* Category Badge */}
                      <div className="absolute left-2 top-2 rounded-md bg-slate-800/80 px-2.5 py-1 text-xs font-bold uppercase text-white shadow-md backdrop-blur-sm">
                        {item.category}
                      </div>

                      {/* Stock Status */}
                      <div className="absolute bottom-2 right-2">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm ${
                            item.quantity > 50
                              ? "bg-emerald-600/90 text-white"
                              : item.quantity > 10
                              ? "bg-amber-600/90 text-white"
                              : "bg-slate-600/90 text-white"
                          }`}
                        >
                          {item.quantity > 50 ? "✓ In Stock" : item.quantity > 10 ? "⚠ Low Stock" : "⛔ Limited"}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 relative z-10">
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">From verified grower</p>

                      <div className="mt-3 flex items-end justify-between gap-2">
                        <div>
                          <p className="text-xl font-black text-emerald-700">₱{item.price || 0}</p>
                          <p className="text-xs text-slate-500">per {item.unit || "kg"}</p>
                        </div>
                        <div className="text-right bg-slate-100 rounded-lg px-2 py-1">
                          <p className="text-xs font-semibold text-slate-600">Stock</p>
                          <p className="text-sm font-bold text-emerald-700">{item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-12 text-center shadow-sm">
              <div className="text-6xl mb-3 animate-bounce">🌾</div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">No Products Found</h3>
              <p className="text-slate-600 font-medium">
                Try adjusting your search or filters to discover available products.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Section */}
      <div className="relative border-t border-slate-300 bg-slate-900 px-4 sm:px-6 lg:px-8 py-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm font-bold text-white/80">
            AgriExchange © 2026 — Connecting farms directly to consumers with transparency & speed
          </p>
        </div>
      </div>
    </main>
  );
}
