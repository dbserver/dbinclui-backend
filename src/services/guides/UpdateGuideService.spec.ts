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
      filePaths: {
        filePath: `wwww.image${1}.com.br`,
        publicId: `uploads/${1}`,
      },
      author: {
        uid: "0",
        name: "12",
        email: `User "12346589`,
        admin: false,
      },
      deleted: false,
    };

    const result = await guideService.execute(guideExample._id as string, guideExample);
    expect(result).toBeInstanceOf(Error);
  });

  it("Should update and return update count", async () => {
    const guideExample: GuideEntity = {
      _id: "0",
      title: "Título atualizado",
      content: "Conteúdo atualizado",
      filePaths: {
        filePath: `wwww.image${1}.com.br`,
        publicId: `uploads/${1}`,
      },
      author: {
        uid: "0",
        name: "12",
        email: `User "12346589`,
        admin: false,
      },
      deleted: false,
    };

    const { guideUpdated } = (await guideService.execute(
      guideExample._id as string,
      guideExample,
    )) as {
      guideUpdated: GuideEntity;
    };
    expect(guideUpdated.title).toEqual("Título atualizado");
  });
});
