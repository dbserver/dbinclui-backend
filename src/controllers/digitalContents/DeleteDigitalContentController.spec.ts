import { jest } from "@jest/globals";
import firebase from "firebase-admin";
import request from "supertest";

import { App } from "../../App";
import { mongoInMemoryDatabase } from "../../helpers/tests/mongoInMemoryDatabase";
import { ErrorFirebaseHelper } from "../../helpers/errors/ErrorFirebase";

const verifyIdTokenMock = jest.fn();

jest.mock("firebase-admin/auth", () => ({
  getAuth: jest.fn().mockImplementation(() => {
    return {
      verifyIdToken: verifyIdTokenMock,
    };
  }),
}));

describe("DeleteDigitalContentController", () => {
  beforeAll(async () => {
    firebase.initializeApp();
    await mongoInMemoryDatabase.open();
  });

  afterAll(async () => {
    await firebase.app().delete();
    await mongoInMemoryDatabase.close();
  });

  beforeEach(async () => {
    await mongoInMemoryDatabase.createDigitalContent();
  });

  const app = new App();

  it("Should return status 403 and a message id token expired", async () => {
    verifyIdTokenMock.mockImplementation(() => {
      throw new ErrorFirebaseHelper("auth/id-token-expired");
    });

    const token = "tokenExpired";

    await request(app.getExpress)
      .delete("/categories/123456")
      .set("Authorization", `Bearer ${token}`)
      .expect(403)
      .then((data) => {
        expect(data.body.message).toBe("Este token já foi expirado, acesso negado.");
      });
  });

  it("Should return a status 200 if delete is success", async () => {
    verifyIdTokenMock.mockReturnValue({});
    const token = "tokenValid";
    const firstDigitalContent = await mongoInMemoryDatabase.getDigitalContent();

    await request(app.getExpress)
      .delete(`/digital-contents/${firstDigitalContent._id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });

  it("Should return 400 if digital contents does not exist", async () => {
    verifyIdTokenMock.mockReturnValue({});
    const token = "tokenValid";
    const firstDigitalContent = await mongoInMemoryDatabase.getDigitalContent();

    await request(app.getExpress)
      .delete(`/digital-contents/${firstDigitalContent._id}1`)
      .set("Authorization", `Bearer ${token}`)
      .expect(400);
  });
});
