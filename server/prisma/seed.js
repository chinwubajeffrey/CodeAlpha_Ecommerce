import prisma from "../src/lib/prisma.js";
const products = [
  {
    name: "Wedding Cake",
    description: "Multiple layered cakes, with gorgeous glazing and frostings",
    price: 89.99,
    stock: 20,
    category: "Food",
    image:
      "https://res.cloudinary.com/df8lfmv1j/image/upload/v1783981304/jason-leung-fXAuCMEYGY4-unsplash_fmgyc1.jpg",
  },
  {
    name: "Vanilla Sponge Cakes",
    description:
      "Fluffy and Light Vanilla Sponge Cakes, healthy and suitable for relaxation",
    price: 59.99,
    stock: 15,
    category: "Food",
    image:
      "https://res.cloudinary.com/df8lfmv1j/image/upload/v1783981403/aneta-voborilova-Rj1IWO8IozE-unsplash_quitfs.jpg",
  },
  {
    name: "Birthday Cake",
    description:
      "Birthday cake for another successful year well spent by you or not",
    price: 120.0,
    stock: 8,
    category: "Food",
    image:
      "https://res.cloudinary.com/df8lfmv1j/image/upload/v1783981277/stephen-wheeler-LRIQuZyxKRM-unsplash_knfcpy.jpg",
  },
  {
    name: "Chocolate Cake",
    description: "Taste and see the chococolate beauty",
    price: 75.0,
    stock: 12,
    category: "food",
    image:
      "https://res.cloudinary.com/df8lfmv1j/image/upload/v1783981274/braggsdiner-F8RKds2YdqA-unsplash_wru4ht.jpg",
  },
  {
    name: "Vanilla Cupcakes",
    description: "Little vanilla cakes for a quick sweeth snack",
    price: 45.0,
    stock: 25,
    category: "Food",
    image:
      "https://res.cloudinary.com/df8lfmv1j/image/upload/v1783981271/deva-williamson-S2jw81lfrG0-unsplash_vsblud.jpg",
  },
  {
    name: "Ceramic Mug",
    description: "Handcrafted ceramic mug, 350ml capacity.",
    price: 18.99,
    stock: 40,
    category: "Home",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400",
  },
];

async function main() {
  console.log("Seeding products...");
  for (const product of products) {
    await prisma.product.create({ data: product });
  }
  console.log("Done.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
