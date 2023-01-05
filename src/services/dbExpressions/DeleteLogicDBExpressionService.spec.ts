import { DBExpressionEntity } from "./../../entities/DBExpressionEntity";
import { inMemoryDBExpressionsRepository } from "./../../helpers/inMemoryRepositories/inMemoryDBExpressionsRepository";
import { DeleteLogicDBExpressionService } from "./DeleteLogicDBExpressionService";

describe("DeleteLogicDBExpressionService", () => {
  let InMemoryDBExpressionsRepository: inMemoryDBExpressionsRepository;
  let dbExpressionService: DeleteLogicDBExpressionService;

  beforeAll(() => {
    InMemoryDBExpressionsRepository = new inMemoryDBExpressionsRepository();
    dbExpressionService = new DeleteLogicDBExpressionService(InMemoryDBExpressionsRepository);
  });

  beforeEach(() => {
    InMemoryDBExpressionsRepository.loadExpresionDefaultData(3);
  });

  afterEach(() => {
    InMemoryDBExpressionsRepository.clearAllDatabases();
  });

  it("Should return an error if an expressionId does not exist", async () => {
    const result = (await dbExpressionService.execute("InexistenteID", "12")) as DBExpressionEntity;

    expect(result).toBeInstanceOf(Error);
  });

  it("Should delete a expression by ID and return a DBExpressionEntity expression", async () => {
    const result = (await dbExpressionService.execute("0", "1")) as DBExpressionEntity;

    expect(result._id).toHaveProperty("0");
    expect(result).toHaveProperty("expression");
    expect(result).toHaveProperty("author");
    expect(result).toHaveProperty("deleted");
    expect(result).toHaveProperty("favoriteOf");
    expect(result).toHaveProperty("updatedBy");
  });
});
