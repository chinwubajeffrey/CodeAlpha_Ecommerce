import express from "express";
import { protect } from "./middleware/auth.js";
import AuthRouter from "./routes/auth.js";
import ProductRouter from "./routes/products.js";
import OrderRouter from "./routes/orders.js";
import CartRouter from "./routes/cart.js";
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: "https://cake-ecommerce-pi.vercel.app",
    credentials: true,
  }),
);

app.use(express.json());
app.use("/api/auth", AuthRouter);
app.use("/api", ProductRouter);
app.use("/api", ProductRouter);
app.use("/api", CartRouter);
app.use("/api", OrderRouter);

app.listen(3000, () => console.log("app running on 3000"));
