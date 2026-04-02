import express from "express";
import productsRouter from "./routes/products";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/", productsRouter);

export default app;

