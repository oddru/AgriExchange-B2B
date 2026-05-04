"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

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
  const router = useRouter();

  const sessionResult = useSession();
  const session = sessionResult?.data ?? null;

  const handleSellClick = () => {
    if (!session) {
      router.push("/login");
    } else {
      router.push("/create");
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-50 via-yellow-50 to-slate-50">

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-green-50 to-yellow-50" />
        <div className="absolute inset-0 bg-[url('/abstract-blur-park-with-green-field.jpg')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-yellow-100/40" />
      </div>

      <div className="relative px-4 sm:px-6 lg:px-8 py-10">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-10 items-center">

          <div>
            <h1 className="text-5xl font-black text-slate-900 leading-tight">
              Picked Fresh,
              <span className="block text-emerald-600">Priced Right.</span>
            </h1>

            <p className="mt-4 text-slate-600 font-medium">
              Direct from farmers • Transparent pricing • Real-time inventory
            </p>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSellClick}
                className="bg-emerald-600 text-white px-6 py-3 rounded-full font-bold hover:bg-emerald-700"
              >
                + Sell Produce
              </button>

              <Link
                href="/marketplace"
                className="border px-6 py-3 rounded-full font-bold hover:bg-white"
              >
                Browse Marketplace
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            {features.map((f, i) => (
              <div key={i} className="flex gap-4 bg-white/80 p-4 rounded-xl shadow">
                <div className={`w-12 h-12 flex items-center justify-center rounded-full ${f.bg}`}>
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-bold">{f.title}</h3>
                  <p className="text-sm text-gray-500">{f.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <div className="text-center py-10 text-sm text-gray-500">
        AgriExchange © 2026 — Connecting farms directly to consumers
      </div>

    </main>
  );
}