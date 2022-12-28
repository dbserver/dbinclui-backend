import { inMemoryDBExpressionsRepository } from "../../helpers/inMemoryRepositories/inMemoryDBExpressionsRepository.js";
import { UserEntity } from "../../entities/UserEntity.js";
import { CreateDBExpressionService } from "../dbExpressions/CreateDBExpressionService";

describe("inMemoryDBExpressionsRepository", () => {
  let repository: inMemoryDBExpressionsRepository;
  let service: CreateDBExpressionService;

  beforeAll(() => {
    repository = new inMemoryDBExpressionsRepository();
    service = new CreateDBExpressionService(repository);
  });

  beforeEach(() => {
    repository.loadExpresionDefaultData(1);
    repository.loadUserDefaultData(1);
  });

  afterEach(() => {
    repository.clearAllDatabases();
  });

  it("Should create a new db expression in the database", async () => {
    const user = (await repository.findByUid("0")) as UserEntity;
    const userExpression = {
      expression: "Essa é uma expressão de teste",
      author: user,
    };

    const result = await repository.create(userExpression);
    expect(result._id).toBe("1");
    expect(result.expression).toBe("Essa é uma expressão de teste");
    expect(result.author.uid).toBe("0");
    expect(result.author.email).toBe("Usuario0@email.com");
  });
});