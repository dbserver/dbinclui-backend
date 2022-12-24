import { GuideEntity } from "../../entities/GuideEntity";
import { InMemoryGuideRepository } from "../../helpers/inMemoryRepositories/InMemoryGuideRepository.js";
import { DeleteGuideService } from "./DeleteGuideService";

describe("DeleteGuideService", () => {
  let inMemoryGuidesRepository: InMemoryGuideRepository;
  let guideService: DeleteGuideService;

  beforeAll(async () => {
    inMemoryGuidesRepository = new InMemoryGuideRepository();
    await inMemoryGuidesRepository.loadData(1);
    guideService = new DeleteGuideService(inMemoryGuidesRepository);
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

    const result = await guideService.execute(guideExample._id as string);
    expect(result).toBeInstanceOf(Error);
  });

  it("Should delete a category by ID and return a delete count", async () => {
    const result = (await guideService.execute("0")) as GuideEntity;
    expect(result._id).toBe("0");
  });
});
