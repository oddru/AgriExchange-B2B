"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data: session } = useSession();

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

  // ✅ Always redirect search to marketplace
  const updateUrlParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams?.toString());

    if (value && value !== "") params.set(key, value);
    else params.delete(key);

    router.push(`/marketplace?${params.toString()}`);
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

  // ✅ Auth-aware selling
  const handleSellClick = () => {
    if (!session) {
      router.push("/login");
    } else {
      router.push("/create");
    }
  };

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-[0_4px_24px_rgba(16,185,129,0.10)] border-b border-emerald-100"
            : "bg-white/60 backdrop-blur-md border-b border-white/40"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[68px] gap-4">

            {/* BRAND */}
            <Link href="/" className="flex items-center gap-2.5 flex-none group">
              <img
                src="/agri-ex-logo.png"
                alt="AgriExchange"
                className="h-10 w-auto object-contain"
              />
              <div className="hidden sm:flex flex-col leading-none">
                <span className="font-black text-[17px] text-slate-800 group-hover:text-emerald-700">
                  AgriExchange
                </span>
                <span className="text-[10px] font-semibold text-emerald-500 uppercase">
                  Farm to Market
                </span>
              </div>
            </Link>

            {/* SEARCH */}
            <div className="flex-1 max-w-lg hidden md:block">
              <div className="flex items-center bg-white rounded-full border border-emerald-100 shadow-sm overflow-hidden">

                <div className="pl-4 pr-2">
                  🔍
                </div>

                <input
                  value={q}
                  onChange={onSearchChange}
                  placeholder="Search products..."
                  className="flex-1 py-2.5 text-sm bg-transparent focus:outline-none"
                />

                <div className="w-px h-5 bg-emerald-100" />

                <select
                  value={cat}
                  onChange={onCategoryChange}
                  className="bg-transparent px-3 py-2.5 text-sm font-semibold focus:outline-none"
                >
                  <option value="all">All</option>
                  <option value="vegetable">Vegetable</option>
                  <option value="fruit">Fruit</option>
                  <option value="root">Root</option>
                </select>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-2">

              {/* Marketplace */}
              <Link
                href="/marketplace"
                className={`hidden md:flex items-center gap-1 text-sm font-semibold px-3 py-2 rounded-full transition ${
                  pathname === "/marketplace"
                    ? "text-emerald-600 bg-emerald-50"
                    : "text-slate-600 hover:text-emerald-600 hover:bg-emerald-50"
                }`}
              >
                🌾 Marketplace
              </Link>

              {/* Sell */}
              <button
                onClick={handleSellClick}
                className="px-5 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-lime-500 hover:from-emerald-700 hover:to-lime-600"
              >
                + Sell
              </button>

            </div>
          </div>
        </div>

        <div className="h-[2px] bg-gradient-to-r from-transparent via-emerald-300/50 to-transparent" />
      </div>
    </header>
  );
}