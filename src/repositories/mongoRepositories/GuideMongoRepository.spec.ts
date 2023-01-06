import { mongoInMemoryDatabase } from "../../helpers/tests/mongoInMemoryDatabase";
import { GuideMongoRepository } from "./GuideMongoRepository";
import { GuideEntity } from "../../entities/GuideEntity";

const guideMock = {
  title: "Título default",
  content: "Descrição default",
  author: "63b5c66a1b506ae265806e6e",
  deleted: false,
  filePaths: {
    filePath: "www.imagem.com",
    publicId: "imagem",
  },
} as any;

describe("GuideMongoRepository", () => {
  let repository: GuideMongoRepository;

  beforeAll(async () => {
    await mongoInMemoryDatabase.open();
    repository = new GuideMongoRepository();
  });

  beforeEach(async () => {
    await repository.create(guideMock);
  });

  afterEach(async () => {
    await mongoInMemoryDatabase.clear();
  });

  afterAll(async () => {
    await mongoInMemoryDatabase.close();
  });

  describe("Create", () => {
    it("Should create a guide", async () => {
      const newGuideMock = {
        title: "Título novo",
        content: "Descrição novo",
        author: "63b5c66a1b506ae265806e6e",
        deleted: false,
        filePaths: {
          filePath: "www.imagem.com",
          publicId: "imagem",
        },
      } as any;

      const result = await repository.create(newGuideMock);

      expect(result._id).not.toBeNull();
      expect(result.title).toBe("Título novo");
      expect(result.content).toBe("Descrição novo");
      expect(result).toHaveProperty("author");
      expect(result).toHaveProperty("filePaths");
    });
  });

  describe("Update", () => {
    const newGuideMock = {
      _id: "63b5c66a1b506ae265806e6e",
      title: "Título alterado",
      content: "Descrição alterada",
      author: "63b5c66a1b506ae265806e6e",
      deleted: false,
      filePaths: {
        filePath: "www.imagem.com",
        publicId: "imagem",
      },
    } as any;

    it("Should return null if ID does not exists", async () => {
      const result = await repository.update(newGuideMock);

      expect(result).toBeNull();
    });

    it("Should update an guide", async () => {
      const guide: GuideEntity[] = await repository.findAll();
      const guideID = guide[0]._id as string;
      newGuideMock._id = guideID;

      const result = await repository.update(newGuideMock);

      expect(result).toHaveProperty("_id", guideID);
      expect(result).toHaveProperty("title", "Título alterado");
      expect(result).toHaveProperty("content", "Descrição alterada");
      expect(result).toHaveProperty("author");
      expect(result).toHaveProperty("deleted", false);
      expect(result).toHaveProperty("filePaths");
    });
  });

  describe("FindById", () => {
    it("Should return null if ID doest not exist", async () => {
      const result = await repository.findById("00b0c00a1b506ae265806e0e");

      expect(result).toBeNull();
    });

    it("Should return a guide", async () => {
      const guide: GuideEntity[] = await repository.findAll();
      const guideID = guide[0]._id as string;

      const result = await repository.findById(guideID);

      expect(result).toHaveProperty("_id", guideID);
      expect(result).toHaveProperty("title", "Título default");
      expect(result).toHaveProperty("content", "Descrição default");
      expect(result).toHaveProperty("author");
      expect(result).toHaveProperty("deleted", false);
      expect(result).toHaveProperty("filePaths");
    });
  });

  describe("findAll", () => {
    it("Should return all guides", async () => {
      const result = await repository.findAll();

      expect(result[0]).toHaveProperty("_id");
      expect(result[0]).toHaveProperty("title");
      expect(result[0]).toHaveProperty("content");
      expect(result[0]).toHaveProperty("author");
      expect(result[0]).toHaveProperty("deleted", false);
      expect(result[0]).toHaveProperty("filePaths");
      expect(result.length).toEqual(1);
    });
  });

  describe("DeleteLogic", () => {
    it("Should delete logic and return a category with delete true", async () => {
      const guide: GuideEntity[] = await repository.findAll();
      const guideID = guide[0]._id as string;

      const result = await repository.deleteLogic(guideID, "63b5c66a1b506ae265806e6e");

      expect(result).toHaveProperty("_id", guideID);
      expect(result).toHaveProperty("title", "Título default");
      expect(result).toHaveProperty("content", "Descrição default");
      expect(result).toHaveProperty("author");
      expect(result).toHaveProperty("deleted", true);
      expect(result).toHaveProperty("filePaths");
    });
  });

  describe("Delete", () => {
    it("Should delete permanently a guide", async () => {
      const guide: GuideEntity[] = await repository.findAll();
      const guideID = guide[0]._id as string;

      const result = await repository.delete(guideID);

      const guides: GuideEntity[] = await repository.findAll();

      expect(result).toHaveProperty("_id", guideID);
      expect(result).toHaveProperty("title", "Título default");
      expect(result).toHaveProperty("content");
      expect(result).toHaveProperty("author");
      expect(result).toHaveProperty("deleted", false);
      expect(result).toHaveProperty("filePaths");
    });
  });

  describe("FindCategoriesAndContentsByGuideId",  () =>{})
  it("Should find categories and digital contents", async () =>{
    const result = await repository.findCategoriesAndContentsByGuideId("")
  
  })
});
