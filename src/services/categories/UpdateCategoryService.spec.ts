import { CategoryEntity } from "../../entities/CategoryEntity";
import { InMemoryCategoryRepository } from "../../helpers/inMemoryRepositories/InMemoryCategoryRepository";
import { UpdateCategoryService } from "./UpdateCategoryService";

describe("UpdateCategoryService", () => {
  let inMemoryCategoryRepository: InMemoryCategoryRepository;
  let categoryService: UpdateCategoryService;

  beforeAll(async () => {
    inMemoryCategoryRepository = new InMemoryCategoryRepository();
    await inMemoryCategoryRepository.loadData(1);
    categoryService = new UpdateCategoryService(inMemoryCategoryRepository);
  });

  it("Should be an error if category does not exists", async () => {
    const categoryExample: CategoryEntity = {
      _id: "213",
      title: "Título da categoria",
      shortDescription: "Descrição da categoria",
      guide: {
        _id: "1122",
        title: "Título do guia",
        content: "Conteúdo do guia",
        filePaths: {
          filePath: `www.image.com.br`,
          publicId: `uploads/image`,
        },
        author: {
          _id: String(inMemoryCategoryRepository.database.length),
          uid: String(inMemoryCategoryRepository.database.length),
          name: `User ${inMemoryCategoryRepository.database.length}`,
          email: `user${inMemoryCategoryRepository.database.length}@email.com`,
          admin: false,
        },
      },
      author: {
        _id: String(inMemoryCategoryRepository.database.length),
        uid: String(inMemoryCategoryRepository.database.length),
        name: `User ${inMemoryCategoryRepository.database.length}`,
        email: `user${inMemoryCategoryRepository.database.length}@email.com`,
        admin: false,
      },
    };

    const result = await categoryService.execute(categoryExample._id as string, categoryExample);
    expect(result).toBeInstanceOf(Error);
  });

  it("Should update and return a CategoryEntity", async () => {
    const categoryExample: CategoryEntity = {
      _id: "0",
      title: "Título da categoria",
      shortDescription: "Descrição da categoria",
      guide: {
        _id: "1122",
        title: "Título do guia",
        content: "Conteúdo do guia",
        filePaths: {
          filePath: `www.image.com.br`,
          publicId: `uploads/image`,
        },
        author: {
          _id: String(inMemoryCategoryRepository.database.length),
          uid: String(inMemoryCategoryRepository.database.length),
          name: `User ${inMemoryCategoryRepository.database.length}`,
          email: `user${inMemoryCategoryRepository.database.length}@email.com`,
          admin: false,
        },
      },
      author: {
        _id: String(inMemoryCategoryRepository.database.length),
        uid: String(inMemoryCategoryRepository.database.length),
        name: `User ${inMemoryCategoryRepository.database.length}`,
        email: `user${inMemoryCategoryRepository.database.length}@email.com`,
        admin: false,
      },
    };

    const result = (await categoryService.execute(
      categoryExample._id as string,
      categoryExample,
    )) as CategoryEntity;
    expect(result.title).toBe("Título da categoria");
  });
});
