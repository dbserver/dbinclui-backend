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

describe("FavoriteDBExpressionController", () => {
  let express: App;

  beforeAll(async () => {
    firebase.initializeApp();
    await mongoInMemoryDatabase.open();
    express = new App();
  }, 60_000);

  beforeEach(async () => {
    verifyIdTokenMock.mockClear();
    await mongoInMemoryDatabase.createUser("123");
    await mongoInMemoryDatabase.createUser("1234");
    await mongoInMemoryDatabase.createDBExpression();
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
      .patch("/dbExpressions/favorite/123")
      .send({
        expression: "Olá, tudo bem?",
      })
      .set("Authorization", "Bearer 12345")
      .expect(403)
      .then((data) => {
        expect(data.body.message).toBe("Formato do token inválido, acesso negado.");
      });
  });

  it("Should favorite an DB Expression", async () => {
    verifyIdTokenMock.mockReturnValue({
      uid: "1234",
    });

    const token = "tokenValido";
    const user0 = await mongoInMemoryDatabase.getUser(0);
    const user1 = await mongoInMemoryDatabase.getUser(1);
    const expression = await mongoInMemoryDatabase.getDBExpression();

    await request(express.getExpress)
      .patch(`/dbExpressions/favorite/${expression._id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((data) => {
        expect(data.body).toHaveProperty("favoriteOf", [
          user0._id.toString(),
          user1._id.toString(),
        ]);
      });
  });

  it("Should desfavor an DB Expression", async () => {
    verifyIdTokenMock.mockReturnValue({
      uid: "123",
    });

    const token = "tokenValido";
    const expression = await mongoInMemoryDatabase.getDBExpression();

    await request(express.getExpress)
      .patch(`/dbExpressions/favorite/${expression._id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((data) => {
        expect(data.body).toHaveProperty("favoriteOf", []);
      });
  });
});
