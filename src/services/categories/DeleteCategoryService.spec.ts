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
      },
    };

    const result = await categoryService.execute(categoryExample._id!);
    expect(result).toBeInstanceOf(Error);
  });

  it("Should delete a category by ID and return a delete count", async () => {
    const result = await categoryService.execute("0");
    expect(result).toEqual(1);
  });
});
