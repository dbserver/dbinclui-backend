import { InMemoryCategoryRepository } from "../../helpers/inMemoryRepositories/InMemoryCategoryRepository";
import { GetAllCategoriesService } from "./GetAllCategoriesService";
describe("GetAllCategoriesService", () => {
  let categoryRepository: InMemoryCategoryRepository;
  let categoryService: GetAllCategoriesService;
  beforeAll(async () => {
    categoryRepository = new InMemoryCategoryRepository();
    await categoryRepository.loadData(1);
    categoryService = new GetAllCategoriesService(categoryRepository);
  });

  it("Should return all Categories", async () => {
    const result = await categoryService.execute();

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(1);
  });
});
