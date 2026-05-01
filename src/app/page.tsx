"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

const categories = ["all", "vegetable", "fruit", "root"];

export default function Home() {
  const utils = api.useUtils();

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState("vegetable");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [price, setPrice] = useState(0);
  const [unit, setUnit] = useState("kg");

  const listings = api.listing.getAll.useQuery();

  const createListing = api.listing.create.useMutation({
    onSuccess: async () => {
      setName("");
      setQuantity(1);
      setFile(null);
      setCategory("vegetable");
      setPrice(0);
      setUnit("kg");
      await utils.listing.getAll.invalidate();
    },
  });

  const deleteListing = api.listing.delete.useMutation({
    onSuccess: async () => {
      await utils.listing.getAll.invalidate();
    },
  });

  const handleCreate = async () => {
    let uploadedImageUrl: string | undefined;

    // =========================
    // IMAGE UPLOAD STEP
    // =========================
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      // HARD DEBUG (important)
      const text = await res.text();

      if (!res.ok) {
        console.error("UPLOAD FAILED RESPONSE:", text);
        alert("Upload failed");
        return;
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error("Invalid JSON from upload:", text);
        alert("Upload returned invalid response");
        return;
      }

      console.log("UPLOAD RESULT:", data);

      if (!data.secure_url) {
        console.error("No secure_url returned:", data);
        alert("Upload failed: no image URL");
        return;
      }

      uploadedImageUrl = data.secure_url;
    }

    // =========================
    // CREATE LISTING
    // =========================
    createListing.mutate({
      name,
      quantity,
      price,
      unit,
      imageUrl: uploadedImageUrl,
      category,
    });
  };

  const filtered = listings.data?.filter((item) => {
    const matchesCategory =
      filter === "all" ? true : item.category === filter;

    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <main
      className="min-h-screen px-6 py-10 bg-cover bg-center text-gray-900"
      style={{
        backgroundImage: "url('/abstract-blur-park-with-green-field.jpg')",
      }}
    >
      {/* HEADER */}
      <div className="max-w-4xl mx-auto mb-1 -mt-10 flex items-center gap-3">
        <img
          src="/agri-ex-logo (1).png"
          alt="Agri Exchange Logo"
          className="h-80 w-80 object-contain -m-2"
        />

        <div>
          <h1 className="text-5xl font-semibold tracking-tight">
            Picked Fresh, Priced Right.
          </h1>
          <p className="text-gray-600 text-sm">
            Browse and Trade Surplus Agricultural Produce. Locally Convenient.
          </p>
        </div>
      </div>

      {/* SEARCH */}
      <div className="max-w-4xl mx-auto mb-4 -mt-12">
        <input
          className="w-full border rounded-lg px-3 py-2 bg-white/80 backdrop-blur-md"
          placeholder="Search crops (e.g. tomato, corn...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* FILTER */}
      <div className="max-w-4xl mx-auto flex gap-2 mb-6 flex-wrap">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-3 py-1 rounded-full border text-sm transition ${
              filter === c
                ? "bg-black text-white"
                : "bg-white/70 hover:bg-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* INPUT */}
      <div className="max-w-4xl mx-auto flex flex-col gap-2 mb-8 bg-white/80 backdrop-blur-md p-4 rounded-xl border">
        <input
          className="border rounded-lg px-3 py-2"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border rounded-lg px-3 py-2 w-32"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <input
          className="border rounded-lg px-3 py-2 w-32"
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        <select
          className="border rounded-lg px-3 py-2"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        >
          <option value="kg">kg</option>
          <option value="bundle">bundle</option>
          <option value="piece">piece</option>
        </select>

        <select
          className="border rounded-lg px-3 py-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="vegetable">Vegetable</option>
          <option value="fruit">Fruit</option>
          <option value="root">Root Crop</option>
        </select>

        <input
          type="file"
          className="border rounded-lg px-3 py-2"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <button
          onClick={handleCreate}
          className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-90"
          disabled={!name || quantity < 1}
        >
          Add Listing
        </button>
      </div>

      {/* RESULTS */}
      <div className="max-w-4xl mx-auto mb-3 text-sm text-gray-500">
        Showing {filtered?.length || 0} listings
      </div>

      {/* GRID */}
      <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-4">
        {listings.isLoading ? (
          <p className="text-gray-500">Loading listings...</p>
        ) : filtered?.length === 0 ? (
          <div className="text-gray-500 bg-white/70 p-6 rounded-xl border col-span-2 text-center">
            No listings found.
          </div>
        ) : (
          filtered?.map((item) => (
            <div
              key={item.id}
              className="bg-white/90 backdrop-blur-sm border rounded-xl overflow-hidden"
            >
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  className="h-40 w-full object-cover"
                  alt={item.name}
                />
              )}

              <div className="p-4 flex justify-between">
                <div>
                  <p className="font-semibold">{item.name}</p>

                  <span className="text-xs px-2 py-1 bg-gray-200 rounded-full">
                    {item.category}
                  </span>

                  <p className="text-sm text-green-700 mt-1 font-medium">
                    ₱{item.price} / {item.unit}
                  </p>

                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <button
                  className="text-red-500 text-sm"
                  onClick={() =>
                    deleteListing.mutate({ id: item.id })
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}