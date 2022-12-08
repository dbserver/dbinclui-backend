import request from "supertest";
import { App } from "../../App"
import { mongoInMemoryDatabase } from './../../helpers/tests/mongoInMemoryDatabase';

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
    await mongoInMemoryDatabase.createGuide();
  })

  const app = new App();

  it("Should be able to create a new category", async () => {
      const guide = await mongoInMemoryDatabase.getGuide()
      await request(app.getExpress)
      .post("/categories")
      .send({
        title: "Título da categoria",
        shortDescription: "Descrição da categoria",
        guide: guide._id
        })
    expect(200)
    })

});
