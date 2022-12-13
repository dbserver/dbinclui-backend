import request from "supertest";
import { App } from "../../App";
import { mongoInMemoryDatabase } from "./../../helpers/tests/mongoInMemoryDatabase";

describe("GetAllGuidesController", () => {
  beforeAll(async () => {
    await mongoInMemoryDatabase.open();
  }, 60_000);

  afterAll(async () => {
    await mongoInMemoryDatabase.close();
  });

  const app = new App();
  it("Should return 200 OK if get success in requisition", async () => {
    await mongoInMemoryDatabase.createGuide();
    const { body } = await request(app.getExpress).get("/guides").expect(200);
    expect(body.data.length).toBe(1);
  });

  it(`Should return 400 Bad request to requisition if there are no guides in database`, async () => {
    await mongoInMemoryDatabase.clear();
    const { body } = await request(app.getExpress).get("/guides");
    expect(body.data.length).toBe(0);
  });
});
