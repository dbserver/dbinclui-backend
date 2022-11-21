import { InMemoryCategoryRepository } from "../../helpers/inMemoryRepositories/InMemoryCategoryRepository";
import { GetByIdCategoryService } from "./GetByIdCategoryService";

describe("GetByIdCategoryService", () => {
  let categoryRepository: InMemoryCategoryRepository;
  let categoryService: GetByIdCategoryService;
  beforeAll(async () => {
    categoryRepository = new InMemoryCategoryRepository();
    await categoryRepository.loadData(1);
    categoryService = new GetByIdCategoryService(categoryRepository);
  });

  it("Should be an error if category does not exists", async () => {
    const id = "123456";
    const result = await categoryService.execute(id);

    expect(result).toBeInstanceOf(Error);
  });

  it("Should return a category", async () => {
    const id = "0";
    const result = await categoryService.execute(id);

    expect(result).not.toBeInstanceOf(Error);
    expect(result).not.toBeNull();
  });
});
