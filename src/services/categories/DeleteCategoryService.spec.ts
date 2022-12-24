import { CategoryEntity } from "../../entities/CategoryEntity";
import { InMemoryCategoryRepository } from "../../helpers/inMemoryRepositories/InMemoryCategoryRepository";
import { DeleteCategoryService } from "./DeleteCategoryService";
describe("DeleteCategoryService", () => {
  let inMemoryCategoryRepository: InMemoryCategoryRepository;
  let categoryService: DeleteCategoryService;

  beforeAll(async () => {
    inMemoryCategoryRepository = new InMemoryCategoryRepository();
    await inMemoryCategoryRepository.loadData(1);
    categoryService = new DeleteCategoryService(inMemoryCategoryRepository);
  });

  it("Should be an error if guide does not exists", async () => {
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

    const result = await categoryService.execute(categoryExample._id!);
    expect(result).toBeInstanceOf(Error);
  });

  it("Should delete a category by ID and return a CategoryEntity deleted", async () => {
    const result = (await categoryService.execute("0")) as CategoryEntity;

    expect(result._id).toHaveProperty("0");
    expect(result).toHaveProperty("title");
    expect(result).toHaveProperty("shortDescription");
  });
});
