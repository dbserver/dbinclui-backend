import { CategoryRepository } from "../../repositories/CategoryRepository.js";

export class GetByIdCategoryService {
  constructor(private readonly repository: CategoryRepository) {}

  async execute(id: string) {
    try {
      const result = await this.repository.findById(id);

      if (!result) {
        return new Error("Category with this ID does not exists");
      }

      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
