import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from "../products";

const router = Router();

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function parseId(value: unknown): number | null {
  const id = typeof value === "string" ? Number(value) : Number(value);
  if (!Number.isFinite(id) || !Number.isInteger(id) || id <= 0) return null;
  return id;
}

router.get("/products", (_req, res) => {
  res.json(listProducts());
});

router.post("/products", (req, res) => {
  const { name, price, description } = req.body ?? {};

  if (!isNonEmptyString(name)) {
    return res.status(400).json({ error: "Invalid 'name'." });
  }
  if (typeof price !== "number" || !Number.isFinite(price)) {
    return res.status(400).json({ error: "Invalid 'price'." });
  }
  if (typeof description !== "undefined" && typeof description !== "string") {
    return res.status(400).json({ error: "Invalid 'description'." });
  }

  const product = createProduct({
    name: name.trim(),
    price,
    ...(typeof description === "string" ? { description } : {}),
  });

  res.status(201).json(product);
});

router.get("/products/:id", (req, res) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ error: "Invalid product id." });

  const product = getProductById(id);
  if (!product) return res.status(404).json({ error: "Product not found." });

  res.json(product);
});

router.put("/products/:id", (req, res) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ error: "Invalid product id." });

  const { name, price, description } = req.body ?? {};

  const hasAnyField = typeof name !== "undefined" || typeof price !== "undefined" || typeof description !== "undefined";
  if (!hasAnyField) {
    return res.status(400).json({ error: "Provide at least one field to update." });
  }

  const update: { name?: string; price?: number; description?: string | undefined } = {};

  if (typeof name !== "undefined") {
    if (!isNonEmptyString(name)) return res.status(400).json({ error: "Invalid 'name'." });
    update.name = name.trim();
  }

  if (typeof price !== "undefined") {
    if (typeof price !== "number" || !Number.isFinite(price)) {
      return res.status(400).json({ error: "Invalid 'price'." });
    }
    update.price = price;
  }

  if (typeof description !== "undefined") {
    if (typeof description !== "string") return res.status(400).json({ error: "Invalid 'description'." });
    update.description = description;
  }

  const updated = updateProduct(id, update);
  if (!updated) return res.status(404).json({ error: "Product not found." });

  res.json(updated);
});

router.delete("/products/:id", (req, res) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ error: "Invalid product id." });

  const ok = deleteProduct(id);
  if (!ok) return res.status(404).json({ error: "Product not found." });

  return res.status(204).send();
});

export default router;

