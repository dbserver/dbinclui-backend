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

describe("GetAllByIdUserExpressionsController", () => {
  let express: App;

  beforeAll(async () => {
    express = new App();
    firebase.initializeApp();
    await mongoInMemoryDatabase.open();
  }, 60_000);

  beforeEach(async () => {
    await mongoInMemoryDatabase.createUser("123");
    await mongoInMemoryDatabase.createUser("1234");
    await mongoInMemoryDatabase.createUserExpression();
  });

  afterEach(async () => {
    await mongoInMemoryDatabase.clear();
  });

  afterAll(async () => {
    await firebase.app().delete();
    await mongoInMemoryDatabase.close();
  });

  it("Should return status 403 and a message format token invalid", async () => {
    verifyIdTokenMock.mockImplementation(() => {
      throw new ErrorFirebaseHelper("auth/argument-error");
    });

    await request(express.getExpress)
      .get("/usersExpressions")
      .set("Authorization", "Bearer 123456")
      .expect(403)
      .then((data) => {
        expect(data.body.message).toBe("Formato do token inválido, acesso negado.");
      });
  });

  it("Should be an empty array if the user does not create an expression", async () => {
    verifyIdTokenMock.mockReturnValue({
      uid: "1234",
    });

    const token = "tokenValid";

    await request(express.getExpress)
      .get("/usersExpressions")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((data) => {
        expect(data.body.data.length).toEqual(0);
      });
  });

  it("Should be an empty array if the user does not create an expression", async () => {
    verifyIdTokenMock.mockReturnValue({
      uid: "123",
    });

    const token = "tokenValid";

    await request(express.getExpress)
      .get("/usersExpressions")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((data) => {
        expect(data.body.data.length).toEqual(1);
      });
  });
});
