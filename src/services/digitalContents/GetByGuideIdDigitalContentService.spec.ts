import { InMemoryDigitalContentRepository } from "../../helpers/inMemoryRepositories/InMemoryDigitalContentRepository";
import { GetByGuideIdDigitalContentService } from "./GetByGuideIdDigitalContentService";

describe("GetByIdDigitalContentService", () => {
  let repository: InMemoryDigitalContentRepository;
  let contentService: GetByGuideIdDigitalContentService;
  beforeAll(async () => {
    repository = new InMemoryDigitalContentRepository();
    contentService = new GetByGuideIdDigitalContentService(repository);
    await repository.loadData(5);
  });

  it("Should return an empty array", async () => {
    const result = await contentService.execute("123456");

    expect(result.length).toEqual(0);
  });

  it("Should return 1 digital contents", async () => {
    const result = await contentService.execute("0");

    expect(result.length).toEqual(1);
    expect(result[0]._id).toBe("0");
  });
});
