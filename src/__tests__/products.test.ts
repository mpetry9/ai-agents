import request from "supertest";
import app from "../app";

describe("GET /", () => {
  it("returns status ok", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});

describe("Products API", () => {
  describe("GET /products", () => {
    it("returns an empty array initially", async () => {
      const res = await request(app).get("/products");
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });
  });

  describe("POST /products", () => {
    it("creates a product and returns 201", async () => {
      const res = await request(app)
        .post("/products")
        .send({ name: "Widget", price: 9.99 });

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({ name: "Widget", price: 9.99 });
      expect(typeof res.body.id).toBe("number");
    });

    it("returns 400 when name is missing", async () => {
      const res = await request(app).post("/products").send({ price: 5 });

      expect(res.status).toBe(400);
    });

    it("returns 400 when price is missing", async () => {
      const res = await request(app).post("/products").send({ name: "Widget" });

      expect(res.status).toBe(400);
    });
  });

  describe("GET /products/:id", () => {
    it("returns 404 for a non-existent product", async () => {
      const res = await request(app).get("/products/9999");
      expect(res.status).toBe(404);
    });
  });
});
