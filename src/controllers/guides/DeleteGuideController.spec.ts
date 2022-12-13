import request from "supertest";
import { App } from "../../App";
import { mongoInMemoryDatabase } from "./../../helpers/tests/mongoInMemoryDatabase";

describe("DeleteGuideController", () => {
  beforeAll(async () => {
    await mongoInMemoryDatabase.open();
  }, 60_000);

  afterAll(async () => {
    await mongoInMemoryDatabase.close();
  });

  beforeEach(async () => {
    await mongoInMemoryDatabase.createGuide();
  });

  const app = new App();
  let guide = {} as any;

  it("Should be able to delete a guide and return 200 OK", async () => {
    guide = await mongoInMemoryDatabase.getGuide();
    await request(app.getExpress).delete(`/guides/${guide._id}`).expect(200);
  });

  it(`Should return 400 Bad request to trying delete ${guide._id} guide id`, async () => {
    await request(app.getExpress).delete(`/guides/${guide._id}`).expect(400);
  });
});
