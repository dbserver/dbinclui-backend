import { UsersExpressionsMongoRepository } from "./UsersExpressionsMongoRepository";
import { mongoInMemoryDatabase } from "../../helpers/tests/mongoInMemoryDatabase";

describe("UsersExpressionsMongoRepository", () => {
  let repository: UsersExpressionsMongoRepository;

  beforeAll(async () => {
    await mongoInMemoryDatabase.open();
    repository = new UsersExpressionsMongoRepository();
  });

  afterEach(async () => {
    await mongoInMemoryDatabase.clear();
  });

  afterAll(async () => {
    await mongoInMemoryDatabase.close();
  });

  describe("Create Expression", () => {
    it("Espera criar uma expressão", async () => {
      const userExpression = {
        expression: "Bom dia",
        author: "63b5c66a1b506ae265806e6e",
      } as any;

      const result = await repository.create(userExpression);

      expect(result._id).not.toBeNull();
      expect(result.expression).toBe("Bom dia");
      expect(result.author).not.toBeNull();
    });
  });
});
