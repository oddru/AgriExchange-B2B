"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export default function CreateListingForm({ onClose }: { onClose?: () => void }) {
  const router = useRouter();
  const utils = api.useUtils();

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [unit, setUnit] = useState("kg");
  const [category, setCategory] = useState("vegetable");
  const [file, setFile] = useState<File | null>(null);

  const createListing = api.listing.create.useMutation({
    onSuccess: async () => {
      await utils.listing.getAll.invalidate();
      setName("");
      setQuantity("");
      setPrice("");
      if (onClose) {
        onClose();
      } else {
        router.push("/");
      }
    },
  });

  const handleCreate = async () => {
    let imageUrl;

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      imageUrl = data.secure_url;
    }

    createListing.mutate({
      name,
      quantity: typeof quantity === "number" ? quantity : 1,
      price: typeof price === "number" ? price : 0,
      unit,
      category,
      imageUrl,
    });
  };

  return (
    <div className="w-full bg-white p-6 rounded-2xl border-2 border-gray-300 shadow-lg">
      <h2 className="text-xl font-semibold mb-6">Create Listing</h2>

      <div className="space-y-4">
        {/* Row 1: Name, Category, Upload */}
        <div className="grid grid-cols-3 gap-4">
          <input
            className="border border-gray-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20"
            placeholder="Product name (e.g. Fresh tomatoes)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select
            className="border border-gray-400 p-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-black/20"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="vegetable">Vegetable</option>
            <option value="fruit">Fruit</option>
            <option value="root">Root</option>
          </select>

          <label className="border border-gray-400 p-3 rounded-lg cursor-pointer bg-white flex items-center justify-between focus-within:ring-2 focus-within:ring-black/20">
            <span className="text-gray-500 text-sm truncate">
              {file ? file.name : "Upload product image"}
            </span>
            <input
              type="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>
        </div>

        {/* Row 2: Quantity, Price, Unit */}
        <div className="grid grid-cols-3 gap-4">
          <input
            type="number"
            className="border border-gray-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20"
            placeholder="Quantity available"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value === "" ? "" : Number(e.target.value))}
          />

          <input
            type="number"
            className="border border-gray-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20"
            placeholder="Price (₱ per unit)"
            value={price}
            onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
          />

          <select
            className="border border-gray-400 p-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-black/20"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            <option value="kg">kg</option>
            <option value="bundle">bundle</option>
          </select>
        </div>

        {/* Button */}
        <button
          onClick={handleCreate}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:opacity-90 transition mt-2"
        >
          Add Listing
        </button>
      </div>
    </div>
  );
}
