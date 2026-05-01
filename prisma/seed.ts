import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.listing.deleteMany(); // optional but recommended for clean slate

  await prisma.listing.createMany({
    data: [
      {
        name: "Fresh Tomatoes",
        quantity: 20,
        price: 80,
        unit: "kg",
        category: "vegetable",
        imageUrl:
          "https://images.unsplash.com/photo-1546470427-1ec7c0e5b4c6",
      },
      {
        name: "Sweet Corn",
        quantity: 15,
        price: 50,
        unit: "bundle",
        category: "vegetable",
        imageUrl:
          "https://images.unsplash.com/photo-1601598851547-4302969d0614",
      },
      {
        name: "Bananas (Saba)",
        quantity: 30,
        price: 60,
        unit: "kg",
        category: "fruit",
        imageUrl:
          "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e",
      },
    ],
  });

  console.log("Seed complete");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });