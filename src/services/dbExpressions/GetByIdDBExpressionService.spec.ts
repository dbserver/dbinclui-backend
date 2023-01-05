import { DBExpressionEntity } from "../../entities/DBExpressionEntity";
import { GetByIdDBExpressionService } from "./GetByIdDBExpressionService";
import { inMemoryDBExpressionsRepository } from "../../helpers/inMemoryRepositories/inMemoryDBExpressionsRepository";

describe("GetByIdCategoryService", () => {
  let InMemoryDBExpressionsRepository: inMemoryDBExpressionsRepository;
  let dbExpressionService: GetByIdDBExpressionService;

  beforeAll(async () => {
    InMemoryDBExpressionsRepository = new inMemoryDBExpressionsRepository();
    await InMemoryDBExpressionsRepository.loadExpresionDefaultData(1);
    dbExpressionService = new GetByIdDBExpressionService(InMemoryDBExpressionsRepository);
  });

  it("Should be an error if expression does not exists", async () => {
    const id = "123456";
    const result = await dbExpressionService.execute(id);

    expect(result).toBeInstanceOf(Error);
  });

  it("Should return a expression", async () => {
    const id = "0";
    const result = await dbExpressionService.execute(id);

    expect(result).not.toBeInstanceOf(Error);
    expect(result).not.toBeNull();
  });
});
