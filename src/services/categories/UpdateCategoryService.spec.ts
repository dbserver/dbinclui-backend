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
      },
    };

    const result = await categoryService.execute(categoryExample._id as string, categoryExample);
    expect(result).toBeInstanceOf(Error);
  });

  it("Should update and return update count", async () => {
    const categoryExample: CategoryEntity = {
      _id: "0",
      title: "Título da categoria",
      shortDescription: "Descrição da categoria",
      guide: {
        _id: "1122",
        title: "Título do guia",
        content: "Conteúdo do guia",
      },
    };

    const result = await categoryService.execute(categoryExample._id as string, categoryExample);
    expect(result).toEqual(1);
  });
});
