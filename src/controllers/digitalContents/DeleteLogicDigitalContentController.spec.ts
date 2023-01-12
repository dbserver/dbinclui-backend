import { jest } from "@jest/globals";
import request from "supertest";
import firebase from "firebase-admin";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

import { App } from "../../App";
import { mongoInMemoryDatabase } from "./../../helpers/tests/mongoInMemoryDatabase";
import { ErrorFirebaseHelper } from "../../helpers/errors/ErrorFirebase";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, "..", "..", "..", "temps", "uploads");

const verifyIdTokenMock = jest.fn();

jest.mock("firebase-admin/auth", () => ({
  getAuth: jest.fn().mockImplementation(() => {
    return {
      verifyIdToken: verifyIdTokenMock,
    };
  }),
}));

describe("DeleteLogicCategoryController", () => {
  beforeAll(async () => {
    firebase.initializeApp();
    await mongoInMemoryDatabase.open();
    await mongoInMemoryDatabase.createCategory();
  }, 60_000);

  afterAll(async () => {
    firebase.app().delete();
    await mongoInMemoryDatabase.close();
    fs.rmSync(filePath, { recursive: true, force: true });
  });

  afterEach(() => {
    verifyIdTokenMock.mockClear();
  });

  const app = new App();
  let category = {} as any;

  it("Should return status 403 and a message id token expired", async () => {
    verifyIdTokenMock.mockImplementation(() => {
      throw new ErrorFirebaseHelper("auth/id-token-expired");
    });

    const token = "tokenExpired";

    await request(app.getExpress)
      .patch("/categories/delete/123456")
      .set("Authorization", `Bearer ${token}`)
      .expect(403)
      .then((data) => {
        expect(data.body.message).toBe("Este token já foi expirado, acesso negado.");
      });
  });

  it(`Should return 400 Bad request to trying delete a category with id invalid`, async () => {
    verifyIdTokenMock.mockReturnValue({});
    const token = "tokenValid";

    await request(app.getExpress)
      .patch(`/categories/delete/123`)
      .set("Authorization", `Bearer ${token}`)
      .expect(400);
  });
  it("Should be delete logic and return 200 OK", async () => {
    verifyIdTokenMock.mockReturnValue({
      uid: "123",
    });

    const token = "tokenValid";

    category = await mongoInMemoryDatabase.getCategory();

    await request(app.getExpress)
      .patch(`/categories/delete/${category._id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((data) => {
        expect(data.body.data.deleted).toBeTruthy();
      });
  });
});
