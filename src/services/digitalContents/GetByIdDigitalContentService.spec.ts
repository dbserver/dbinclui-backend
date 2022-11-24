import { InMemoryDigitalContentRepository } from "../../helpers/inMemoryRepositories/InMemoryDigitalContentRepository";
import { GetByIdDigitalContentService } from "./GetByIdDigitalContentService";

describe("GetByIdDigitalContentService", () => {
  let repository: InMemoryDigitalContentRepository;
  let contentService: GetByIdDigitalContentService;
  beforeAll(async () => {
    repository = new InMemoryDigitalContentRepository();
    contentService = new GetByIdDigitalContentService(repository);
    await repository.loadData(5);
  });

  it("Should return an Error if Digital Content not found", async () => {
    const result = await contentService.execute("0232");

    expect(result).toBeInstanceOf(Error);
  });

  it("Should return a digital Content", async () => {
    const result = await contentService.execute("0");
    let content;
    if (!(result instanceof Error)) {
      content = result;
    } else {
      content = {};
    }

    expect(result).not.toBeInstanceOf(Error);
    expect(result).not.toBeInstanceOf(Error);
    expect(content._id).toBe("0");
    expect(content.title).toBe("Título do conteúdo digital 0");
  });
});
