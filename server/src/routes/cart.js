import prisma from "../lib/prisma.js";
import { Router } from "express";
import { protect } from "../middleware/auth.js";
const router = Router();

router.get("/cart", protect, async (req, res) => {
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: req.user.id },
      include: { product: true },
    });
    res.status(200).json({ cartItems });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ message: error });
  }
});

router.post("/cart", protect, async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ message: `Product not found` });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: `Low on stocks` });
    }

    const cartItem = await prisma.cartItem.upsert({
      where: {
        userId_productId: {
          userId: req.user.id,
          productId,
        },
      },
      update: {
        quantity: { increment: quantity },
      },
      create: {
        userId: req.user.id,
        productId,
        quantity,
      },
    });

    res.status(201).json({ cartItem });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.delete("/cart/:itemId", protect, async (req, res) => {
  const id = req.params.itemId;

  try {
    const del = await prisma.cartItem.deleteMany({
      where: { id: id, userId: req.user.id },
    });
    res.status(200).json({ message: `Deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
