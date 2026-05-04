"use client";

import { api } from "~/trpc/react";
import Link from "next/link";

export default function Marketplace() {
  const listings = api.listing.getAll.useQuery();

  return (
    <main className="min-h-screen px-6 py-10 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Marketplace</h1>

      {listings.isLoading ? (
        <p>Loading...</p>
      ) : listings.data?.length === 0 ? (
        <p>No listings yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.data?.map((item) => (
            <Link
              key={item.id}
              href={`/listing/${item.id}`}
              className="bg-white rounded-xl shadow hover:shadow-md transition"
            >
              <img
                src={
                  item.imageUrl ||
                  "https://images.unsplash.com/photo-1464454709131-ffd692591ee5"
                }
                className="h-48 w-full object-cover rounded-t-xl"
              />

              <div className="p-4">
                <h2 className="font-bold">{item.name}</h2>
                <p className="text-sm text-gray-500">{item.category}</p>

                <p className="mt-2 text-emerald-600 font-bold">
                  ₱{item.price} / {item.unit}
                </p>

                <p className="text-sm text-gray-400">
                  Stock: {item.quantity}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}