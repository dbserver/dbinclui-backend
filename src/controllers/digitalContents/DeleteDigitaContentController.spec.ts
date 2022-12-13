import request from "supertest";
import { App } from "../../App";
import { mongoInMemoryDatabase } from "./../../helpers/tests/mongoInMemoryDatabase";

describe("DeleteDigitalContentController", () => {
  beforeAll(async () => {
    await mongoInMemoryDatabase.open();
  });

  afterAll(async () => {
    await mongoInMemoryDatabase.close();
  });

  beforeEach(async () => {
    await mongoInMemoryDatabase.createDigitalContent();
  });

  const app = new App();

  it("Should return a status 200 if delete is success", async () => {
    const firstDigitalContent = await mongoInMemoryDatabase.getDigitalContent();

    await request(app.getExpress).delete(`/digital-contents/${firstDigitalContent._id}`);
    expect(200);
  });

  it("Should return 400 if digital contents does not exist", async () => {
    const firstDigitalContent = await mongoInMemoryDatabase.getDigitalContent();

    await request(app.getExpress).delete(`/digital-contents/${firstDigitalContent._id}1`);
    expect(400);
  });
});
