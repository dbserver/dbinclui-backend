import { InMemoryUsersExpressionsRepository } from "../../helpers/inMemoryRepositories/inMemoryUsersExpressionsRepository.js";
import { UserEntity } from "../../entities/UserEntity.js";
import { CreateUserExpressionService } from "../usersExpressions/CreateUserExpressionService.js";

describe("inMemoruUsersExpressionsRepository", () => {
  let repository: InMemoryUsersExpressionsRepository;
  let service: CreateUserExpressionService;

  beforeAll(() => {
    repository = new InMemoryUsersExpressionsRepository();
    service = new CreateUserExpressionService(repository);
  });

  beforeEach(() => {
    repository.loadExpresionDefaultData(1);
    repository.loadUserDefaultData(1);
  });

  afterEach(() => {
    repository.clearAllDatabases();
  });

  it("Should create a new user expression in the database", async () => {
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
