import { InMemoryCategoryRepository } from "../../helpers/inMemoryRepositories/InMemoryCategoryRepository";
import { GetByGuideIdCategoryService } from "./GetByGuideIdCategoryService";

describe("GetByGuideIdCategoryService", () => {
  let inMemoryRepository: InMemoryCategoryRepository;
  let categoryService: GetByGuideIdCategoryService;

  beforeAll(async () => {
    inMemoryRepository = new InMemoryCategoryRepository();
    categoryService = new GetByGuideIdCategoryService(inMemoryRepository);
    await inMemoryRepository.loadUniqueData();
    await inMemoryRepository.loadData(3);
  });

  it("Should return an array empty if not found a category with guideID provided", async () => {
    const result = await categoryService.execute("021523456");

    expect(result.length).toEqual(0);
  });

  it("Should return all category with same GuideID", async () => {
    const result = await categoryService.execute("0");
    expect(result.length).toEqual(2);
  });
});
