import app from "./app";

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(port, () => {
  // Keep output minimal; use PORT for deployment environments.
  console.log(`Products API listening on http://localhost:${port}`);
});

