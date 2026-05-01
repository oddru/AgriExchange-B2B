"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

const categories = ["all", "vegetable", "fruit", "root"];

export default function Home() {
  const utils = api.useUtils();

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState("vegetable");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [price, setPrice] = useState<number>(0);
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
    if (!name.trim()) {
      alert("Product name is required");
      return;
    }

    if (price <= 0) {
      alert("Price must be greater than 0");
      return;
    }

    if (quantity <= 0) {
      alert("Quantity must be at least 1");
      return;
    }

    let uploadedImageUrl: string | undefined;

    // =========================
    // IMAGE UPLOAD
    // =========================
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
        console.error("No image URL:", data);
        alert("Upload failed");
        return;
      }

      uploadedImageUrl = data.secure_url;
    }

    // =========================
    // CREATE LISTING
    // =========================
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
    <main
      className="min-h-screen px-6 py-10 bg-cover bg-center text-gray-900"
      style={{
        backgroundImage:
          "url('/abstract-blur-park-with-green-field.jpg')",
      }}
    >
      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-2 -mt-10 flex items-center gap-4">
        <img
          src="/agri-ex-logo (1).png"
          alt="Agri Exchange Logo"
          className="h-90 w-90 object-contain"
        />

        <div>
          <h1 className="text-5xl font-semibold">
            Picked Fresh, Priced Right.
          </h1>
          <p className="text-gray-600 text-[18px]">
            Connecting Agriculture Directly To Consumers. Locally Convenient.
          </p>
        </div>
      </div>

      {/* SEARCH */}
      <div className="max-w-5xl mx-auto mb-4 -mt-7">
        <input
          className="w-full border rounded-xl px-4 py-3 bg-white/80 backdrop-blur-md shadow-sm"
          placeholder="Search crops (e.g. tomato, corn...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* FILTER */}
      <div className="max-w-5xl mx-auto flex gap-2 mb-6 flex-wrap">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-4 py-1 rounded-full text-sm transition ${
              filter === c
                ? "bg-black text-white"
                : "bg-white/70 hover:bg-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* FORM (FIXED UX) */}
      <div className="max-w-5xl mx-auto mb-10 bg-white/90 backdrop-blur-md p-6 rounded-2xl border shadow-sm">
        <h2 className="font-semibold mb-4 text-lg">Create Listing</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {/* PRODUCT NAME */}
          <div>
            <label className="text-sm text-gray-600">
              Product Name
            </label>
            <input
              className="border rounded-lg px-3 py-2 w-full"
              placeholder="e.g. Fresh Tomatoes"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="text-sm text-gray-600">
              Category
            </label>
            <select
              className="border rounded-lg px-3 py-2 w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="vegetable">Vegetable</option>
              <option value="fruit">Fruit</option>
              <option value="root">Root Crop</option>
            </select>
          </div>

          {/* QUANTITY */}
          <div>
            <label className="text-sm text-gray-600">
              Quantity Available
            </label>
            <input
              type="number"
              className="border rounded-lg px-3 py-2 w-full"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>

          {/* PRICE */}
          <div>
            <label className="text-sm text-gray-600">
              Price (₱ per unit)
            </label>
            <input
              type="number"
              className="border rounded-lg px-3 py-2 w-full"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>

          {/* UNIT */}
          <div>
            <label className="text-sm text-gray-600">
              Unit Type
            </label>
            <select
              className="border rounded-lg px-3 py-2 w-full"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            >
              <option value="kg">kg</option>
              <option value="bundle">bundle</option>
              <option value="piece">piece</option>
            </select>
          </div>

          {/* IMAGE */}
          <div>
            <label className="text-sm text-gray-600">
              Upload Image
            </label>
            <input
              type="file"
              className="border rounded-lg px-3 py-2 w-full"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>
        </div>

        <button
          onClick={handleCreate}
          className="mt-6 w-full bg-black text-white py-3 rounded-xl hover:opacity-90"
        >
          Add Listing
        </button>
      </div>

      {/* RESULTS */}
      <div className="max-w-5xl mx-auto mb-3 text-sm text-gray-500">
        Showing {filtered?.length || 0} listings
      </div>

      {/* GRID */}
      <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-4">
        {filtered?.map((item) => (
          <div
            key={item.id}
            className="bg-white/90 border rounded-xl overflow-hidden shadow-sm"
          >
            <img
              src={
                item.imageUrl ||
                "https://images.unsplash.com/photo-1546470427-1ec7c0e5b4c6"
              }
              className="h-40 w-full object-cover"
              alt={item.name}
            />

            <div className="p-4 flex justify-between">
              <div>
                <p className="font-semibold">{item.name}</p>

                <span className="text-xs px-2 py-1 bg-gray-200 rounded-full">
                  {item.category}
                </span>

                <p className="text-sm text-green-700 mt-1 font-medium">
                  ₱{item.price ?? 0} / {item.unit ?? "kg"}
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
        ))}
      </div>
    </main>
  );
}