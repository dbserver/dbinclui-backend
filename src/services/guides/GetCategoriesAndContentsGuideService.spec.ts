import { InMemoryGuideRepository } from "../../helpers/inMemoryRepositories/InMemoryGuideRepository";
import { GetCategoriesAndContentsGuideService } from "./GetCategoriesAndContentsGuideService";

describe("GetCategoriesAndContentsGuideService", () => {
  let inMemoryGuidesRepository: InMemoryGuideRepository;
  let guideService: GetCategoriesAndContentsGuideService;

  beforeAll(async () => {
    inMemoryGuidesRepository = new InMemoryGuideRepository();
    guideService = new GetCategoriesAndContentsGuideService(inMemoryGuidesRepository);
    inMemoryGuidesRepository.loadDataWithCategoriesandContents(2);
  });
  it("Should return a guide with categories and content by guide id", async () => {
    const result = await guideService.execute("0");

    expect(result).not.toBeNull();
    expect(result?.categories[0].title).toBe("Título da categoria 0");
  });
});
