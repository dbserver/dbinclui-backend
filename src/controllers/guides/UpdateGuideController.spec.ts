import { jest } from "@jest/globals";
import firebase from "firebase-admin";
import request from "supertest";
import { App } from "../../App";
import path from "path";
import { fileURLToPath } from "url";
import { mongoInMemoryDatabase } from "./../../helpers/tests/mongoInMemoryDatabase";
import fs from "fs";
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

describe("UpdateGuideController", () => {
  beforeAll(async () => {
    firebase.initializeApp();
    await mongoInMemoryDatabase.open();
    await mongoInMemoryDatabase.createGuide();
  }, 60_000);

  afterAll(async () => {
    await firebase.app().delete();
    await mongoInMemoryDatabase.close();
    fs.rmSync(filePath, { recursive: true, force: true });
  });

  const app = new App();
  let guide = {} as any;

  const newTitle = "Novo titulo do guia";
  const newContentText = "Nova descrição do guia";

  it("Should return status 403 and a message id token expired", async () => {
    verifyIdTokenMock.mockImplementation(() => {
      throw new ErrorFirebaseHelper("auth/id-token-expired");
    });

    const token = "tokenExpired";

    await request(app.getExpress)
      .delete("/guides/123456")
      .set("Authorization", `Bearer ${token}`)
      .expect(403)
      .then((data) => {
        expect(data.body.message).toBe("Este token já foi expirado, acesso negado.");
      });
  });

  it("Should be able to update a guide", async () => {
    verifyIdTokenMock.mockReturnValue({
      uid: "123",
    });
    const token = "tokenValid";

    guide = await mongoInMemoryDatabase.getGuide();

    expect(guide.title).toBe("Título do guia");
    expect(guide.content).toBe("Conteúdo do guia");
    const { body } = await request(app.getExpress)
      .put(`/guides/${guide._id}`)
      .set("Authorization", `Bearer ${token}`)
      .field("data", JSON.stringify({ title: newTitle, content: newContentText }))
      .attach("file", fileMock)
      .expect(200);

    expect(body.data.title).toBe(newTitle);
    expect(body.data.content).toBe(newContentText);
    expect(JSON.stringify(body.data._id)).toBe(JSON.stringify(guide._id));
  });

  it("Shouldn't be able to update if guide ID is invalid", async () => {
    verifyIdTokenMock.mockReturnValue({});
    const token = "tokenValid";

    await request(app.getExpress)
      .put("/guides/invalidID")
      .set("Authorization", `Bearer ${token}`)
      .field("data", JSON.stringify({ title: "Um outro titulo", content: "Uma outra descrição" }))
      .attach("file", fileMock)
      .expect(400);
    guide = await mongoInMemoryDatabase.getGuide();
    expect(guide.title).toBe(newTitle);
  });
});
