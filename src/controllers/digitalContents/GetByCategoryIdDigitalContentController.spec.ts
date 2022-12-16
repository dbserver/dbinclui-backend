import request from "supertest";
import { App } from "../../App";
import { mongoInMemoryDatabase } from "./../../helpers/tests/mongoInMemoryDatabase";

beforeAll(async () => {
  await mongoInMemoryDatabase.open();
});

afterAll(async () => {
  await mongoInMemoryDatabase.close();
});

afterEach(async () => {
  await mongoInMemoryDatabase.clear();
});

beforeEach(async () => {
  await mongoInMemoryDatabase.createDigitalContent();
});

describe("GetByCategoryIdDigitalContentController", () => {
  const app = new App();

  it("Should return an empty array", async () => {
    const response = await request(app.getExpress).get(
      `/digital-contents/category/6203f8e880cb7f271145311f`,
    );
    const { data } = response.body;
    expect(data.length).toBe(0);
  });

  it("Should return 1 digital contents", async () => {
    const category = await mongoInMemoryDatabase.getCategory();
    const response = await request(app.getExpress).get(
      `/digital-contents/category/${category._id}`,
    );
    const { data } = response.body;
    expect(data.length).toBe(1);
  });
});
