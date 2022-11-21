import { CategoryEntity } from "../../entities/CategoryEntity.js";
import { CategoryRepository } from "../../repositories/CategoryRepository.js";

export class CreateCategoryService {
  constructor(private readonly repository: CategoryRepository) {}

  async execute(category: CategoryEntity) {
    try {
      const result = await this.repository.create(category);

      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
