const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const productList = [
  {
    id: "product_1",
    name: "Milk",
    price: 2,
  },
  {
    id: "product_2",
    name: "Muffin",
    price: 7,
  },
];
// middleware: parse the body to json
app.use(bodyParser.json());

// Test
app.get("/test", (request, response) => {
  if (process.env.NODE_ENV === "production") {
    response.send("Hello from production!");
  }
  response.send("Hello!");
});

// POST
app.post("/products", (request, response) => {
  const product = request.body;
  productList.push(product);
  response.json(product);
});

// PUT
app.put("/products/:productId", (request, response) => {
  const productId = request.params.productId;

  const updatedProduct = request.body;

  let newProduct = null;
  // update
  productList.forEach((prod, index) => {
    if (prod.id === productId) {
      newProduct = {
        ...productList[index],
        ...updatedProduct,
      };
      productList[index] = newProduct;
    }
  });

  response.json(newProduct);
});

// GET
app.get("/products/:productId", (request, response) => {
  const productId = request.params.productId;

  const product = productList.find((prod) => prod.id === productId);

  if (!product) response.status(404);

  response.json(product);
});

// GET
app.delete("/products/:productId", (request, response) => {
  const productId = request.params.productId;

  const productIndex = productList.findIndex((prod) => prod.id === productId);

  if (productIndex > -1) {
    productList.splice(productIndex, 1);
    response.status(200).end();
  } else {
    response.status(204).end();
  }
});

// Product LIST
app.get("/products-list", (request, response) => response.json(productList));

module.exports = app;
