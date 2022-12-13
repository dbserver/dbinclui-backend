import request from "supertest";
import { App } from "../../App";
import { mongoInMemoryDatabase } from "./../../helpers/tests/mongoInMemoryDatabase";

describe("GetByIdGuideController", () => {
  beforeAll(async () => {
    await mongoInMemoryDatabase.open();
    await mongoInMemoryDatabase.createGuide();
  }, 60_000);

  afterAll(async () => {
    await mongoInMemoryDatabase.close();
  });

  const app = new App();
  let guide = {} as any;
  it("Should return 200 OK if get success in requisition", async () => {
    guide = await mongoInMemoryDatabase.getGuide();
    const { body } = await request(app.getExpress).get(`/guides/${guide._id}`).expect(200);
    expect(JSON.stringify(body.data._id)).toBe(JSON.stringify(guide._id));
  });

  it(`Should return 400 Bad request if guide ID not exists`, async () => {
    const { body } = await request(app.getExpress).get("/guides/invalidGuideID").expect(400);
    expect(body.data).toBeUndefined();
  });

  it(`Should return 400 Bad request if there are no guides in database`, async () => {
    await mongoInMemoryDatabase.clear();
    const { body } = await request(app.getExpress).get(`/guides/${guide._id}`).expect(400);
    expect(body.data).toBeUndefined();
  });
});
