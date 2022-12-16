import request from "supertest";
import { App } from "../../App";
import { mongoInMemoryDatabase } from "./../../helpers/tests/mongoInMemoryDatabase";

describe("CreateCategoryController", () => {
  beforeAll(async () => {
    await mongoInMemoryDatabase.open();
  }, 60_000);

  afterAll(async () => {
    await mongoInMemoryDatabase.close();
  });

  afterEach(async () => {
    await mongoInMemoryDatabase.clear();
  });

  beforeEach(async () => {
    await mongoInMemoryDatabase.createCategory();
  });

  const app = new App();

  it("Should be able to update a category", async () => {
    const category = await mongoInMemoryDatabase.getCategory();
    const { guide } = category;
    const response = await request(app.getExpress).put(`/categories/${category._id}`).send({
      _id: category._id,
      title: "Novo título da categoria",
      shortDescription: "Descrição da categoria",
      guide: guide._id,
    });
    expect(response.statusCode).toBe(200);
  });

  it("Must not update a category with invalid id", async () => {
    const category = await mongoInMemoryDatabase.getCategory();
    const { guide } = category;
    const response = await request(app.getExpress).put(`/categories/${category._id}1z2`).send({
      title: "Novo título da categoria",
      shortDescription: "Descrição da categoria",
      guide: guide._id,
    });
    expect(response.statusCode).toBe(400);
  });
});
