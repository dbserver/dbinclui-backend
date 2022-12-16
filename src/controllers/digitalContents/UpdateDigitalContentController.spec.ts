import { mongoInMemoryDatabase } from "./../../helpers/tests/mongoInMemoryDatabase";
import { fileURLToPath } from "url";
import { App } from "../../App";
import request from "supertest";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.resolve(__dirname, "..", "..", "..", "temps", "uploads");
const fileMock = path.resolve(__dirname, "..", "..", "..", "temps", "tests", "4495.jpg");

describe("UpdateDigitalContent", () => {
  beforeAll(async () => {
    await mongoInMemoryDatabase.open();
  }, 60_000);

  afterAll(async () => {
    await mongoInMemoryDatabase.close();
    fs.rmSync(filePath, { recursive: true, force: true });
  });

  beforeEach(async () => {
    await mongoInMemoryDatabase.createCategory();
    await mongoInMemoryDatabase.createDigitalContent();
  });

  afterEach(async () => {
    await mongoInMemoryDatabase.clear();
  });

  const app = new App();

  it("Should be able to update a digital content", async () => {
    const digitalContent = await mongoInMemoryDatabase.getDigitalContent();
    const category = await mongoInMemoryDatabase.getCategory();
    const { guide } = category;
    const response = await request(app.getExpress)
      .put(`/digital-contents/${digitalContent._id}`)
      .field(
        "data",
        JSON.stringify({
          title: `Título atualizado`,
          shortDescription: `Descrição atualizado`,
          guide: guide._id,
          category: category._id,
        }),
      );
    expect(response.statusCode).toBe(200);
    const { title } = response.body.data;
    expect(title).toEqual("Título atualizado");
  });

  it("Must not update a guide without its id", async () => {
    const category = await mongoInMemoryDatabase.getCategory();
    const { guide } = category;
    const response = await request(app.getExpress)
      .put(`/digital-contents/`)
      .field(
        "data",
        JSON.stringify({
          title: "`Título do conteúdo digital`",
          shortDescription: `Descrição do conteúdo digital atualizado`,
          guide: guide._id,
          category: category._id,
        }),
      )
      .attach("files", fileMock);
    expect(response.statusCode).toBe(404);
  });

  it("Must not update a digital content with invalid id", async () => {
    const digitalContent = await mongoInMemoryDatabase.getDigitalContent();
    const category = await mongoInMemoryDatabase.getCategory();
    const { guide } = category;
    const response = await request(app.getExpress)
      .put(`/digital-contents/232ine`)
      .field(
        "data",
        JSON.stringify({
          title: `Título do conteúdo digital`,
          shortDescription: `Descrição do conteúdo digital`,
          guide: guide._id,
          category: category._id,
        }),
      )
      .attach("files", fileMock);

    expect(response.statusCode).toBe(400);
  });
});
