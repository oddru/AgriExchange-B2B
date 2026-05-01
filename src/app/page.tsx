"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import Link from "next/link";

const categories = ["all", "vegetable", "fruit", "root"];

export default function Home() {
  const utils = api.useUtils();

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState("vegetable");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [price, setPrice] = useState<number | "">("");
  const [unit, setUnit] = useState("kg");

  const listings = api.listing.getAll.useQuery();

  const createListing = api.listing.create.useMutation({
    onSuccess: async () => {
      setName("");
      setQuantity("");
      setFile(null);
      setCategory("vegetable");
      setPrice("");
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
    if (!name.trim()) return alert("Product name is required");
    if (!price || Number(price) <= 0)
      return alert("Enter a valid price");
    if (!quantity || Number(quantity) <= 0)
      return alert("Enter a valid quantity");

    let uploadedImageUrl: string | undefined;

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const text = await res.text();

      if (!res.ok) {
        console.error("UPLOAD ERROR:", text);
        alert("Image upload failed");
        return;
      }

      const data = JSON.parse(text);

      if (!data.secure_url) {
        alert("Upload failed");
        return;
      }

      uploadedImageUrl = data.secure_url;
    }

    createListing.mutate({
      name,
      quantity: Number(quantity),
      price: Number(price),
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
    <main className="min-h-screen px-6 py-10 text-gray-900 bg-cover bg-center"
          style={{
            backgroundImage: 
            "linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,0.6)), url('/abstract-blur-park-with-green-field.jpg')",
            backgroundSize: "110%", // edit later
          }}
    >
      {/* HEADER */}
      <div className="max-w-6xl mx-auto flex items-center gap-4 mb-6">
        <img
          src="/agri-ex-logo (1).png"
          className="w-90 h-90 object-contain"
        />
        <div>
          <h1 className="text-5xl font-semibold">
            Picked Fresh, Priced Right.
          </h1>
          <p className="text-gray-600 text-[20px]">
            Connecting Agriculture Directly to Consumers.
          </p>
        </div>
      </div>

      {/* SEARCH */}
      <div className="max-w-6xl mx-auto mb-6 -mt-7">
        <input
          className="w-full border rounded-xl px-4 py-3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10"
          placeholder="Search crops (e.g. tomato, corn...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* FILTER */}
      <div className="max-w-6xl mx-auto flex gap-2 mb-8 flex-wrap">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-4 py-1 rounded-full text-sm transition ${
              filter === c
                ? "bg-black text-white"
                : "bg-white border hover:bg-gray-100"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* FORM */}
      <div className="max-w-6xl mx-auto mb-12 bg-white p-6 rounded-2xl border shadow-sm">
        <h2 className="font-semibold mb-5 text-lg">
          Create Listing
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {/* NAME */}
          <input
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black/10 outline-none"
            placeholder="Product name (e.g. Fresh tomatoes)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* CATEGORY */}
          <select
            className="border rounded-lg px-3 py-2 bg-white"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="vegetable">Vegetable</option>
            <option value="fruit">Fruit</option>
            <option value="root">Root crop</option>
          </select>

          {/* FILE INPUT (FIXED UI) */}
          <label className="border rounded-lg px-3 py-2 cursor-pointer bg-white flex items-center justify-between">
            <span className="text-gray-500 text-sm">
              {file ? file.name : "Upload product image"}
            </span>
            <input
              type="file"
              className="hidden"
              onChange={(e) =>
                setFile(e.target.files?.[0] || null)
              }
            />
          </label>

          {/* QUANTITY */}
          <input
            type="number"
            className="border rounded-lg px-3 py-2 appearance-none"
            placeholder="Quantity available"
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value === "" ? "" : Number(e.target.value))
            }
          />

          {/* PRICE */}
          <input
            type="number"
            className="border rounded-lg px-3 py-2 appearance-none"
            placeholder="Price (₱ per unit)"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value === "" ? "" : Number(e.target.value))
            }
          />

          {/* UNIT */}
          <select
            className="border rounded-lg px-3 py-2 bg-white"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            <option value="kg">kg</option>
            <option value="bundle">bundle</option>
            <option value="piece">piece</option>
          </select>
        </div>

        <button
          onClick={handleCreate}
          className="mt-6 w-full bg-black text-white py-3 rounded-xl hover:opacity-90"
        >
          Add Listing
        </button>
      </div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered?.map((item) => (
          <Link
            href={`/listing/${item.id}`}
            key={item.id}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
          >
            <img
              src={
                item.imageUrl ||
                "https://images.unsplash.com/photo-1546470427-1ec7c0e5b4c6"
              }
              className="h-48 w-full object-cover group-hover:scale-105 transition"
            />

            <div className="p-4">
              <p className="font-semibold">{item.name}</p>

              <p className="text-green-700 text-sm mt-1">
                ₱{item.price ?? 0} / {item.unit ?? "kg"}
              </p>

              <p className="text-gray-500 text-sm">
                {item.quantity} available
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}