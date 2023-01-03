import { jest } from "@jest/globals";
import firebase from "firebase-admin";
import request from "supertest";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import { mongoInMemoryDatabase } from "./../../helpers/tests/mongoInMemoryDatabase";
import { App } from "../../App";
import { ErrorFirebaseHelper } from "../../helpers/errors/ErrorFirebase";

const verifyIdTokenMock = jest.fn();

jest.mock("firebase-admin/auth", () => ({
  getAuth: jest.fn().mockImplementation(() => {
    return {
      verifyIdToken: verifyIdTokenMock,
    };
  }),
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.resolve(__dirname, "..", "..", "..", "temps", "uploads");
const fileMock = path.resolve(__dirname, "..", "..", "..", "temps", "tests", "4495.jpg");

describe("CreateDigitalContent", () => {
  beforeAll(async () => {
    firebase.initializeApp();
    await mongoInMemoryDatabase.open();
  }, 60_000);

  afterAll(async () => {
    await firebase.app().delete();
    await mongoInMemoryDatabase.close();
    fs.rmSync(filePath, { recursive: true, force: true });
  });

  beforeEach(async () => {
    await mongoInMemoryDatabase.createCategory();
  });

  const app = new App();

  it("Should return status 403 and a message id token expired", async () => {
    verifyIdTokenMock.mockImplementation(() => {
      throw new ErrorFirebaseHelper("auth/id-token-expired");
    });

    const token = "tokenExpired";

    await request(app.getExpress)
      .delete("/digital-contents/123456")
      .set("Authorization", `Bearer ${token}`)
      .expect(403)
      .then((data) => {
        expect(data.body.message).toBe("Este token já foi expirado, acesso negado.");
      });
  });

  it("Should be able to create a new digital content", async () => {
    verifyIdTokenMock.mockReturnValue({
      uid: "123",
    });
    const token = "tokenValid";

    const category = await mongoInMemoryDatabase.getCategory();
    const { guide } = category;

    await request(app.getExpress)
      .post("/digital-contents")
      .set("Authorization", `Bearer ${token}`)
      .attach("files", fileMock)
      .field(
        "data",
        JSON.stringify({
          title: `Título do conteúdo digital`,
          shortDescription: `Descrição do conteúdo digital`,
          guide: guide._id,
          category: category._id,
        }),
      )
      .expect(200);
  });

  it("Must not create new digital content without a media file", async () => {
    verifyIdTokenMock.mockReturnValue({
      uid: "123",
    });
    const token = "tokenValid";
    const category = await mongoInMemoryDatabase.getCategory();
    const { guide } = category;

    const response = await request(app.getExpress)
      .post("/digital-contents")
      .set("Authorization", `Bearer ${token}`)
      .field(
        "data",
        JSON.stringify({
          title: `Título do conteúdo digital`,
          shortDescription: `Descrição do conteúdo digital`,
          guide: guide._id,
          category: category._id,
        }),
      )
      .expect(400);
    expect(response.body.message).toEqual("Você precisa enviar alguma mídia (imagem ou vídeo)");
  });
});
