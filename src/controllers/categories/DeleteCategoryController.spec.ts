import request from "supertest";
import { App } from "../../App";
import { mongoInMemoryDatabase } from "./../../helpers/tests/mongoInMemoryDatabase";

describe("Delete Post Controller", () => {
  beforeAll(async () => {
    await mongoInMemoryDatabase.open();
  });

  afterAll(async () => {
    await mongoInMemoryDatabase.close();
  });

  beforeEach(async () => {
    await mongoInMemoryDatabase.createCategory();
  });

  const app = new App();

  it("Should return a status 200 if delete is success", async () => {
    const firstCategory = await mongoInMemoryDatabase.getCategory();

    await request(app.getExpress)
      .delete(`/categories/${firstCategory._id}`)
      .expect(200);
  });

});