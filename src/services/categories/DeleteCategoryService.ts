import { CategoryRepository } from "../../repositories/CategoryRepository.js";

export class DeleteCategoryService {
  constructor(private readonly repository: CategoryRepository) {}
  async execute(id: string) {
    try {
      const category = await this.repository.findById(id);

      if (!category) {
        return new Error("Category with this ID does not exists");
      }

      await this.repository.delete(id);

      return category;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
