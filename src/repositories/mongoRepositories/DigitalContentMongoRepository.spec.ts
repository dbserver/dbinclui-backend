import { DigitalContentEntity } from "../../entities/DigitalContentEntity";
import { mongoInMemoryDatabase } from "../../helpers/tests/mongoInMemoryDatabase";
import { DigitalContentMongoRepository } from "./DigitalContentMongoRepository";

const contentMock = {
  title: "Título default",
  shortDescription: "Descrição default",
  guide: "63b5c66a1b506ae265806e6e",
  category: "63b5c66a1b506ae265806e6e",
  author: "63b5c66a1b506ae265806e6e",
  deleted: false,
  filePaths: [
    {
      filePath: "www.imagem.com",
      publicId: "imagem",
    },
  ],
} as any;

describe("DigitalContentMongoRepository", () => {
  let repository: DigitalContentMongoRepository;

  beforeAll(async () => {
    await mongoInMemoryDatabase.open();
    repository = new DigitalContentMongoRepository();
  });

  beforeEach(async () => {
    await repository.create(contentMock);
  });

  afterEach(async () => {
    await mongoInMemoryDatabase.clear();
  });

  afterAll(async () => {
    await mongoInMemoryDatabase.close();
  });

  describe("Create", () => {
    it("Create content", async () => {
      const content = {
        title: "Conteúdo de teste",
        shortDescription: "Descrição de teste",
        guide: "63b5c66a1b506ae265806e6e",
        author: "63b5c66a1b506ae265806e6e",
        filePaths: [
          {
            filePath: "www.imagem.com",
            publicId: "imagem",
          },
        ],
        deleted: false,
      } as any;

      const result = await repository.create(content);

      expect(result._id).not.toBeNull();
      expect(result.title).toBe("Conteúdo de teste");
      expect(result.shortDescription).toBe("Descrição de teste");
      expect(result.guide).not.toBeNull();
      expect(result.author).not.toBeNull();
      expect(result).toHaveProperty("filePaths");
    });
  });

  describe("Update", () => {
    const newDigitalContent = {
      title: "Título default",
      shortDescription: "Descrição default",
      guide: "63b5c66a1b506ae265806e6e",
      category: "63b5c66a1b506ae265806e6e",
      author: "63b5c66a1b506ae265806e6e",
      filePaths: [
        {
          filePath: "www.imagem.com",
          publicId: "imagem",
        },
      ],
    } as any;

    it("Should update a digital content", async () => {
      const digitalContent: DigitalContentEntity[] = await repository.findAll();
      const digitalContentID = digitalContent[0]._id as string;
      newDigitalContent._id = digitalContentID;
      const result = await repository.update(newDigitalContent);

      expect(result).toHaveProperty("_id", digitalContentID);
      expect(result).toHaveProperty("title", "Título default");
      expect(result).toHaveProperty("shortDescription", "Descrição default");
      expect(result).toHaveProperty("filePaths");
      expect(result).toHaveProperty("guide");
      expect(result).toHaveProperty("author");
    });
  });
  describe("Delete", () => {
    it("Should delete permanently a digital content", async () => {
      const digitalContent: DigitalContentEntity[] = await repository.findAll();
      const digitalContentID = digitalContent[0]._id as string;

      const result = await repository.delete(digitalContentID);

      const digitalContents: DigitalContentEntity[] = await repository.findAll();

      expect(result).toHaveProperty("_id", digitalContentID);
      expect(result).toHaveProperty("title", "Título default");
      expect(result).toHaveProperty("shortDescription", "Descrição default");
      expect(result).toHaveProperty("guide");
      expect(result).toHaveProperty("author");
      expect(result).toHaveProperty("deleted");
      expect(result).toHaveProperty("filePaths");
    });
  });

  describe("FindById", () => {
    it("Should return null if ID does not exists", async () => {
      const result = await repository.findById("63b5c66a1b506ae265806e6e");

      expect(result).toBeNull();
    });

    it("Should return a digital content by ID", async () => {
      const digitalContent: DigitalContentEntity[] = await repository.findAll();
      const digitalContentID = digitalContent[0]._id as string;

      const result = await repository.findById(digitalContentID);

      expect(result).toHaveProperty("_id");
      expect(result).toHaveProperty("title", "Título default");
      expect(result).toHaveProperty("shortDescription", "Descrição default");
      expect(result).toHaveProperty("filePaths");
      expect(result).toHaveProperty("guide");
      expect(result).toHaveProperty("author");
    });
  });

  describe("findByGuideId", () => {
    it("Should return a guide by ID", async () => {
      const result = await repository.findByGuideId("63b5c66a1b506ae265806e6e");

      expect(result[0]).not.toBeNull();
      expect(result[0]).toHaveProperty("_id");
    });
  });

  describe("DeleteLogic", () => {
    it("Should delete logic and return a category with delete true", async () => {
      const digitalContent: DigitalContentEntity[] = await repository.findAll();
      const digitalContentID = digitalContent[0]._id as string;

      const result = await repository.deleteLogic(digitalContentID, "63b5c66a1b506ae265806e6e");

      expect(result).toHaveProperty("_id", digitalContentID);
      expect(result).toHaveProperty("title", "Título default");
      expect(result).toHaveProperty("shortDescription", "Descrição default");
      expect(result).toHaveProperty("guide");
      expect(result).toHaveProperty("author");
      expect(result).toHaveProperty("deleted", true);
    });
  });

  describe("FindAll", () => {
    it("Should return an Array with all digital content", async () => {
      const result = await repository.findAll();

      expect(result.length).toEqual(1);
      expect(result[0]).toHaveProperty("_id", result[0]._id);
      expect(result[0]).toHaveProperty("title", "Título default");
      expect(result[0]).toHaveProperty("shortDescription", "Descrição default");
      expect(result[0]).toHaveProperty("guide");
      expect(result[0]).toHaveProperty("author");
      expect(result[0]).toHaveProperty("deleted", false);
    });
  });

  describe("findMediaByPublicId", () => {
    it("", async () => {
      const result = await repository.findMediaByPublicId("imagem");

      expect(result).not.toBeNull();
      expect(result).toHaveProperty("_id");
    });
  });

  describe("updateMediaByPublicId", () => {
    it("Should update a media by public Id", async () => {
      const result = await repository.updateMediaByPublicId({
        public_id: "imagem",
        newFilePath: "www.imagemNova.com",
        newPublicId: "imagemNova",
      });

      expect(result).toHaveProperty("title", "Título default");
      expect(result).toHaveProperty("shortDescription", "Descrição default");
      expect(result).toHaveProperty("guide");
      expect(result).toHaveProperty("author");
      expect(result).toHaveProperty("deleted", false);
      expect(result?.filePaths[0].filePath).toBe("www.imagemNova.com")
      expect(result?.filePaths[0].publicId).toBe("imagemNova")
    });
  });
});
