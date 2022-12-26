import request from "supertest";
import { jest } from "@jest/globals";
import firebase from "firebase-admin";

import { mongoInMemoryDatabase } from "../../helpers/tests/mongoInMemoryDatabase";
import { App } from "../../App";

const verifyIdTokenMock = jest.fn();

jest.mock("firebase-admin/auth", () => ({
  getAuth: jest.fn().mockImplementation(() => {
    return {
      verifyIdToken: verifyIdTokenMock,
    };
  }),
}));

describe("GetByUidUserController", () => {
  let express: App;

  beforeAll(async () => {
    firebase.initializeApp();
    express = new App();
    await mongoInMemoryDatabase.open();
    await mongoInMemoryDatabase.createUser();
  }, 60_000);

  beforeEach(async () => {
    verifyIdTokenMock.mockClear();
  });

  afterAll(async () => {
    await firebase.app().delete();
    await mongoInMemoryDatabase.close();
  });

  it("Should return a status 400 if user does not exists", async () => {
    verifyIdTokenMock.mockReturnValue({
      uid: "inexistente",
      name: "Joaozinho",
      email: "Joaozinho@email.com",
    });

    const token = "tokenValido";

    await request(express.getExpress)
      .get("/users")
      .set("Authorization", `Bearer ${token}`)
      .expect(400)
      .then((data) => {
        expect(data.body.message).toBe("User with this UID does not exists")
    });
  });

  it("Should be an UserEntity if user exists", async () => {
    verifyIdTokenMock.mockReturnValue({
      uid: "123",
    });

    const token = "tokenValido";

    await request(express.getExpress)
      .get("/users")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((data) => {
        expect(data.body.data).not.toBeNull();
        expect(data.body.data.name).toBe("Joao");
      });
  });
});
