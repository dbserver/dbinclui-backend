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

describe("DeleteGuideController", () => {
  beforeAll(async () => {
    firebase.initializeApp();
    await mongoInMemoryDatabase.open();
    await mongoInMemoryDatabase.createUser();
  }, 60_000);

  afterAll(async () => {
    firebase.app().delete();
    await mongoInMemoryDatabase.close();
    fs.rmSync(filePath, { recursive: true, force: true });
  });

  beforeEach(async () => {
    await mongoInMemoryDatabase.createGuide();
  });

  const app = new App();
  let guide = {} as any;

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

  it("Should be able to delete a guide and return 200 OK", async () => {
    verifyIdTokenMock.mockReturnValue({
      uid: "123",
    });
    const token = "tokenValid";

    guide = await mongoInMemoryDatabase.getGuide();
    await request(app.getExpress)
      .delete(`/guides/${guide._id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });

  it(`Should return 400 Bad request to trying delete ${guide._id} guide id`, async () => {
    verifyIdTokenMock.mockReturnValue({});
    const token = "tokenExpired";

    await request(app.getExpress)
      .delete(`/guides/${guide._id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(400);
  });
});
