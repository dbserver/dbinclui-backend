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

describe("GetByIdDBExpressionController", () => {
  let express: App;

  beforeAll(async () => {
    firebase.initializeApp();
    await mongoInMemoryDatabase.open();
    express = new App();
  }, 60_000);

  beforeEach(async () => {
    verifyIdTokenMock.mockClear();
    await mongoInMemoryDatabase.createUser("123");
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

    const expression = await mongoInMemoryDatabase.getDBExpression();

    await request(express.getExpress)
      .get(`/dbExpressions/${expression._id}`)
      .send({
        expression: "Olá, tudo bem?",
      })
      .set("Authorization", "Bearer 12345")
      .expect(403)
      .then((data) => {
        expect(data.body.message).toBe("Formato do token inválido, acesso negado.");
      });
  });

  it("Should get an DB Expression", async () => {
    verifyIdTokenMock.mockReturnValue({
      uid: "123",
    });

    const token = "tokenValido";
    const user0 = await mongoInMemoryDatabase.getUser(0);
    const expression = await mongoInMemoryDatabase.getDBExpression();

    await request(express.getExpress)
      .get(`/dbExpressions/${expression._id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((data) => {
        expect(data.body.data).toHaveProperty("expression", "Expressão de test da DB");
        expect(data.body.data).toHaveProperty("deleted", false);
      });
  });

  it("Should return a status of 400 if the dbExpression does not exist", async () => {
    verifyIdTokenMock.mockReturnValue({
      uid: "123",
    });

    const token = "tokenValido";

    await request(express.getExpress)
      .get(`/dbExpressions/00b0ca0e854846b04e46fca0`)
      .set("Authorization", `Bearer ${token}`)
      .expect(400);
  });
});
