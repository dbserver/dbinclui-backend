import { InMemoryGuideRepository } from "../../helpers/inMemoryRepositories/InMemoryGuideRepository.js";
import { GetByIdGuideService } from "./GetByIdGuideService";

describe("GetByIdGuideService", () => {
  let inMemoryGuidesRepository: InMemoryGuideRepository;
  let guideService: GetByIdGuideService;

  beforeAll(async () => {
    inMemoryGuidesRepository = new InMemoryGuideRepository();
    await inMemoryGuidesRepository.loadData(3);
    guideService = new GetByIdGuideService(inMemoryGuidesRepository);
  });

  it("Should be an error if guide does not exists", async () => {
    const id = "123456";
    const result = await guideService.execute(id);

    expect(result).toBeInstanceOf(Error);
  });

  it("Should return a guide", async () => {
    const id = "0";
    const result = await guideService.execute(id);

    expect(result).not.toBeInstanceOf(Error);
    expect(result).not.toBeNull();
  });
});
