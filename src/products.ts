export type Product = {
  id: number;
  name: string;
  price: number;
  description?: string;
};

export type CreateProductInput = {
  name: string;
  price: number;
  description?: string;
};

export type UpdateProductInput = Partial<Omit<Product, "id">>;

let products: Product[] = [];
let nextId = 1;

export function listProducts(): Product[] {
  return products;
}

export function createProduct(input: CreateProductInput): Product {
  const product: Product = {
    id: nextId++,
    name: input.name,
    price: input.price,
    ...(input.description ? { description: input.description } : {}),
  };

  products.push(product);
  return product;
}

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

export function updateProduct(
  id: number,
  input: UpdateProductInput,
): Product | undefined {
  const product = getProductById(id);
  if (!product) return undefined;

  if (typeof input.name === "string") product.name = input.name;
  if (typeof input.price === "number") product.price = input.price;
  if (typeof input.description === "string" || typeof input.description === "undefined")
    product.description = input.description;

  return product;
}

export function deleteProduct(id: number): boolean {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return false;
  products.splice(index, 1);
  return true;
}

