import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ✅ Create a test user
  const user = await prisma.user.create({
    data: {
      name: "Test User",
      email: "test@example.com",
    },
  });

  // ✅ Create listings linked to user
  await prisma.listing.createMany({
    data: [
      {
        name: "Fresh Tomatoes",
        quantity: 20,
        price: 80,
        unit: "kg",
        imageUrl:
          "https://images.unsplash.com/photo-1561136594-7f68413baa99",
        category: "vegetable",
        userId: user.id,
      },
      {
        name: "Sweet Corn",
        quantity: 15,
        price: 50,
        unit: "bundle",
        imageUrl:
          "https://images.unsplash.com/photo-1506806732259-39c2d0268443",
        category: "vegetable",
        userId: user.id,
      },
      {
        name: "Bananas (Saba)",
        quantity: 30,
        price: 60,
        unit: "kg",
        imageUrl:
          "https://images.unsplash.com/photo-1574226516831-e1dff420e8f8",
        category: "fruit",
        userId: user.id,
      },
    ],
  });

  console.log("Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });