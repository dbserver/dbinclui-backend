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

describe("CreateUserController", () => {
  let express: App;

  beforeAll(async () => {
    firebase.initializeApp();
    await mongoInMemoryDatabase.open();
    await mongoInMemoryDatabase.createUser();
    express = new App();
  }, 60_000);

  beforeEach(() => {
    verifyIdTokenMock.mockClear();
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
      .post("/users")
      .set("Authorization", "Bearer 123456")
      .expect(403)
      .then((data) => {
        expect(data.body.message).toBe("Formato do token inválido, acesso negado.");
      });
  });

  it("Should return status 403 and a message id token expired", async () => {
    verifyIdTokenMock.mockImplementation(() => {
      throw new ErrorFirebaseHelper("auth/id-token-expired");
    });

    const token = "1234564564expired";

    await request(express.getExpress)
      .post("/users")
      .set("Authorization", `Bearer ${token}`)
      .expect(403)
      .then((data) => {
        expect(data.body.message).toBe("Este token já foi expirado, acesso negado.");
      });
  });

  it("Should create an user", async () => {
    const token =
      "https://jwt.io/#debugger-io?token=eyJhbGciOiJSUzI1NiIsImtpZCI6ImFmZjFlNDJlNDE0M2I4MTQxM2VjMTI1MzQwOTcwODUxZThiNDdiM2YiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTHVjYXMgQW50w7RuaW8iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUVkRlRwNUNLcXhEMEprLWc1VDdhSjhmUWJIYTdCMDAtU0c1c2pBaFBZVnQ9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbGVhcm5pbmctZmlyZWJhc2UtMzZkMWIiLCJhdWQiOiJsZWFybmluZy1maXJlYmFzZS0zNmQxYiIsImF1dGhfdGltZSI6MTY3MTU4NjIyMSwidXNlcl9pZCI6InlpeFp0bTNnUHVmRzdreThidXZiV1p0OXl2bTIiLCJzdWIiOiJ5aXhadG0zZ1B1Zkc3a3k4YnV2YldadDl5dm0yIiwiaWF0IjoxNjcxNTg2MjIxLCJleHAiOjE2NzE1ODk4MjEsImVtYWlsIjoidGVjb25mdEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExMzE0MjQ3ODk1MTIxMzI0MjQ0MSJdLCJlbWFpbCI6WyJ0ZWNvbmZ0QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.lCP2jgndfF_8RYeRDsCeFFP0ctSUAbzT6kH6mJF8kxnxmI2hBWdDYnHDBFr_jm7vSr-nXM9faYpJGtmdEIe1LkI2VSbnkgyMVCpuVrO0dWslo9MtKLDtnjYFesB420pTqH4D_OF0HCeHzu0FUWHgU2P03bzqmgt43J2MVv-JGlrJN2iWvWRUOxA2ekNBDRvNkzgzJ4RrDhImNd7XyYByMSX5f1AWQ7qaQj8wsr6wpsXtyDbnQ4VRtQrcyVzp3WVITXfr0bgblYopRO-0-CsQBjMOpCoFL4ILq8-YP-aIjBVzV7k95bF6HvVjBywlvXicbcf_K2J8GJzpyVHBkcWZ4A";
    verifyIdTokenMock.mockReturnValue({
      uid: "123456",
      name: "Joaozinho",
      email: "Joaozinho@email.com",
    });

    await request(express.getExpress)
      .post("/users")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((data) => {
        expect(data.body.data._id).not.toBeNull();
        expect(data.body.data.uid).toBe("123456");
        expect(data.body.data.name).toBe("Joaozinho");
        expect(data.body.data.email).toBe("Joaozinho@email.com");
        expect(data.body.data.admin).toBeFalsy();
      });
  });

  it("Should return status 400 if uid already exists in database", async () => {
    const token =
      "https://jwt.io/#debugger-io?token=eyJhbGciOiJSUzI1NiIsImtpZCI6ImFmZjFlNDJlNDE0M2I4MTQxM2VjMTI1MzQwOTcwODUxZThiNDdiM2YiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTHVjYXMgQW50w7RuaW8iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUVkRlRwNUNLcXhEMEprLWc1VDdhSjhmUWJIYTdCMDAtU0c1c2pBaFBZVnQ9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbGVhcm5pbmctZmlyZWJhc2UtMzZkMWIiLCJhdWQiOiJsZWFybmluZy1maXJlYmFzZS0zNmQxYiIsImF1dGhfdGltZSI6MTY3MTU4NjIyMSwidXNlcl9pZCI6InlpeFp0bTNnUHVmRzdreThidXZiV1p0OXl2bTIiLCJzdWIiOiJ5aXhadG0zZ1B1Zkc3a3k4YnV2YldadDl5dm0yIiwiaWF0IjoxNjcxNTg2MjIxLCJleHAiOjE2NzE1ODk4MjEsImVtYWlsIjoidGVjb25mdEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExMzE0MjQ3ODk1MTIxMzI0MjQ0MSJdLCJlbWFpbCI6WyJ0ZWNvbmZ0QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.lCP2jgndfF_8RYeRDsCeFFP0ctSUAbzT6kH6mJF8kxnxmI2hBWdDYnHDBFr_jm7vSr-nXM9faYpJGtmdEIe1LkI2VSbnkgyMVCpuVrO0dWslo9MtKLDtnjYFesB420pTqH4D_OF0HCeHzu0FUWHgU2P03bzqmgt43J2MVv-JGlrJN2iWvWRUOxA2ekNBDRvNkzgzJ4RrDhImNd7XyYByMSX5f1AWQ7qaQj8wsr6wpsXtyDbnQ4VRtQrcyVzp3WVITXfr0bgblYopRO-0-CsQBjMOpCoFL4ILq8-YP-aIjBVzV7k95bF6HvVjBywlvXicbcf_K2J8GJzpyVHBkcWZ4A";
    verifyIdTokenMock.mockReturnValue({
      uid: "123",
      name: "Joaozinho",
      email: "Joaozinho@email.com",
    });

    await request(express.getExpress)
      .post("/users")
      .set("Authorization", `Bearer ${token}`)
      .expect(400)
      .then((data) => {
        expect(data.body.message).toBe("User with this uid already exists");
      });
  });
});