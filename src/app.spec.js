const request = require("supertest");

const app = require("./app");

describe("The Product API", function () {
  it("1. GET /products returns a product by id", function (done) {
    request(app)
      .get("/products/product_1")
      .expect(200)
      .end(function (err, res) {
        expect(res.body).toEqual({
          id: "product_1",
          name: "Milk",
          price: 2,
        });
        if (err) return done(err);
        done();
      });
  });

  it("2. POST /products creates a product", function (done) {
    request(app)
      .post("/products")
      .send({
        id: "product_3",
        name: "Muffin",
        price: 6,
      })
      .set("Content-Type", "application/json")
      .expect(200)
      .end(function (err, res) {
        expect(res.body).toEqual({
          id: "product_3",
          name: "Muffin",
          price: 6,
        });
        if (err) return done(err);
        done();
      });
  });

  it("3. PUT /products updates a product", function (done) {
    request(app)
      .put("/products/product_1")
      .set("Content-Type", "application/json")
      .send({
        name: "Muffin",
        price: 6,
      })
      .expect(200)
      .end(function (err, res) {
        expect(res.body).toEqual({
          id: "product_1",
          name: "Muffin",
          price: 6,
        });
        if (err) return done(err);
        done();
      });

    request(app)
      .get("/products/product_1")
      .expect(200)
      .end(function (err, res) {
        expect(res.body).toEqual({
          id: "product_1",
          name: "Muffin",
          price: 6,
        });
        if (err) return done(err);
        done();
      });
  });

  it("4. DELETE /products/:productId deletes a product by id", function (done) {
    request(app)
      .delete("/products/product_1")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it("5. GET /product-list returns the list of products", function (done) {
    request(app)
      .get("/products-list")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});
