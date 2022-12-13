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
  await mongoInMemoryDatabase.createDigitalContent();
});

describe("GetByIdDigitalContentController", () => {
  const app = new App();

  it("Should return a status of 400 if the digital content does not exist", async () => {
    const response = await request(app.getExpress).get(
      `/digital-contents/6203fd2780cb7f271145302f`,
    );
    expect(400);
    const { message } = response.body;
    expect(message).toEqual("Digital Content with this ID does not exists");
  });

  it("Should return a status of 400 if id is invalid", async () => {
    const firstDigitalContent = await mongoInMemoryDatabase.getDigitalContent();
    const response = await request(app.getExpress).get(
      `/digital-contents/${firstDigitalContent._id}48518`,
    );
    expect(400);
    const { message } = response.body;
    expect(message[0].msg).toEqual("Formato do ID do conteúdo inválido");
  });

  it("Should return a status of 200 if digital content exists", async () => {
    const firstDigitalContent = await mongoInMemoryDatabase.getDigitalContent();
    await request(app.getExpress).get(`/digital-contents/${firstDigitalContent._id}`).expect(200);
  });
});
