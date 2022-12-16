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

describe("GetByGuideIdCategoryController", () => {
  const app = new App();

  it("Should return a status of 400 if the guide does not exist", async () => {
    const { guide } = await mongoInMemoryDatabase.getCategory();
    await request(app.getExpress).get(`/categories/guide/${guide}1`).expect(400);
  });

  it("Should return a status of 200 if category exists on guide", async () => {
    const { guide } = await mongoInMemoryDatabase.getCategory();
    await request(app.getExpress).get(`/categories/guide/${guide}`).expect(200);
  });
});
