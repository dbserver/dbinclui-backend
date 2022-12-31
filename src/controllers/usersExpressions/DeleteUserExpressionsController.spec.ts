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

describe("DeleteUserExpressionsController", () => {
  let express: App;

  beforeAll(async () => {
    express = new App();
    firebase.initializeApp();
    await mongoInMemoryDatabase.open();
  }, 60_000);

  beforeEach(async () => {
    await mongoInMemoryDatabase.createUser();
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
      .delete("/usersExpressions/1231231")
      .set("Authorization", "Bearer 123456")
      .expect(403)
      .then((data) => {
        expect(data.body.message).toBe("Formato do token inválido, acesso negado.");
      });
  });

  it("Should return a status 400 if expressionID does not exist", async () => {
    verifyIdTokenMock.mockReturnValue({
      uid: "123",
    });

    const token = "tokenValid";

    await request(express.getExpress)
      .delete("/usersExpressions/6382b82611a630eb7bf0fb7e")
      .set("Authorization", `Bearer ${token}`)
      .expect(400)
      .then((data) => {
        expect(data.body.message).toBe("Expression with this id does not exists.");
      });
  });

  it("Should delete and return an EntityDeleted", async () => {
    verifyIdTokenMock.mockReturnValue({
      uid: "123",
    });

    const token = "tokenValid";
    const expression = await mongoInMemoryDatabase.getExpression();

    await request(express.getExpress)
      .delete(`/usersExpressions/${expression._id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((data) => {
        expect(data.body._id).toBe(expression._id.toString());
        expect(data.body.expression).toBe("Expressão de test");
      });
  });
});
