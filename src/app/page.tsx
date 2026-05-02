"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "~/trpc/react";
import Link from "next/link";

const features = [
  {
    icon: "🌾",
    title: "Farm Direct",
    description: "Direct connections with verified local growers for authentic sourcing.",
    bg: "bg-emerald-50",
  },
  {
    icon: "⚡",
    title: "Instant Discovery",
    description: "Find quality produce in seconds with smart search and filters.",
    bg: "bg-yellow-50",
  },
  {
    icon: "✓",
    title: "Live Stock",
    description: "Real-time inventory updates show exactly what's available now.",
    bg: "bg-emerald-50",
  },
  {
    icon: "💰",
    title: "Fair Pricing",
    description: "Transparent prices direct from producers, no hidden markups.",
    bg: "bg-amber-50",
  },
];

export default function Home() {
  const [filter, setFilter] = useState("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const search = (searchParams && searchParams.get("q")) || "";
  const categoryParam = (searchParams && searchParams.get("category")) || "all";

  useEffect(() => {
    setFilter(categoryParam);
  }, [categoryParam]);

  const listings = api.listing.getAll.useQuery();

  const deleteListing = api.listing.delete.useMutation({
    onSuccess: () => {
      setDeletingId(null);
      setConfirmId(null);
      void listings.refetch();
    },
    onError: () => {
      setDeletingId(null);
    },
  });

  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setConfirmId(id);
  };

  const handleConfirmDelete = (e: React.MouseEvent, id: string, name: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDeletingId(id);
    deleteListing.mutate({ id });
  };

  const handleCancelDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setConfirmId(null);
  };

  const filtered = listings.data?.filter((item) => {
    const matchesCategory = filter === "all" ? true : item.category === filter;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-50 via-yellow-50 to-slate-50">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-green-50 to-yellow-50" />
        <div className="absolute inset-0 bg-[url('/abstract-blur-park-with-green-field.jpg')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-yellow-100/40" />
        <div className="absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full bg-emerald-300/20 blur-[80px]" />
        <div className="absolute -top-20 right-1/3 h-[400px] w-[400px] rounded-full bg-lime-200/30 blur-[60px]" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-yellow-200/30 blur-[80px]" />
        <div className="absolute bottom-1/4 -left-20 h-[350px] w-[350px] rounded-full bg-emerald-200/25 blur-[60px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, #166534 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-0 left-1/4 w-[2px] h-full bg-gradient-to-b from-emerald-300/20 via-transparent to-transparent rotate-12 blur-sm" />
        <div className="absolute top-0 left-1/3 w-[1px] h-3/4 bg-gradient-to-b from-lime-300/20 via-transparent to-transparent rotate-6 blur-sm" />
      </div>

      {/* ─── Hero Section ─── */}
      <div className="relative px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        <div className="mx-auto max-w-7xl">

          {/* TWO-COLUMN GRID */}
          <div className="relative grid gap-0 lg:grid-cols-[1.4fr_0.6fr] lg:items-start">

            {/* ── LEFT COLUMN ── */}
            <div className="relative z-20 overflow-visible">
              <div className="relative w-full" ref={(el) => {
                if (!el) return;
                let ro: ResizeObserver;
                const setScale = () => {
                  const canvas = el.querySelector<HTMLElement>("[data-canvas]");
                  if (!canvas) return;
                  const scale = el.offsetWidth / 860;
                  canvas.style.transform = `scale(${scale})`;
                  el.style.height = `${860 * scale}px`;
                };
                setScale();
                ro = new ResizeObserver(setScale);
                ro.observe(el);
              }}>
                <div
                  data-canvas=""
                  className="absolute top-0 left-0 origin-top-left"
                  style={{ width: 1360, height: 860 }}
                >
                  <svg
                    className="absolute inset-0 pointer-events-none"
                    width="1360" height="860"
                    viewBox="0 0 1360 860"
                    fill="none"
                  >
                    <path
                      d="M200,230 H400 H540 C600,230 660,280 660,355 V500 V645 C660,710 700,760 750,760 H880 H1010 H1140"
                      stroke="#4ade80"
                      strokeWidth="2"
                      strokeDasharray="9 7"
                      strokeLinecap="round"
                    />
                  </svg>

                  <img
                    src="/agri-ex-logo.png"
                    alt="AgriExchange"
                    className="absolute object-contain"
                    style={{ left: 0, top: 50, width: 420, height: 360 }}
                  />

                  <Dot left={360} top={190} emoji="🥔" label="Cassava"  ring="border-yellow-200" />
                  <Dot left={500} top={190} emoji="🍅" label="Tomato"   ring="border-rose-200"   />
                  <Dot left={620} top={315} emoji="🍌" label="Banana"   ring="border-yellow-200" />
                  <Dot left={620} top={460} emoji="🌾" label="Wheat"    ring="border-amber-200"  />
                  <Dot left={620} top={605} emoji="🌽" label="Corn"     ring="border-lime-200"   />
                  <Dot left={750}  top={720} emoji="🥥" label="Coconut" ring="border-yellow-200"  />
                  <Dot left={880}  top={720} emoji="🎃" label="Pumpkin" ring="border-orange-200"  />
                  <Dot left={1010} top={720} emoji="🍎" label="Apple"   ring="border-rose-200"    />
                  <Dot left={1140} top={720} emoji="🍇" label="Grapes"  ring="border-violet-200"  />

                  {/* Hero text */}
                  <div className="absolute" style={{ left: 0, top: 380, width: 430 }}>
                    <div className="space-y-3">
                      <div className="inline-flex items-center rounded-full border border-emerald-200 bg-white/90 px-4 py-1.5 text-[13px] font-semibold text-emerald-700 shadow-sm">
                        ✓ Verified Local Growers
                      </div>
                      <h1 style={{ fontSize: 62, lineHeight: 1, fontWeight: 900 }} className="text-slate-900 tracking-tight">
                        Picked Fresh,
                        <span className="block bg-gradient-to-r from-emerald-600 to-yellow-500 bg-clip-text text-transparent">
                          Priced Right.
                        </span>
                      </h1>
                      <p className="text-[14px] text-slate-600 font-medium leading-snug">
                        Direct from farmers • Transparent pricing • Real-time inventory
                      </p>
                      <div className="flex gap-3 pt-1">
                        <Link
                          href="/create"
                          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-lime-500 px-6 py-2.5 font-bold text-white shadow-lg hover:from-emerald-700 hover:to-lime-600 transition-all text-[14px]"
                        >
                          + Sell Produce
                        </Link>
                        <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-6 py-2.5 font-bold text-slate-700 hover:bg-white transition-all shadow-sm text-[14px]">
                          Browse Now
                        </button>
                      </div>
                      <div className="grid gap-2 grid-cols-3 pt-1">
                        {[
                          { label: "DIRECT", value: "Farmer pricing" },
                          { label: "FRESH", value: "Live inventory" },
                          { label: "TRUSTED", value: "Verified growers" },
                        ].map((stat) => (
                          <div key={stat.label} className="rounded-xl border border-slate-100 bg-white/80 px-3 py-2 shadow-sm">
                            <p className="text-[9px] uppercase tracking-[0.18em] text-emerald-500 font-semibold">{stat.label}</p>
                            <p className="mt-0.5 text-[12px] font-semibold text-slate-700">{stat.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            {/* ── END LEFT COLUMN ── */}

            {/* ── RIGHT COLUMN ── */}
            <div className="relative z-10 pt-2 pl-4 md:pl-8 lg:pl-10">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[13px] uppercase tracking-[0.26em] text-emerald-500 font-bold">Marketplace focus</p>
                <div className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-sm font-semibold text-emerald-700">
                  Live
                </div>
              </div>
              <div className="mt-5 space-y-1">
                {features.map((feature, idx) => (
                  <div key={idx}>
                    <div className="flex items-start gap-4 py-3.5">
                      <div className={`flex-none w-12 h-12 rounded-full ${feature.bg} flex items-center justify-center text-2xl shadow-sm border border-white`}>
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-bold text-slate-900">{feature.title}</h3>
                        <p className="mt-0.5 text-base text-slate-500 leading-snug">{feature.description}</p>
                      </div>
                    </div>
                    {idx !== features.length - 1 && (
                      <div className="h-px w-full bg-slate-100 rounded" />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between gap-3">
                <p className="text-[13px] uppercase tracking-[0.2em] text-emerald-500 font-bold leading-snug">
                  Can&apos;t find the product you are looking for?
                </p>
                <button className="flex-none inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-lime-500 px-5 py-2.5 text-base font-bold text-white shadow-md whitespace-nowrap hover:from-emerald-700 hover:to-lime-600 transition-all">
                  Talk to Us
                </button>
              </div>
            </div>
            {/* ── END RIGHT COLUMN ── */}

          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { val: "4",    label: "Categories",     icon: "🌿", glow: "shadow-emerald-100" },
              { val: String(listings.data?.length ?? 0), label: "Active Listings", icon: "📋", glow: "shadow-slate-100" },
              { val: "100%", label: "Transparency",    icon: "✓",  glow: "shadow-emerald-100" },
              { val: "⚡",   label: "Live Updates",    icon: "🔴", glow: "shadow-amber-100"   },
            ].map((s, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-[2rem] bg-white/80 backdrop-blur-sm border border-emerald-100 shadow-lg ${s.glow} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6`}
              >
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-400 to-lime-400 rounded-t-[2rem]" />
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 text-xl mb-5">
                  {s.icon}
                </div>
                <div className="text-4xl md:text-5xl font-black text-emerald-700 leading-none mb-2">
                  {s.val}
                </div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
                  {s.label}
                </p>
              </div>
            ))}
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
                <div key={item.id} className="relative group">

                  {/* ── Confirm Delete Overlay ── */}
                  {confirmId === item.id && (
                    <div
                      className="absolute inset-0 z-30 rounded-[1.5rem] bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-3 p-6"
                      onClick={(e) => e.preventDefault()}
                    >
                      <div className="text-4xl">🗑️</div>
                      <p className="text-white font-bold text-center text-sm leading-snug">
                        Remove <span className="text-red-300">&quot;{item.name}&quot;</span> from listings?
                      </p>
                      <div className="flex gap-2 mt-1">
                        <button
                          onClick={(e) => handleCancelDelete(e)}
                          className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white text-sm font-semibold transition-all border border-white/30"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={(e) => handleConfirmDelete(e, item.id, item.name)}
                          disabled={deletingId === item.id}
                          className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-all shadow-lg disabled:opacity-60 flex items-center gap-1.5"
                        >
                          {deletingId === item.id ? (
                            <>
                              <span className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                              Removing…
                            </>
                          ) : (
                            "Yes, Remove"
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ── Delete Trigger Button ── */}
                  <button
                    onClick={(e) => handleDeleteClick(e, item.id)}
                    className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-200 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg text-sm font-bold"
                    title="Remove listing"
                  >
                    ✕
                  </button>

                  {/* ── Card ── */}
                  <Link href={`/listing/${item.id}`} className="block">
                    <div className="overflow-hidden rounded-[1.5rem] border border-slate-100 bg-white/80 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300 hover:-translate-y-1 relative backdrop-blur-sm">
                      <div className="relative h-40 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                        <img
                          src={item.imageUrl || "https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=500&h=500&fit=crop"}
                          alt={item.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        <div className="absolute left-2 top-2 rounded-md bg-slate-800/70 px-2.5 py-1 text-xs font-bold uppercase text-white shadow-md backdrop-blur-sm">
                          {item.category}
                        </div>
                        <div className="absolute bottom-2 right-2">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm ${
                              item.quantity > 50
                                ? "bg-emerald-600/90 text-white"
                                : item.quantity > 10
                                ? "bg-amber-500/90 text-white"
                                : "bg-slate-600/90 text-white"
                            }`}
                          >
                            {item.quantity > 50 ? "✓ In Stock" : item.quantity > 10 ? "⚠ Low Stock" : "⛔ Limited"}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition line-clamp-1">
                          {item.name}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">From verified grower</p>
                        <div className="mt-3 flex items-end justify-between gap-2">
                          <div>
                            <p className="text-xl font-black text-emerald-700">₱{item.price || 0}</p>
                            <p className="text-xs text-slate-400">per {item.unit || "kg"}</p>
                          </div>
                          <div className="text-right bg-slate-50 rounded-lg px-2 py-1 border border-slate-100">
                            <p className="text-xs font-semibold text-slate-500">Stock</p>
                            <p className="text-sm font-bold text-emerald-700">{item.quantity}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-[1.5rem] border border-dashed border-emerald-200 bg-white/50 p-12 text-center shadow-sm backdrop-blur-sm">
              <div className="text-6xl mb-3 animate-bounce">🌾</div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">No Products Found</h3>
              <p className="text-slate-500 font-medium">
                Try adjusting your search or filters to discover available products.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="relative border-t border-slate-100 bg-white/40 px-4 sm:px-6 lg:px-8 py-8 backdrop-blur-md">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm font-bold text-slate-600">
            AgriExchange © 2026 — Connecting farms directly to consumers with transparency & speed
          </p>
        </div>
      </div>

    </main>
  );
}

function Dot({
  left, top, emoji, label, ring,
}: {
  left: number; top: number; emoji: string; label: string; ring: string;
}) {
  return (
    <div className="absolute flex flex-col items-center" style={{ left, top, width: 80 }}>
      <div className={`w-[80px] h-[80px] rounded-full border-2 ${ring} bg-white shadow-md flex items-center justify-center`}>
        <span style={{ fontSize: 36, lineHeight: 1 }}>{emoji}</span>
      </div>
      <span className="mt-1 text-[12px] font-semibold text-slate-700 whitespace-nowrap text-center">{label}</span>
    </div>
  );
}