import { DBExpressionEntity } from "./../../entities/DBExpressionEntity";
import { inMemoryDBExpressionsRepository } from "./../../helpers/inMemoryRepositories/inMemoryDBExpressionsRepository";
import { GetAllDBExpressionsService } from "./GetAllDBExpressionService";

describe("GetAllDBExpressionService", () => {
  let InMemoryDBExpressionsRepository: inMemoryDBExpressionsRepository;
  let dbExpressionService: GetAllDBExpressionsService;

  beforeAll(() => {
    InMemoryDBExpressionsRepository = new inMemoryDBExpressionsRepository();
    dbExpressionService = new GetAllDBExpressionsService(InMemoryDBExpressionsRepository);
  });

  afterEach(() => {
    InMemoryDBExpressionsRepository.clearAllDatabases();
  });

  it("Should return an empty array", async () => {
    const result = await dbExpressionService.execute();

    expect(result.length).toEqual(0);
  });

  it("Should return 2 digital contents", async () => {
    await InMemoryDBExpressionsRepository.loadExpresionDefaultData(2);

    const result = await dbExpressionService.execute();
    expect(result.length).toEqual(2);
    expect(result[0]._id).toBe("0");
    expect(result[0].expression).toBe("Expressão de test numero: 0");

    expect(result[1]._id).toBe("1");
    expect(result[1].expression).toBe("Expressão de test numero: 1");
  });
});
