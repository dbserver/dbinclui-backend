import { DigitalContentEntity } from "../../entities/DigitalContentEntity";
import { InMemoryDigitalContentRepository } from "../../helpers/inMemoryRepositories/InMemoryDigitalContentRepository";
import { DeleteLogicDigitalContentService } from "./DeleteLogicDigitalContentService";

describe("DeleteLogicDigitalContentService", () => {
  let repository: InMemoryDigitalContentRepository;
  let contentService: DeleteLogicDigitalContentService;

  beforeAll(async () => {
    repository = new InMemoryDigitalContentRepository();
    contentService = new DeleteLogicDigitalContentService(repository);
    await repository.loadData(1);
  });

  it("Should return an Error if ID not found", async () => {
    const result = await contentService.execute("123", "1");

    expect(result).toBeInstanceOf(Error);
  });

  it("Should delete and return digital content deleted", async () => {
    const result = (await contentService.execute("0", "2")) as DigitalContentEntity;

    expect(result._id).toBe("0");
    expect(result.deleted).toBeTruthy();
  });
});
