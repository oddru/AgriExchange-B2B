import { db } from "~/server/db";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ListingPage({ params }: PageProps) {
  const { id } = await params;

  const listing = await db.listing.findUnique({
    where: { id },
  });

  if (!listing) return notFound();

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">

        {/* IMAGE */}
        <img
          src={
            listing.imageUrl ||
            "https://images.unsplash.com/photo-1546470427-1ec7c0e5b4c6"
          }
          className="w-full h-80 object-cover"
        />

        {/* DETAILS */}
        <div className="p-6 space-y-4">
          <h1 className="text-2xl font-semibold">
            {listing.name}
          </h1>

          <p className="text-green-600 text-xl font-medium">
            ₱{listing.price} / {listing.unit}
          </p>

          <p className="text-gray-600">
            Category: {listing.category}
          </p>

          <p className="text-gray-600">
            Available Quantity: {listing.quantity}
          </p>

          <button className="mt-4 bg-black text-white px-6 py-2 rounded-xl">
            Contact Seller
          </button>
        </div>
      </div>
    </main>
  );
}