# pdoructs-api

Simple CRUD API for `products` using Express + TypeScript.

## Run

```bash
npm run build
npm start
```

By default, the server listens on `http://localhost:3000`.

## Endpoints

`GET /products` - list products

`POST /products` - create product

Body:
```json
{ "name": "Keyboard", "price": 99.9, "description": "Mechanical" }
```

`GET /products/:id` - get a product by id

`PUT /products/:id` - update product (partial updates)

`DELETE /products/:id` - delete product

