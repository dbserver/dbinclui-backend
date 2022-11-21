import { InMemoryGuideRepository } from "../../helpers/inMemoryRepositories/InMemoryGuideRepository.js";
import { GetAllGuidesService } from "./GetAllGuidesService";

describe("GetAllGuidesService", () => {
  let inMemoryGuideRepository: InMemoryGuideRepository;
  let guideService: GetAllGuidesService;

  beforeAll(async () => {
    inMemoryGuideRepository = new InMemoryGuideRepository();
    await inMemoryGuideRepository.loadData(3);
    guideService = new GetAllGuidesService(inMemoryGuideRepository);
  });

  it("Should return all guides", async () => {
    const result = await guideService.execute();

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(3);
  });
});
