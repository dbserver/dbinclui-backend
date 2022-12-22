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

describe("CreateUsersExpressions", () => {
  let express: App;

  beforeAll(async () => {
    firebase.initializeApp();
    await mongoInMemoryDatabase.open();
    express = new App();
  }, 60_000);

  beforeEach(async () => {
    verifyIdTokenMock.mockClear();
    await mongoInMemoryDatabase.createUser();
  });

  afterAll(async () => {
    await firebase.app().delete();
    await mongoInMemoryDatabase.close();
  });

  it("Should create an User Expression", async () => {
    const token =
      "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFmZjFlNDJlNDE0M2I4MTQxM2VjMTI1MzQwOTcwODUxZThiNDdiM2YiLCJ0eXAiOiJKV1QifQ";

    verifyIdTokenMock.mockReturnValue({
      uid: "123",
      name: "Joao",
      email: "Joao@email.com",
    });

    await request(express.getExpress)
      .post("/usersExpressions")
      .send({
        expression: "Olá, tudo bem?",
      })
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((data) => {
        expect(data.body._id).not.toBeNull();
        expect(data.body.expression).toBe("Olá, tudo bem?");
      });
  });

  it("Should return status 400 if uid already exists in database", async () => {
    const token =
      "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFmZjFlNDJlNDE0M2I4MTQxM2VjMTI1MzQwOTcwODUxZThiNDdiM2YiLCJ0eXAiOiJKV1QifQ";

    verifyIdTokenMock.mockReturnValue({
      uid: "9182",
      name: "Joao",
      email: "Joao@email.com",
    });

    await request(express.getExpress)
      .post("/usersExpressions")
      .send({
        expression: "Olá, tudo bem?",
      })
      .set("Authorization", `Bearer ${token}`)
      .expect(400)
      .then((data) => {
        expect(data.body.message).toBe("User with this uid already exists.");
      });
  });

  it("Should return status 403 and a message format token invalid", async () => {
    verifyIdTokenMock.mockImplementation(() => {
      throw new ErrorFirebaseHelper("auth/argument-error");
    });

    await request(express.getExpress)
      .post("/usersExpressions")
      .send({
        expression: "Olá, tudo bem?",
      })
      .set("Authorization", "Bearer 12345")
      .expect(403)
      .then((data) => {
        expect(data.body.message).toBe("Formato do token inválido, acesso negado.");
      });
  });
});
