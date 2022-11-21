import { GuideEntity } from "../../entities/GuideEntity";
import { InMemoryGuideRepository } from "./InMemoryGuideRepository";

describe("InMemoryGuidesRepository", () => {
  let repository: InMemoryGuideRepository;

  beforeAll(async () => {
    repository = new InMemoryGuideRepository();
    await repository.loadData(1);
    await repository.loadDataWithCategoriesandContents(3);
  });

  it("Should create and return an Guide entity", async () => {
    let guideExample: GuideEntity = {
      title: "Título do guia",
      content: "Conteúdo do guia",
    };

    const result = await repository.create(guideExample);

    expect(repository.database[1]).toBe(result);
    expect(result.title).toBe("Título do guia");
  });

  describe("Update", () => {
    it("Should return 0 if ID not found", async () => {
      let guideExample2: GuideEntity = {
        _id: "0asd",
        title: "Título do guia",
        content: "Conteúdo do guia",
      };

      guideExample2.title = "Título do guia modificado";
      const result = await repository.update(guideExample2);

      expect(result).toEqual(0);
    });

    it("Should update and return update count", async () => {
      let guideExample2: GuideEntity = {
        _id: "0",
        title: "Título do guia",
        content: "Conteúdo do guia",
      };

      guideExample2.title = "Título do guia modificado";
      const result = await repository.update(guideExample2);

      expect(result).toEqual(1);
    });
  });

  it("Should return all guides", async () => {
    const result = await repository.findAll();

    expect(result.length).toEqual(2);
  });

  it("Should delete an Guide entity and return delete count", async () => {
    const result = await repository.delete("1");

    expect(result).toEqual(1);
    expect(repository.database.length).toEqual(1);
  });

  it("Should return a guide with categories and contents associate", async () => {
    const result = await repository.findCategoriesAndContentsByGuideId("1");

    expect(result).not.toBeNull();
    expect(result?.title).toBe("Título do guia 1");
  });
});
