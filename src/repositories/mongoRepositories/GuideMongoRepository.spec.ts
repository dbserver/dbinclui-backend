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
});
