import { prisma } from "../src/lib/prisma.js";
const products = [
  {
    name: "Wireless Headphones",
    description: "High quality over-ear headphones with noise cancellation.",
    price: 89.99,
    stock: 20,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
  },
  {
    name: "Running Shoes",
    description: "Lightweight and breathable shoes for daily runners.",
    price: 59.99,
    stock: 15,
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
  },
  {
    name: "Leather Backpack",
    description: "Genuine leather backpack with laptop compartment.",
    price: 120.0,
    stock: 8,
    category: "Bags",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400",
  },
  {
    name: "Mechanical Keyboard",
    description: "TKL layout mechanical keyboard with blue switches.",
    price: 75.0,
    stock: 12,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1601445638532-2f1f2c5f6e4b?w=400",
  },
  {
    name: "Sunglasses",
    description: "UV400 polarized sunglasses with titanium frame.",
    price: 45.0,
    stock: 25,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
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
