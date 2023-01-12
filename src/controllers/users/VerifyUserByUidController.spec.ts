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

describe("VerifyUserByUidController", () => {
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

  it("Should be false if user does not exists", async () => {
    verifyIdTokenMock.mockReturnValue({
      uid: "123456",
      name: "Joaozinho",
      email: "Joaozinho@email.com",
    });
    await request(express.getExpress)
      .get("/users/verify")
      .set("Authorization", "Bearer 123456")
      .expect(200)
      .then((data) => {
        expect(data.body).toBeFalsy();
      });
  });

  it("Should be true if user exist", async () => {
    verifyIdTokenMock.mockReturnValue({
      uid: "123",
    });
    await request(express.getExpress)
      .get("/users/verify")
      .set("Authorization", "Bearer 123456")
      .expect(200)
      .then((data) => {
        expect(data.body).toBeTruthy();
      });
  });
});