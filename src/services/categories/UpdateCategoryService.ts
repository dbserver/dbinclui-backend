import { CategoryEntity } from "../../entities/CategoryEntity.js";
import { CategoryRepository } from "../../repositories/CategoryRepository.js";

export class UpdateCategoryService {
  constructor(private readonly repository: CategoryRepository) {}

  async execute(id: string, categoryRequest: CategoryEntity) {
    try {
      const category = await this.repository.findById(id);

      if (!category) {
        return new Error("Category with this ID does not exists");
      }

      category.title = categoryRequest.title ?? category.title;
      category.shortDescription = categoryRequest.shortDescription ?? category.shortDescription;
      category.guide = categoryRequest.guide ?? category.guide;
      category.updatedBy = categoryRequest.updatedBy;

      const categoryUpdated = await this.repository.update(category);

      return categoryUpdated;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
