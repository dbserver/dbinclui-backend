import { UserExpressionEntity } from "../../entities/UserExpressionEntity.js";
import { InMemoryUsersExpressionsRepository } from "./InMemoryUsersExpressionsRepository.js";

describe("inMemoruUsersExpressionsRepository", () => {
  let repository: InMemoryUsersExpressionsRepository;

  beforeAll(() => {
    repository = new InMemoryUsersExpressionsRepository();
  });

  beforeEach(() => {
    repository.loadExpresionDefaultData(3);
  });

  afterEach(() => {
    repository.clearAllDatabases();
  });

  it("Should create a new user expression in the dabase", async () => {
    const userExpression: UserExpressionEntity = {
      _id: "3",
      expression: "Essa é uma expressão de teste",
      author: {
        uid: "0",
        name: "Alicia Alana",
        email: "aliciaAlana@gmail.com",
        admin: false,
      },
    };

    const result = await repository.create(userExpression);

    expect(result._id).toBe("3");
    expect(result.expression).toBe("Essa é uma expressão de teste");
    expect(result.author.uid).toBe("0");
    expect(result.author.name).toBe("Alicia Alana");
    expect(result.author.email).toBe("aliciaAlana@gmail.com");
  });
});
