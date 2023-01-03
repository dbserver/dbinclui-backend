import request from "supertest";
import { App } from "../../App";
import { mongoInMemoryDatabase } from "./../../helpers/tests/mongoInMemoryDatabase";

describe("GetAllGuidesController", () => {
  beforeAll(async () => {
    await mongoInMemoryDatabase.open();
    await mongoInMemoryDatabase.createGuide();
  }, 60_000);

  afterEach(async () => {
    await mongoInMemoryDatabase.clear();
  });

  afterAll(async () => {
    await mongoInMemoryDatabase.close();
  });

  const app = new App();
  it("Should return 200 OK if get success in requisition", async () => {
    const { body } = await request(app.getExpress).get("/guides").expect(200);
    expect(body.data.length).toBe(1);
  });

  it(`Should return an array empty and status 200`, async () => {
    const { body } = await request(app.getExpress).get("/guides");
    expect(body.data.length).toBe(0);
  });
});
