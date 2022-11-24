import { DigitalContentEntity } from "../../entities/DigitalContentEntity";
import { InMemoryDigitalContentRepository } from "../../helpers/inMemoryRepositories/InMemoryDigitalContentRepository";
import { FileProps } from "../../interfaces/FilePropsInterface";
import { UpdateDigitalContentService } from "./UpdateDigitalContentService";

describe("UpdateDigitalContentService", () => {
  let repository: InMemoryDigitalContentRepository;
  let contentService: UpdateDigitalContentService;
  beforeAll(async () => {
    repository = new InMemoryDigitalContentRepository();
    contentService = new UpdateDigitalContentService(repository);
    await repository.loadData(5);
  });

  it("Should return 0 if ID not found", async () => {
    const contentExample = {
      title: `Título do conteúdo digital ${repository.database.length}`,
      shortDescription: `Descrição do conteúdo digital ${repository.database.length}`,
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
      guide: {
        _id: String(repository.database.length),
        title: `Título do guia ${repository.database.length}`,
        content: `Conteúdo do guia ${repository.database.length}`,
        filePaths: {
          filePath: `www.image${repository.database.length}.com.br`,
          publicId: `uploads/image${repository.database.length}`,
        },
      },
      filePaths: [
        {
          publicId: `arquivo${repository.database.length}`,
          filePath: `link.com/arquivo${repository.database.length}`,
        },
      ],
    };

    const result = await contentService.execute("123", contentExample, []);
    expect(result).toBeInstanceOf(Error);
  });

  it("Should update and return 1", async () => {
    const contentExample = {
      title: `Título do conteúdo digital 0 atualizado`,
      shortDescription: `Descrição do conteúdo digital 0 atualizado`,
      guide: {
        _id: String(repository.database.length),
        title: `Título do guia 0`,
        content: `Conteúdo do guia 0`,
        filePaths: {
          filePath: `www.image0.com.br`,
          publicId: `uploads/image0`,
        },
      },
      category: {
        _id: String(repository.database.length),
        title: `Título da categoria 0`,
        shortDescription: `Descrição da categoria 0`,
        guide: {
          _id: String(repository.database.length),
          title: `Título do guia 0`,
          content: `Conteúdo do guia 0`,
          filePaths: {
            filePath: `www.image0.com.br`,
            publicId: `uploads/image0`,
          },
        },
      },
      filePaths: [
        {
          publicId: `arquivo0`,
          filePath: `link.com/arquivo0`,
        },
      ],
    };

    const { contentUpdated } = (await contentService.execute("0", contentExample, [])) as {
      contentUpdated: DigitalContentEntity;
      oldFiles: FileProps[];
    };

    expect(contentUpdated.shortDescription).toEqual(`Descrição do conteúdo digital 0 atualizado`);
    expect(repository.database[0].title).toBe("Título do conteúdo digital 0 atualizado");
  });
});
