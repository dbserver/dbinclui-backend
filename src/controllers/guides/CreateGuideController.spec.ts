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

describe("CreateGuideController", () => {
  beforeAll(async () => {
    await mongoInMemoryDatabase.open();
  }, 60_000);

  afterEach(() => {
    fs.rmSync(filePath, { recursive: true, force: true });
  });

  afterAll(async () => {
    await mongoInMemoryDatabase.close();
  });

  const app = new App();

  it("Should be able to create a new guide", async () => {
    await request(app.getExpress)
      .post("/guides")
      .field("data", JSON.stringify({ title: "Título da guia", content: "Descrição da guia" }))
      .attach("file", fileMock)
      .expect(200);
  });
});
