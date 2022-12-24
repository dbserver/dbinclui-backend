import { jest } from "@jest/globals";
import request from "supertest";
import firebase from "firebase-admin";

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

describe("DeleteCategoryController", () => {
  beforeAll(async () => {
    firebase.initializeApp();
    await mongoInMemoryDatabase.open();
  });

  afterAll(async () => {
    await firebase.app().delete();
    await mongoInMemoryDatabase.close();
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
      .delete("/categories/123456")
      .set("Authorization", `Bearer ${token}`)
      .expect(403)
      .then((data) => {
        expect(data.body.message).toBe("Este token já foi expirado, acesso negado.");
      });
  });

  it("Should return a status 200 if delete is success", async () => {
    verifyIdTokenMock.mockReturnValue({
      uid: "123"
    });

    const token = "tokenValid";
    const firstCategory = await mongoInMemoryDatabase.getCategory();

    await request(app.getExpress)
      .delete(`/categories/${firstCategory._id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });

  it("Should return 400 if category does not exist", async () => {
    verifyIdTokenMock.mockReturnValue({});

    const token = "tokenExpired";
    const firstCategory = await mongoInMemoryDatabase.getCategory();

    await request(app.getExpress)
      .delete(`/categories/${firstCategory._id}1`)
      .set("Authorization", `Bearer ${token}`)
      .expect(400);
  });
});
