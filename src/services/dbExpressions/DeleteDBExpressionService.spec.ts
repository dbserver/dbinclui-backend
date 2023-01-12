import { DBExpressionEntity } from "../../entities/DBExpressionEntity";
import { inMemoryDBExpressionsRepository } from "../../helpers/inMemoryRepositories/inMemoryDBExpressionsRepository";
import { DeleteDBExpressionService } from "./DeleteDBExpressionService";

describe("DeleteDBExpressionService", () => {
  let InMemoryDBExpressionsRepository: inMemoryDBExpressionsRepository;
  let dbExpressionService: DeleteDBExpressionService;

  beforeAll(() => {
    InMemoryDBExpressionsRepository = new inMemoryDBExpressionsRepository();
    dbExpressionService = new DeleteDBExpressionService(InMemoryDBExpressionsRepository);
  });

  beforeEach(() => {
    InMemoryDBExpressionsRepository.loadExpresionDefaultData(3);
  });

  afterEach(() => {
    InMemoryDBExpressionsRepository.clearAllDatabases();
  });

  it("Should return an error if an expressionId does not exist", async () => {
    const result = (await dbExpressionService.execute("213")) as DBExpressionEntity;

    expect(result).toBeNull();
  });

  it("Should delete a expression by ID and return a DBExpressionEntity expression", async () => {
    const result = (await dbExpressionService.execute("0")) as DBExpressionEntity;

    expect(result._id).toHaveProperty("0");
    expect(result).toHaveProperty("expression");
    expect(result).toHaveProperty("author");
    expect(result).toHaveProperty("deleted", false);
    expect(result).toHaveProperty("favoriteOf");
  });
});
