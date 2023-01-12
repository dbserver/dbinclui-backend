import { InMemoryDigitalContentRepository } from "./InMemoryDigitalContentRepository";

describe("description", () => {
  let repository: InMemoryDigitalContentRepository;

  beforeAll(() => {
    repository = new InMemoryDigitalContentRepository();
  });

  beforeEach(async () => {
    await repository.clear();
    await repository.loadData(3);
  });

  describe("Create", () => {
    it("Should create and return a DigitalContent", async () => {
      const contentExample = {
        title: `Título do conteúdo digital ${repository.database.length}`,
        shortDescription: `Descrição do conteúdo digital`,
        guide: {
          _id: String(repository.database.length),
          title: `Título do guia ${repository.database.length}`,
          content: `Conteúdo do guia ${repository.database.length}`,
          filePaths: {
            publicId: `arquivo${repository.database.length}`,
            filePath: `link.com/arquivo${repository.database.length}`,
          },
          author: {
            uid: "0",
            name: "12",
            email: `User "12346589`,
            admin: false,
          },
          deleted: false,
        },
        category: {
          _id: String(repository.database.length),
          title: `Título da categoria ${repository.database.length}`,
          shortDescription: `Descrição da categoria ${repository.database.length}`,
          guide: {
            _id: String(repository.database.length),
            title: `Título do guia ${repository.database.length}`,
            content: `Conteúdo do guia ${repository.database.length}`,
            filePaths: {
              publicId: `arquivo${repository.database.length}`,
              filePath: `link.com/arquivo${repository.database.length}`,
            },
            author: {
              uid: "0",
              name: "12",
              email: `User "12346589`,
              admin: false,
            },
            deleted: false,
          },
          author: {
            uid: "0",
            name: "12",
            email: `User "12346589`,
            admin: false,
          },
          deleted: false,
        },
        filePaths: [
          {
            publicId: `arquivo${repository.database.length}`,
            filePath: `link.com/arquivo${repository.database.length}`,
          },
        ],
        author: {
          uid: "0",
          name: "12",
          email: `User "12346589`,
          admin: false,
        },
        deleted: false,
      };

      const result = await repository.create(contentExample);

      expect(result).not.toBeNull();
      expect(result._id).toBe("3");
      expect(result.title).toBe(`Título do conteúdo digital ${3}`);
    });
  });

  describe("update", () => {
    it("Should throw an Error if DigitalContent ID not exists", async () => {
      const contentExample = {
        id: "1290-1",
        title: `Título do conteúdo digital ${repository.database.length}`,
        shortDescription: `Descrição do conteúdo digital`,
        guide: {
          _id: String(repository.database.length),
          title: `Título do guia ${repository.database.length}`,
          content: `Conteúdo do guia ${repository.database.length}`,
          filePaths: {
            publicId: `arquivo${repository.database.length}`,
            filePath: `link.com/arquivo${repository.database.length}`,
          },
          author: {
            uid: "0",
            name: "12",
            email: `User "12346589`,
            admin: false,
          },
          deleted: false,
        },
        category: {
          _id: String(repository.database.length),
          title: `Título da categoria ${repository.database.length}`,
          shortDescription: `Descrição da categoria ${repository.database.length}`,
          guide: {
            _id: String(repository.database.length),
            title: `Título do guia ${repository.database.length}`,
            content: `Conteúdo do guia ${repository.database.length}`,
            filePaths: {
              publicId: `arquivo${repository.database.length}`,
              filePath: `link.com/arquivo${repository.database.length}`,
            },
            author: {
              uid: "0",
              name: "12",
              email: `User "12346589`,
              admin: false,
            },
            deleted: false,
          },
          author: {
            uid: "0",
            name: "12",
            email: `User "12346589`,
            admin: false,
          },
          deleted: false,
        },
        filePaths: [
          {
            publicId: `arquivo${repository.database.length}`,
            filePath: `link.com/arquivo${repository.database.length}`,
          },
        ],
        author: {
          uid: "0",
          name: "12",
          email: `User "12346589`,
          admin: false,
        },
        deleted: false,
      };

      await expect(async () => await repository.update(contentExample)).rejects.toThrowError(
        "Digital Content does not exists",
      );
    });

    it("Should update and return a DigitalContentEntity", async () => {
      const contentExample = {
        _id: "0",
        title: `Título do conteúdo digital ${repository.database.length}`,
        shortDescription: `Descrição do conteúdo digital`,
        guide: {
          _id: String(repository.database.length),
          title: `Título do guia ${repository.database.length}`,
          content: `Conteúdo do guia ${repository.database.length}`,
          filePaths: {
            publicId: `arquivo${repository.database.length}`,
            filePath: `link.com/arquivo${repository.database.length}`,
          },
          author: {
            uid: "0",
            name: "12",
            email: `User "12346589`,
            admin: false,
          },
          deleted: false,
        },
        category: {
          _id: String(repository.database.length),
          title: `Título da categoria ${repository.database.length}`,
          shortDescription: `Descrição da categoria ${repository.database.length}`,
          guide: {
            _id: String(repository.database.length),
            title: `Título do guia ${repository.database.length}`,
            content: `Conteúdo do guia ${repository.database.length}`,
            filePaths: {
              publicId: `arquivo${repository.database.length}`,
              filePath: `link.com/arquivo${repository.database.length}`,
            },
            author: {
              uid: "0",
              name: "12",
              email: `User "12346589`,
              admin: false,
            },
            deleted: false,
          },
          author: {
            uid: "0",
            name: "12",
            email: `User "12346589`,
            admin: false,
          },
          deleted: false,
        },
        filePaths: [
          {
            publicId: `arquivo${repository.database.length}`,
            filePath: `link.com/arquivo${repository.database.length}`,
          },
        ],
        author: {
          uid: "0",
          name: "12",
          email: `User "12346589`,
          admin: false,
        },
        deleted: false,
      };

      const result = await repository.update(contentExample);

      expect(result._id).toBe("0");
      expect(result.title).toBe(`Título do conteúdo digital 3`);
      expect(typeof result).toBe("object");
    });
  });

  describe("findAll", () => {
    it("Should return an array empty", async () => {
      await repository.clear();
      const result = await repository.findAll();
      expect(result.length).toEqual(0);
    });

    it("Should return all digital contents", async () => {
      const result = await repository.findAll();

      expect(result.length).not.toBeNull();
      expect(result.length).toEqual(3);
    });
  });

  describe("findById", () => {
    it("Should be null if ID not found", async () => {
      const result = await repository.findById("123");

      expect(result).toBeNull();
    });

    it("Should return a DigitalContent by ID", async () => {
      const result = await repository.findById("0");
      expect(result).not.toBeNull();
      expect(result?._id).toBe("0");
      expect(result?.title).toBe("Título do conteúdo digital 0");
    });
  });

  describe("findByGuideId", () => {
    it("Should return an array with 1 digital content", async () => {
      const result = await repository.findByGuideId("0");

      expect(result.length).toEqual(1);
      expect(result[0]._id).toBe("0");
    });
  });

  describe("findByCategoryId", () => {
    it("Should return an array with 1 digital Content", async () => {
      const result = await repository.findByCategoryId("0");

      expect(result.length).toEqual(1);
      expect(result[0]._id).toBe("0");
    });
  });

  describe("delete", () => {
    it("Should throw an Error if ID not exists", async () => {
      await expect(async () => await repository.delete("092022")).rejects.toThrowError(
        "Digital Content does not exists",
      );
    });

    it("Should update deleted to true", async () => {
      const result = await repository.deleteLogic("2");

      expect(result?.deleted).toBeTruthy();
    });

    it("Should delete and return a DigitalCotent deleted", async () => {
      const result = await repository.delete("0");

      expect(result._id).toBe("0");
    });
  });
});
