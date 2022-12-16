import request from "supertest";
import { App } from "../../App";
import { mongoInMemoryDatabase } from "./../../helpers/tests/mongoInMemoryDatabase";

beforeAll(async () => {
  await mongoInMemoryDatabase.open();
});

afterAll(async () => {
  await mongoInMemoryDatabase.close();
});

beforeEach(async () => {
  await mongoInMemoryDatabase.createCategory();
});

describe("GetByIdCategoryController", () => {
  const app = new App();

  it("Should return a status of 400 if the category does not exist", async () => {
    const firstCategory = await mongoInMemoryDatabase.getCategory();
    await request(app.getExpress).get(`/categories/${firstCategory._id}1`).expect(400);
  });

  it("Should return a status of 200 if category exists", async () => {
    const firstCategory = await mongoInMemoryDatabase.getCategory();
    await request(app.getExpress).get(`/categories/${firstCategory._id}`).expect(200);
  });
});
