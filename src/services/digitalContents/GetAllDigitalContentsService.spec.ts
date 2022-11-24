import { InMemoryDigitalContentRepository } from "../../helpers/inMemoryRepositories/InMemoryDigitalContentRepository";
import { GetAllDigitalContentsService } from "./GetAllDigitalContentsService";

describe("GetAllDigitalContents", () => {
  let repository: InMemoryDigitalContentRepository;
  let contentService: GetAllDigitalContentsService;
  beforeAll(async () => {
    repository = new InMemoryDigitalContentRepository();
    contentService = new GetAllDigitalContentsService(repository);
  });

  it("Should return an empty array", async () => {
    const result = await contentService.execute();

    expect(result.length).toEqual(0);
  });

  it("Should return 2 digital contents", async () => {
    await repository.loadData(2);

    const result = await contentService.execute();
    expect(result.length).toEqual(2);
    expect(result[0]._id).toBe("0");
  });
});
