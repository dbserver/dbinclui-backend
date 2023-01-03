import { jest } from "@jest/globals";
import firebase from "firebase-admin";
import request from "supertest";

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

describe("CreateCategoryController", () => {
  beforeAll(async () => {
    firebase.initializeApp();
    await mongoInMemoryDatabase.open();
  }, 60_000);

  afterAll(async () => {
    await firebase.app().delete();
    await mongoInMemoryDatabase.close();
  });

  beforeEach(async () => {
    await mongoInMemoryDatabase.createCategory();
  });

  afterEach(async () => {
    await mongoInMemoryDatabase.clear();
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

  it("Should be able to update a category", async () => {
    verifyIdTokenMock.mockReturnValue({
      uid: "123",
    });

    const token = "tokenValid";

    const category = await mongoInMemoryDatabase.getCategory();
    const user = await mongoInMemoryDatabase.getUser();
    const { guide } = category;
    await request(app.getExpress)
      .put(`/categories/${category._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        _id: category._id,
        title: "Novo título da categoria",
        shortDescription: "Descrição da categoria",
        guide: guide._id,
      })
      .expect(200)
      .then((data) => {
        expect(data.body.data.updatedBy).toBe(user._id.toString());
      });
  });

  it("Must not update a category with invalid id", async () => {
    verifyIdTokenMock.mockReturnValue({});

    const token = "tokenValid";

    const category = await mongoInMemoryDatabase.getCategory();
    const { guide } = category;
    const response = await request(app.getExpress)
      .put(`/categories/${category._id}1z2`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Novo título da categoria",
        shortDescription: "Descrição da categoria",
        guide: guide._id,
      });
    expect(response.statusCode).toBe(400);
  });
});
