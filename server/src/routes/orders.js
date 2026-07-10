import prisma from "../lib/prisma.js";
import { Router } from "express";
import { protect } from "../middleware/auth.js";

const router = Router();

router.post("/orders", protect, async (req, res) => {
  try {
    const newOrd = await prisma.$transaction(async (tx) => {
      const cartItem = await tx.cartItem.findMany({
        where: { userId: req.user.id },
        include: { product: true },
      });

      if (cartItem.length === 0) {
        throw new Error(`Cart is empty`);
      }
      for (const item of cartItem) {
        if (item.quantity > item.product.stock) {
          throw new Error(`Not enough stock for ${item.product.name}`);
        }
      }
      const totalPrice = cartItem.reduce((sum, item) => {
        return sum + item.product.price * item.quantity;
      }, 0);

      for (const item of cartItem) {
        const update = await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      const clear = await tx.cartItem.deleteMany({
        where: { userId: req.user.id },
      });

      const order = await tx.order.create({
        data: {
          userId: req.user.id,
          total: totalPrice,
          items: {
            create: cartItem.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.product.price,
            })),
          },
        },
      });

      return order;
    });
    return res.status(201).json({ newOrd });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.get("/orders", protect, async (req, res) => {
  try {
    const getOrd = await prisma.order.findMany({
      where: { userId: req.user.id },
      include: {
        items: { include: { product: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json({ getOrd });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/orders/:id", protect, async (req, res) => {
  const id = req.params.id;
  try {
    const getOrd = await prisma.order.findUnique({
      where: { id: id },
      include: { items: { include: { product: true } } },
    });

    if (!getOrd) return res.status(404).json({ message: "Order not found" });
    if (getOrd.userId !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    return res.status(200).json({ getOrd });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

export default router;
