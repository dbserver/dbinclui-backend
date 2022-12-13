import request from "supertest";
import { App } from "../../App";
import { mongoInMemoryDatabase } from "./../../helpers/tests/mongoInMemoryDatabase";

describe("GetCategoriesAndContentController", () => {
  beforeAll(async () => {
    await mongoInMemoryDatabase.open();
    await mongoInMemoryDatabase.createDigitalContent();
  }, 60_000);

  afterAll(async () => {
    await mongoInMemoryDatabase.close();
  });

  const app = new App();
  let guide = {} as any;
  it("Should return 200 OK if get success in requisition", async () => {
    const digitalContent = await mongoInMemoryDatabase.getDigitalContent();
    guide = await mongoInMemoryDatabase.getGuide();
    const { body } = await request(app.getExpress)
      .get(`/guides/categoriesAndContent/${guide._id}`)
      .expect(200);

    expect(body.data.categories[0].digitalContents[0]).toHaveProperty(
      "_id",
      digitalContent._id.toString(),
    );
  });

  it(`Should return an empty object if guide with content not exists`, async () => {
    const { body } = await request(app.getExpress).get(
      "/guides/categoriesAndContent/invalidGuideWithContentID",
    );
    expect(body.data).toBeUndefined();
  });

  it(`Should return an empty object if there are no guides with contents in database`, async () => {
    await mongoInMemoryDatabase.clear();
    const { body } = await request(app.getExpress).get(`/guides/categoriesAndContent/${guide._id}`);
    expect(body.data).toBeUndefined();
  });
});
