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

describe("CreateDigitalContent", () => {
  beforeAll(async () => {
    await mongoInMemoryDatabase.open();
  }, 60_000);

  afterAll(async () => {
    await mongoInMemoryDatabase.close();
  });

  beforeEach(async () => {
    await mongoInMemoryDatabase.createCategory();
  });

  afterEach(() => {
    fs.rmSync(filePath, { recursive: true, force: true });
  });

  const app = new App();

  it("Should be able to create a new digital content", async () => {
    const category = await mongoInMemoryDatabase.getCategory();
    const { guide } = category;

    await request(app.getExpress)
      .post("/digital-contents")
      .field(
        "data",
        JSON.stringify({
          title: `Título do conteúdo digital`,
          shortDescription: `Descrição do conteúdo digital`,
          guide: guide._id,
          category: category._id,
        }),
      )
      .attach("files", fileMock)
      .expect(200);
  });

  it("Must not create new digital content without a media file", async () => {
    const category = await mongoInMemoryDatabase.getCategory();
    const { guide } = category;

    const response = await request(app.getExpress)
      .post("/digital-contents")
      .field(
        "data",
        JSON.stringify({
          title: `Título do conteúdo digital`,
          shortDescription: `Descrição do conteúdo digital`,
          guide: guide._id,
          category: category._id,
        }),
      );
    expect(400);
    expect(response.body.message).toEqual("Você precisa enviar alguma mídia (imagem ou vídeo)");
  });
});
