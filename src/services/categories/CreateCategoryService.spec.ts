import { CreateCategoryService } from "./CreateCategoryService";
import { InMemoryCategoryRepository } from "../../helpers/inMemoryRepositories/InMemoryCategoryRepository";
import { CategoryEntity } from "../../entities/CategoryEntity";

describe("CreateCategoryService", () => {
  let inMemoryCategoryRepository: InMemoryCategoryRepository;
  let categoryService: CreateCategoryService;

  beforeAll(async () => {
    inMemoryCategoryRepository = new InMemoryCategoryRepository();
    categoryService = new CreateCategoryService(inMemoryCategoryRepository);
  });

  it("Should create and return a category entity", async () => {
    const categoryExample: CategoryEntity = {
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
      },
    };

    const result = await categoryService.execute(categoryExample);

    expect(result._id).toBe("0");
    expect(result.guide._id).toBe("1122");
  });
});
