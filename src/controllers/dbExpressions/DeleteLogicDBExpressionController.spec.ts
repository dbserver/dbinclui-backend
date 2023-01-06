import { jest } from "@jest/globals";
import request from "supertest";
import firebase from "firebase-admin";

import { mongoInMemoryDatabase } from "./../../helpers/tests/mongoInMemoryDatabase";
import { ErrorFirebaseHelper } from "../../helpers/errors/ErrorFirebase";
import { App } from "../../App";

const verifyIdTokenMock = jest.fn();

jest.mock("firebase-admin/auth", () => ({
  getAuth: jest.fn().mockImplementation(() => {
    return {
      verifyIdToken: verifyIdTokenMock,
    };
  }),
}));

describe("DeleteLogicDBExpressionController", () => {
  beforeAll(async () => {
    firebase.initializeApp();
    await mongoInMemoryDatabase.open();
    await mongoInMemoryDatabase.createUser();
    await mongoInMemoryDatabase.createDBExpression();
  }, 60_000);

  afterAll(async () => {
    firebase.app().delete();
    await mongoInMemoryDatabase.close();
  });

  afterEach(() => {
    verifyIdTokenMock.mockClear();
  });

  const app = new App();

  it("Should return status 403 and a message id token expired", async () => {
    verifyIdTokenMock.mockImplementation(() => {
      throw new ErrorFirebaseHelper("auth/id-token-expired");
    });

    const token = "tokenExpired";

    await request(app.getExpress)
      .patch("/dbExpressions/delete/123456")
      .set("Authorization", `Bearer ${token}`)
      .expect(403)
      .then((data) => {
        expect(data.body.message).toBe("Este token já foi expirado, acesso negado.");
      });
  });

  it("Should be delete logic and return 200 OK", async () => {
    verifyIdTokenMock.mockReturnValue({
      uid: "123",
    });

    const token = "tokenValid";

    const dbExpression = await mongoInMemoryDatabase.getDBExpression();

    await request(app.getExpress)
      .patch(`/dbExpressions/delete/${dbExpression._id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((data) => {
        expect(data.body.data.deleted).toBeTruthy();
      });
  });
});
