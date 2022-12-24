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

  afterEach(async () => {
    verifyIdTokenMock.mockClear();
    await mongoInMemoryDatabase.clear();
  });

  beforeEach(async () => {
    await mongoInMemoryDatabase.createGuide();
  });

  const app = new App();

  it("Should return status 403 and a message id token expired", async () => {
    verifyIdTokenMock.mockImplementation(() => {
      throw new ErrorFirebaseHelper("auth/id-token-expired");
    });

    const token = "tokenExpired";

    await request(app.getExpress)
      .post("/categories")
      .set("Authorization", `Bearer ${token}`)
      .expect(403)
      .then((data) => {
        expect(data.body.message).toBe("Este token já foi expirado, acesso negado.");
      });
  });

  it("Should be able to create a new category", async () => {
    const token = "validToken";

    verifyIdTokenMock.mockReturnValue({
      uid: "123",
    });

    const guide = await mongoInMemoryDatabase.getGuide();
    await request(app.getExpress)
      .post("/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Título da categoria",
        shortDescription: "Descrição da categoria",
        guide: guide._id,
      })
      .expect(200);
  });

  it("Must not be able to create a new category with title longer than 32 characters", async () => {
    const token = "validToken";
    verifyIdTokenMock.mockReturnValue({
      uid: "123",
    });

    const guide = await mongoInMemoryDatabase.getGuide();
    await request(app.getExpress)
      .post("/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Título da categoria maior do que o esperado",
        shortDescription: "Descrição da categoria",
        guide: guide._id,
      })
      .expect(400);
  });

  it("Must not allow the registration of a category without a guide", async () => {
    const token = "validToken";

    verifyIdTokenMock.mockReturnValue({
      uid: "123",
    });

    const response = await request(app.getExpress)
      .post("/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Título da categoria",
        shortDescription: "Descrição da categoria",
      });
    const { msg } = response.body.message[0];
    expect(response.status).toBe(400);
    expect(msg).toEqual("É necessário passar um guia para criar uma categoria");
  });
});
