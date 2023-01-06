import { inMemoryDBExpressionsRepository } from "../../helpers/inMemoryRepositories/inMemoryDBExpressionsRepository.js";
import { UserEntity } from "../../entities/UserEntity.js";
import { FavoriteDBExpressionService } from "../dbExpressions/FavoriteDBExpressionService";

describe("FavoriteDBExpressionService", () => {
  let repository: inMemoryDBExpressionsRepository;
  let service: FavoriteDBExpressionService;

  beforeAll(() => {
    repository = new inMemoryDBExpressionsRepository();
    service = new FavoriteDBExpressionService(repository);
  });

  beforeEach(() => {
    repository.loadExpresionDefaultData(3);
  });

  afterEach(() => {
    repository.clearAllDatabases();
  });

  it("Should favorite an Expression", async () => {
    const result = await service.execute("0", "0");

    expect(result).toHaveProperty("favoriteOf", ["123","0"]);
  });

  it("Should disfavor an Expression", async () => {
    const result = await service.execute("0", "123");

    expect(result).toHaveProperty("favoriteOf", []);
  });
});
