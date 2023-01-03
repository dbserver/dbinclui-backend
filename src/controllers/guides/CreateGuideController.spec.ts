import { jest } from "@jest/globals";
import firebase from "firebase-admin";
import request from "supertest";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import { App } from "../../App";
import { mongoInMemoryDatabase } from "./../../helpers/tests/mongoInMemoryDatabase";
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

describe("CreateGuideController", () => {
  beforeAll(async () => {
    firebase.initializeApp();
    await mongoInMemoryDatabase.open();
    await mongoInMemoryDatabase.createUser();
  }, 60_000);

  afterAll(async () => {
    await firebase.app().delete();
    await mongoInMemoryDatabase.close();
    fs.rmSync(filePath, { recursive: true, force: true });
  });

  const app = new App();

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

  it("Should be able to create a new guide", async () => {
    verifyIdTokenMock.mockReturnValue({
      uid: "123",
    });
    const token = "tokenValid";

    await request(app.getExpress)
      .post("/guides")
      .field("data", JSON.stringify({ title: "Título da guia", content: "Descrição da guia" }))
      .set("Authorization", `Bearer ${token}`)
      .attach("file", fileMock)
      .expect(200);
  });
});
