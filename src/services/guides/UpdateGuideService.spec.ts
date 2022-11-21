import { GuideEntity } from "../../entities/GuideEntity";
import { UpdateGuideService } from "./UpdateGuideService";
import { InMemoryGuideRepository } from "../../helpers/inMemoryRepositories/InMemoryGuideRepository.js";
describe("UpdateGuideService", () => {
  let inMemoryGuidesRepository: InMemoryGuideRepository;
  let guideService: UpdateGuideService;

  beforeAll(async () => {
    inMemoryGuidesRepository = new InMemoryGuideRepository();
    await inMemoryGuidesRepository.loadData(3);
    guideService = new UpdateGuideService(inMemoryGuidesRepository);
  });

  it("Should be an error if guide does not exists", async () => {
    const guideExample: GuideEntity = {
      _id: "inexistente",
      title: "Título inexistente",
      content: "Conteúdo inexistente",
    };

    const result = await guideService.execute(guideExample._id as string, guideExample);
    expect(result).toBeInstanceOf(Error);
  });

  it("Should update and return update count", async () => {
    const guideExample: GuideEntity = {
      _id: "0",
      title: "Título atualizado",
      content: "Conteúdo atualizado",
    };

    const result = await guideService.execute(guideExample._id as string, guideExample);
    expect(result).toEqual(1);
  });
});
