import { InMemoryUsersExpressionsRepository } from "../../helpers/inMemoryRepositories/InMemoryUsersExpressionsRepository";
import { FavoriteUserExpressionService } from "./FavoriteUserExpressionService";

describe("FavoriteUserExpressionService", () => {
  let repository: InMemoryUsersExpressionsRepository;
  let service: FavoriteUserExpressionService;

  beforeAll(() => {
    repository = new InMemoryUsersExpressionsRepository();
    service = new FavoriteUserExpressionService(repository);
  });

  beforeEach(() => {
    repository.loadExpresionDefaultData(2);
  });

  afterEach(() => {
    repository.clearAllDatabases();
  });

  it("Should an Error if UserExpression does not exists", async () => {
    const result = await service.execute("10009");

    expect(result).toBeInstanceOf(Error);
  });

  it("Should return an UserExpression with favorite property true", async () => {
    const result = await service.execute("1");

    expect(result).toHaveProperty("_id", "1");
    expect(result).toHaveProperty("expression", "Expressão de test numero: 1");
    expect(result).toHaveProperty("author");
    expect(result).toHaveProperty("favorite", true);
  });
});
