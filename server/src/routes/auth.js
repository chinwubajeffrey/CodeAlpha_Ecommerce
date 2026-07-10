import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
import { Router } from "express";

const router = Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const findUser = await prisma.user.findUnique({
      where: { email: email },
    });
    if (findUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPass = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashPass,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.ACCESS_SECRET,
      { expiresIn: "7d" },
    );

    return res.status(201).json({ user, accessToken });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const findUser = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!findUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const checkPass = await bcrypt.compare(password, findUser.password);
    if (!checkPass) {
      return res.status(400).json({ message: `Invalid Credentials` });
    }

    const accessToken = jwt.sign(
      { id: findUser.id, role: findUser.role },
      process.env.ACCESS_SECRET,
      { expiresIn: "7d" },
    );
    const { password: _, ...user } = findUser;
    res.status(200).json({ user: user, accessToken });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
