import mongoose from "mongoose";
import request from "supertest";
import app from "../index";

describe("Accessoire Routes", () => {
  let validId: string;

  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect("mongodb://localhost:27017/workshop_mds_test");
    }

    // Générer un ObjectId valide pour les tests
    validId = new mongoose.Types.ObjectId().toString();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
  let accessoireId: string;
  it("POST /accessoires/add - should add a new accessoire", async () => {
    const response = await request(app)
      .post("/accessoires/add")
      .field("category_id", validId) // Utiliser un ObjectId valide ici
      .field("name", "Test Accessoire")
      .field("price", "29.99")
      .field("color", "red");
    accessoireId = response.body.id;
    expect(response.status).toBe(201);
  });

  it("GET /accessoires - should get all accessoires", async () => {
    const response = await request(app).get("/accessoires");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("GET /accessoires/:id - should get a single accessoire", async () => {
    const response = await request(app).get(`/accessoires/${accessoireId}`);
    expect(response.status).toBe(200);
  });

  it("DELETE /accessoires/:id - should delete an accessoire", async () => {
    const response = await request(app).delete(`/accessoires/${accessoireId}`);
    expect(response.status).toBe(200);
  });
});
