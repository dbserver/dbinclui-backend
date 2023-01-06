import { inMemoryDBExpressionsRepository } from "./inMemoryDBExpressionsRepository";
import { DBExpressionEntity } from "../../entities/DBExpressionEntity";

describe("inMemoryUsersExpressionsRepository", () => {
  let repository: inMemoryDBExpressionsRepository;

  beforeAll(() => {
    repository = new inMemoryDBExpressionsRepository();
  });

  beforeEach(() => {
    repository.loadExpresionDefaultData(3);
  });

  afterEach(() => {
    repository.clearAllDatabases();
  });

  it("Should create a new db expression in the database", async () => {
    const dbExpression: DBExpressionEntity = {
      _id: "3",
      expression: "Essa é uma expressão de teste",
      author: {
        uid: "0",
        name: "Autor Teste",
        email: "autor_teste@gmail.com",
        admin: false,
      },
    };

    const result = await repository.create(dbExpression);

    expect(result._id).toBe("3");
    expect(result.expression).toBe("Essa é uma expressão de teste");
    expect(result.author.uid).toBe("0");
    expect(result.author.name).toBe("Autor Teste");
    expect(result.author.email).toBe("autor_teste@gmail.com");
  });

  it("Should find by id and return a dbExpression", async () => {
    const result = await repository.findById("0");

    expect(result?.expression).toBe("Expressão de test numero: 0");
  });

  it("Should return all dbExpressions", async () => {
    const result = await repository.findAll();

    expect(result).toBeInstanceOf(Array);
    expect(result[0].expression).toBe("Expressão de test numero: 0");
  });

  it("Should favorite an expression", async () => {
    const result = await repository.favorite("0", "1");

    expect(result).toHaveProperty("_id", "0");
    expect(result).toHaveProperty("deleted", false);
    expect(result).toHaveProperty("author");
    expect(result).toHaveProperty("expression", "Expressão de test numero: 0");
    expect(result).toHaveProperty("favoriteOf", ["123", "1"]);
  });

  it("Should delete a expression by ID and return a DBExpressionEntity expression", async () => {
    const result = await repository.delete("0");

    expect(result).toHaveProperty("_id", "0");
    expect(result).toHaveProperty("deleted");
    expect(result).toHaveProperty("author");
    expect(result).toHaveProperty("expression", "Expressão de test numero: 0");
    expect(result).toHaveProperty("favoriteOf", ["123"]);
  });

  it("Should deleteLogic", async () => {
    const result = await repository.deleteLogic("1", "1");

    expect(result).toHaveProperty("_id", "1");
    expect(result).toHaveProperty("deleted", true);
    expect(result).toHaveProperty("author");
    expect(result).toHaveProperty("updatedBy", "1");
    expect(result).toHaveProperty("expression", "Expressão de test numero: 1");
    expect(result).toHaveProperty("favoriteOf", ["123"]);
  });
});
