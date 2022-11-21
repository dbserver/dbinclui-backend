import { GuideEntity } from "../../entities/GuideEntity";
import { CreateGuideService } from "./CreateGuideService";
import { InMemoryGuideRepository } from "../../helpers/inMemoryRepositories/InMemoryGuideRepository";

describe("CreateGuideService", () => {
  let inMemoryGuidesRepository: InMemoryGuideRepository;
  let guideService: CreateGuideService;

  beforeAll(async () => {
    inMemoryGuidesRepository = new InMemoryGuideRepository();
    guideService = new CreateGuideService(inMemoryGuidesRepository);
  });

  it("Should create and return a guide entity", async () => {
    const guideExample: GuideEntity = {
      title: "Título do guia",
      content: "Conteúdo do guia",
    };

    const result = await guideService.execute(guideExample);

    expect(result._id).toBe("0");
  });
});
