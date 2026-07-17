import { Router } from "express";
import prisma from "../lib/prisma.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.get("/products", async (req, res) => {
  const { category, search } = req.query;

  try {
    const products = await prisma.product.findMany({
      where: {
        ...(category && { category }),
        ...(search && {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
          ],
        }),
      },
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/products/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const product = await prisma.product.findUnique({
      where: { id: id },
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/products", protect, (req, res) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Admin access required" });
  }
});

router.delete("/products/:id", protect, async (req, res) => {
  const id = req.params.id;
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Admin access required" });
  }

  try {
    const findProduct = await prisma.product.delete({
      where: { id: id },
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

export default router;
