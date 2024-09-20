import mongoose from "mongoose";
import request from "supertest";
import app from "../index"; // Importe ton app

describe("Category Routes", () => {
  let validCategoryId: string;

  beforeAll(async () => {
    // Connexion à la base de données de test
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect("mongodb://localhost:27017/workshop_mds_test");
    }
  });

  afterAll(async () => {
    // Fermeture de la connexion après les tests
    await mongoose.connection.close();
  });

  it("POST /categories/add - should add a new category", async () => {
    const response = await request(app)
      .post("/categories/add")
      .field("name", "Test Category")
      .field("price", "19.99")
      .field("discount_price", "14.99")
      .field("description", "A test category");

    expect(response.status).toBe(201);
    validCategoryId = response.body._id; // Sauvegarde l'ID pour les autres tests
  });

  it("GET /categories - should get all categories", async () => {
    const response = await request(app).get("/categories");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("GET /categories/:id - should get a single category", async () => {
    const response = await request(app).get(`/categories/${validCategoryId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id", validCategoryId);
  });

  it("PUT /categories/:id - should update a category", async () => {
    const response = await request(app)
      .put(`/categories/${validCategoryId}`)
      .send({ name: "Updated Category", price: "29.99" });

    expect(response.status).toBe(200);
    expect(response.body.category).toHaveProperty("name", "Updated Category");
  });

  it("DELETE /categories/:id - should delete a category", async () => {
    const response = await request(app).delete(
      `/categories/${validCategoryId}`
    );
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Category and associated images deleted successfully"
    );
  });
});
