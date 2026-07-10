import express from "express";
import { protect } from "./middleware/auth.js";
import AuthRouter from "./routes/auth.js";
import ProductRouter from "./routes/products.js";
import OrderRouter from "./routes/orders.js";
import CartRouter from "./routes/cart.js";
const app = express();

app.use(express.json());
app.use("/api/auth", AuthRouter);
app.use("/api", ProductRouter);
app.use("/api", ProductRouter);
app.use("/api", CartRouter);

app.listen(3000, () => console.log("app running on 3000"));
