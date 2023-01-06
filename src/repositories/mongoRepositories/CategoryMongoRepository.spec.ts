import { CategoryMongoRepository } from "./CategoryMongoRepository";
import { mongoInMemoryDatabase } from "../../helpers/tests/mongoInMemoryDatabase";
import { CategoryEntity } from "../../entities/CategoryEntity";

const categoryDefault = {
  title: "Título default",
  shortDescription: "Descrição default",
  guide: "63b5c66a1b506ae265806e6e",
  author: "63b5c66a1b506ae265806e6e",
} as any;

describe("CategoryMongoRepository", () => {
  let repository: CategoryMongoRepository;

  beforeAll(async () => {
    await mongoInMemoryDatabase.open();
    repository = new CategoryMongoRepository();
  });

  beforeEach(async () => {
    await repository.create(categoryDefault);
  });

  afterEach(async () => {
    await mongoInMemoryDatabase.clear();
  });

  afterAll(async () => {
    await mongoInMemoryDatabase.close();
  });

  describe("Create", () => {
    it("Create Category", async () => {
      const category = {
        title: "Título de teste",
        shortDescription: "Descrição de teste",
        guide: "63b5c66a1b506ae265806e6e",
        author: "63b5c66a1b506ae265806e6e",
      } as any;

      const result = await repository.create(category);

      expect(result._id).not.toBeNull();
      expect(result.title).toBe("Título de teste");
      expect(result.shortDescription).toBe("Descrição de teste");
      expect(result.guide).not.toBeNull();
      expect(result.author).not.toBeNull();
    });
  });

  describe("Update", async () => {
    const category: CategoryEntity[] = await repository.findAll();

    const newCategory = {
      _id: "63b5c66a1b506ae265806e6e",
      title: "Título alterado",
      shortDescription: "Descrição alterada",
      guide: "63b5c66a1b506ae265806e6e",
      author: "63b5c66a1b506ae265806e6e",
    } as any;

    it("Should return null if ID does not exists", async () => {
      const result = repository.update(newCategory);

      expect(result).toBeNull();
    });

    it("Should update an category", async () => {
      const result = await repository.update(newCategory);

      expect(result).toHaveProperty("_id");
      expect(result).toHaveProperty("title", "Título alterado");
      expect(result).toHaveProperty("shortDescription", "Descrição alterada");
      expect(result).toHaveProperty("guide");
      expect(result).toHaveProperty("author");
    });
  });

  describe("FindById", () => {
    it("Should return null if ID does not exists", async () => {
      const result = repository.findById("63b5c66a1b506ae265806e6e");

      expect(result).toBeNull();
    });

    it("Should return an category by ID", async () => {
      const category: CategoryEntity[] = await repository.findAll();
      const categoryID = category[0]._id as string;

      const result = await repository.findById(categoryID);

      expect(result).toHaveProperty("_id");
      expect(result).toHaveProperty("title", "Título default");
      expect(result).toHaveProperty("shortDescription", "Descrição default");
      expect(result).toHaveProperty("guide");
      expect(result).toHaveProperty("author");
    });
  });
});
