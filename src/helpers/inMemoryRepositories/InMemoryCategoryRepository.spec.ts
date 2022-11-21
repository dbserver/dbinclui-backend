import { CategoryEntity } from "../../entities/CategoryEntity";
import { InMemoryCategoryRepository } from "./InMemoryCategoryRepository";

describe("InMemoryCategoryRepository", () => {
  let repository: InMemoryCategoryRepository;

  beforeAll(async () => {
    repository = new InMemoryCategoryRepository();
    await repository.loadUniqueData();
    await repository.loadData(4);
  });

  it("Should create and return a category", async () => {
    const categoryExample: CategoryEntity = {
      title: "Título da categoria",
      shortDescription: "Descrição da categoria",
      guide: {
        _id: "123456",
        title: "Acessibilidade",
        content: "Sem conteúdo",
      },
    };

    const result = await repository.create(categoryExample);

    expect(result).not.toBeNull();
    expect(result._id).toBe("5");
    expect(result.title).toBe("Título da categoria");
    expect(result.shortDescription).toBe("Descrição da categoria");
    expect(result.guide._id).toBe("123456");
  });

  describe("Update", () => {
    it("Should return 0 if category ID not found", async () => {
      const categoryExample: CategoryEntity = {
        _id: "InexistenteID",
        title: "Título da categoria alterado",
        shortDescription: "Descrição da categoria alterada",
        guide: {
          _id: "123456",
          title: "Acessibilidade",
          content: "Sem conteúdo",
        },
      };

      const result = await repository.update(categoryExample);

      expect(result).toEqual(0);
    });

    it("Should update and return a updateCount", async () => {
      const categoryExample: CategoryEntity = {
        _id: "5",
        title: "Título da categoria alterado",
        shortDescription: "Descrição da categoria alterada",
        guide: {
          _id: "123456",
          title: "Acessibilidade",
          content: "Sem conteúdo",
        },
      };

      const result = await repository.update(categoryExample);

      expect(result).toEqual(1);
    });
  });

  it("Should find by id and return a category", async () => {
    const result = await repository.findById("0");

    expect(result?.title).toBe("Título da categoria 0");
    expect(result?.shortDescription).toBe("Descrição da categoria 0");
  });

  it("Should return all category", async () => {
    const result = await repository.findAll();

    expect(result).toBeInstanceOf(Array);
    expect(result[0].title).toBe("Título da categoria 0");
  });

  describe("Delete", () => {
    it("Should return 0 if category ID not found", async () => {
      const result = await repository.delete("12345674897");

      expect(result).toEqual(0);
    });

    it("Should delete and return 1", async () => {
      const result = await repository.delete("5");

      expect(result).toEqual(1);
    });
  });

  it("Should return all category with same GuideID", async () => {
    const result = await repository.findByGuideId("0");

    expect(result.length).toEqual(2);
  });
});
