import request from "supertest";
import { App } from "../../App";
import path from "path";
import { fileURLToPath } from "url";
import { mongoInMemoryDatabase } from "./../../helpers/tests/mongoInMemoryDatabase";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.resolve(__dirname, "..", "..", "..", "temps", "uploads");
const fileMock = path.resolve(__dirname, "..", "..", "..", "temps", "tests", "4495.jpg");

describe("UpdateGuideController", () => {
  beforeAll(async () => {
    await mongoInMemoryDatabase.open();
    await mongoInMemoryDatabase.createGuide();
  }, 60_000);

  afterAll(async () => {
    await mongoInMemoryDatabase.close();
    fs.rmSync(filePath, { recursive: true, force: true });
  });

  const app = new App();
  let guide = {} as any;

  const newTitle = "Novo titulo do guia";
  const newContentText = "Nova descrição do guia";

  it("Should be able to update a guide", async () => {
    guide = await mongoInMemoryDatabase.getGuide();

    expect(guide.title).toBe("Título do guia");
    expect(guide.content).toBe("Conteúdo do guia");
    const { body } = await request(app.getExpress)
      .put(`/guides/${guide._id}`)
      .field("data", JSON.stringify({ title: newTitle, content: newContentText }))
      .attach("file", fileMock)
      .expect(200);

    expect(body.data.title).toBe(newTitle);
    expect(body.data.content).toBe(newContentText);
    expect(JSON.stringify(body.data._id)).toBe(JSON.stringify(guide._id));
  });

  it("Shouldn't be able to update if guide ID is invalid", async () => {
    const { body } = await request(app.getExpress)
      .put("/guides/invalidID")
      .field("data", JSON.stringify({ title: "Um outro titulo", content: "Uma outra descrição" }))
      .attach("file", fileMock)
      .expect(400);
    guide = await mongoInMemoryDatabase.getGuide();
    expect(guide.title).toBe(newTitle);
  });
});
