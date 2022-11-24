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
      filePaths: {
        filePath: `www.image.com.br`,
        publicId: `uploads/image`,
      },
    };

    const result = await repository.create(guideExample);

    expect(repository.database[1]).toBe(result);
    expect(result.title).toBe("Título do guia");
  });

  describe("Update", () => {
    it("Should throw an Error if ID not exists", async () => {
      let guideExample2: GuideEntity = {
        _id: "0asd",
        title: "Título do guia",
        content: "Conteúdo do guia",
        filePaths: {
          filePath: `www.image.com.br`,
          publicId: `uploads/image`,
        },
      };

      guideExample2.title = "Título do guia modificado";

      await expect(async () => await repository.update(guideExample2)).rejects.toThrowError(
        "Guide does not exists",
      );
    });

    it("Should update and return a GuideEntity", async () => {
      let guideExample2: GuideEntity = {
        _id: "0",
        title: "Título do guia",
        content: "Conteúdo do guia",
        filePaths: {
          filePath: `www.image.com.br`,
          publicId: `uploads/image`,
        },
      };

      guideExample2.title = "Título do guia modificado";
      const result = await repository.update(guideExample2);

      expect(result._id).toBe("0");
      expect(result.title).toBe("Título do guia");
    });
  });

  it("Should return all guides", async () => {
    const result = await repository.findAll();

    expect(result.length).toEqual(2);
  });

  it("Should delete an Guide entity and return a GuideEntity deleted", async () => {
    const result = await repository.delete("1");

    expect(result._id).toBe("1");
    expect(repository.database.length).toEqual(1);
  });

  it("Should return a guide with categories and contents associate", async () => {
    const result = await repository.findCategoriesAndContentsByGuideId("1");

    expect(result).not.toBeNull();
    expect(result?.title).toBe("Título do guia 1");
  });
});
