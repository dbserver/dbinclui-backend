import { InMemoryDigitalContentRepository } from "../../helpers/inMemoryRepositories/InMemoryDigitalContentRepository";

describe("CreateDigitalContentService", () => {
  let repository: InMemoryDigitalContentRepository;

  beforeAll(() => {
    repository = new InMemoryDigitalContentRepository();
  });

  it("Should create and return a digital content", async () => {
    const contentExample = {
      title: `Título do conteúdo digital ${repository.database.length}`,
      shortDescription: `Descrição do conteúdo digital ${repository.database.length}`,
      guide: {
        _id: String(repository.database.length),
        title: `Título do guia ${repository.database.length}`,
        content: `Conteúdo do guia ${repository.database.length}`,
        filePaths: {
          filePath: `www.image${repository.database.length}.com.br`,
          publicId: `uploads/image${repository.database.length}`,
        },
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
            filePath: `www.image${repository.database.length}.com.br`,
            publicId: `uploads/image${repository.database.length}`,
          },
        },
      },
      filePaths: [
        {
          publicId: `arquivo${repository.database.length}`,
          filePath: `link.com/arquivo${repository.database.length}`,
        },
      ],
    };

    const result = await repository.create(contentExample);

    expect(result).not.toBeNull();
    expect(result._id).toBe("0");
    expect(result.title).toBe("Título do conteúdo digital 0");
  });
});
