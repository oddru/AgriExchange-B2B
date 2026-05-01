"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const router = useRouter();
  const utils = api.useUtils();

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [unit, setUnit] = useState("kg");
  const [category, setCategory] = useState("vegetable");
  const [file, setFile] = useState<File | null>(null);

  const createListing = api.listing.create.useMutation({
    onSuccess: async () => {
      await utils.listing.getAll.invalidate();
      router.push("/");
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
      quantity,
      price,
      unit,
      category,
      imageUrl,
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow">
        <h1 className="text-xl font-semibold mb-4">
          Create New Listing
        </h1>

        <div className="space-y-3">
          <input
            className="w-full border p-2 rounded"
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            className="w-full border p-2 rounded"
            placeholder="Quantity"
            onChange={(e) => setQuantity(Number(e.target.value))}
          />

          <input
            type="number"
            className="w-full border p-2 rounded"
            placeholder="Price"
            onChange={(e) => setPrice(Number(e.target.value))}
          />

          <select
            className="w-full border p-2 rounded"
            onChange={(e) => setUnit(e.target.value)}
          >
            <option value="kg">kg</option>
            <option value="bundle">bundle</option>
          </select>

          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          <button
            onClick={handleCreate}
            className="w-full bg-black text-white py-2 rounded"
          >
            Create Listing
          </button>
        </div>
      </div>
    </main>
  );
}