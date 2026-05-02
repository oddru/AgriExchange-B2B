"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CreateListingForm from "~/components/CreateListingForm";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQ = (searchParams && searchParams.get("q")) || "";
  const initialCat = (searchParams && searchParams.get("category")) || "all";

  const [q, setQ] = useState(initialQ);
  const [cat, setCat] = useState(initialCat);

  useEffect(() => setQ(initialQ), [initialQ]);
  useEffect(() => setCat(initialCat), [initialCat]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const updateUrlParam = (key: string, value: string) => {
    try {
      const url = new URL(window.location.href);
      if (value && value !== "") url.searchParams.set(key, value);
      else url.searchParams.delete(key);
      router.replace(url.pathname + url.search);
    } catch (err) {}
  };

  const onSearchChange = (e: any) => {
    const value = e.target.value;
    setQ(value);
    updateUrlParam("q", value);
  };

  const onCategoryChange = (e: any) => {
    const value = e.target.value;
    setCat(value);
    updateUrlParam("category", value === "all" ? "" : value);
  };

  return (
    <>
      <header className="sticky top-0 z-50">
        {/* Main navbar */}
        <div
          className={`transition-all duration-300 ${
            scrolled
              ? "bg-white/90 backdrop-blur-xl shadow-[0_4px_24px_rgba(16,185,129,0.10)] border-b border-emerald-100"
              : "bg-white/60 backdrop-blur-md border-b border-white/40"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-[68px] gap-4">

              {/* ── Brand ── */}
              <Link href="/" className="flex items-center gap-2.5 flex-none group">
                <div className="relative">
                  <img
                    src="/agri-ex-logo.png"
                    alt="AgriExchange"
                    className="h-10 w-auto object-contain"
                  />
                </div>
                <div className="hidden sm:flex flex-col leading-none">
                  <span className="font-black text-[17px] text-slate-800 tracking-tight group-hover:text-emerald-700 transition-colors">
                    AgriExchange
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-500 uppercase tracking-[0.15em]">
                    Farm to Market
                  </span>
                </div>
              </Link>

              {/* ── Search + Filter pill ── */}
              <div className="flex-1 max-w-lg hidden md:block">
                <div className="flex items-center gap-0 bg-white rounded-full border border-emerald-100 shadow-sm overflow-hidden hover:border-emerald-300 hover:shadow-md transition-all duration-200">
                  {/* Search icon */}
                  <div className="pl-4 pr-2 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none">
                      <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>

                  {/* Search input */}
                  <input
                    value={q}
                    onChange={onSearchChange}
                    placeholder="Search products..."
                    className="flex-1 py-2.5 pr-3 text-sm text-slate-700 placeholder:text-slate-400 bg-transparent focus:outline-none"
                  />

                  {/* Divider */}
                  <div className="w-px h-5 bg-emerald-100" />

                  {/* Category select */}
                  <select
                    value={cat}
                    onChange={onCategoryChange}
                    className="appearance-none bg-transparent pl-3 pr-8 py-2.5 text-sm font-semibold text-slate-600 focus:outline-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2310b981' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 10px center",
                    }}
                  >
                    <option value="all">All</option>
                    <option value="vegetable">Vegetable</option>
                    <option value="fruit">Fruit</option>
                    <option value="root">Root</option>
                  </select>
                </div>
              </div>

              {/* ── Right side ── */}
              <div className="flex items-center gap-2 flex-none">

                {/* Live indicator */}
                <div className="hidden lg:flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wide">Live</span>
                </div>

                {/* Marketplace link */}
                <Link
                  href="/"
                  className="hidden md:flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-emerald-600 px-3 py-2 rounded-full hover:bg-emerald-50 transition-all"
                >
                  🌾 Marketplace
                </Link>

                {/* Sell button */}
                <button
                  onClick={() => setOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white shadow-md bg-gradient-to-r from-emerald-600 to-lime-500 hover:from-emerald-700 hover:to-lime-600 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                  Sell
                </button>
              </div>

            </div>
          </div>

          {/* Bottom emerald gradient line */}
          <div className="h-[2px] bg-gradient-to-r from-transparent via-emerald-300/50 to-transparent" />
        </div>
      </header>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative z-10 w-full max-w-3xl p-4">
            <CreateListingForm onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}