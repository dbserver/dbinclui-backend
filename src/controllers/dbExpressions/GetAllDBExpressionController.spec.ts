import request from "supertest";
import { App } from "../../App";
import { mongoInMemoryDatabase } from "./../../helpers/tests/mongoInMemoryDatabase";

describe("GetAllDBExpressionsController", () => {
  beforeAll(async () => {
    await mongoInMemoryDatabase.open();
  });

  afterAll(async () => {
    await mongoInMemoryDatabase.close();
  });

  beforeEach(async () => {
    await mongoInMemoryDatabase.createDBExpression();
  });

  const app = new App();

  it("Should return a 200 status if the requisition is successful", async () => {
    await request(app.getExpress).get("/dbExpressions").expect(200);
  });

  it("Should return an empty array if there are no expressions in the database", async () => {
    await mongoInMemoryDatabase.clear();

    const response = await request(app.getExpress).get("/dbExpressions").expect(200);
    const { data } = response.body;
    expect(data.length).toBe(0);
  });

  it("Should return 'Route not found' if the url is not valid", async () => {
    const response = await request(app.getExpress).get("/dbExpressionssa");
    expect(response.body.message).toEqual("Rota não encontrada");
  });
});
