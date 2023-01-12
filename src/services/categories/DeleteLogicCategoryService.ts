import { CategoryRepository } from "../../repositories/CategoryRepository";

export class DeleteLogicCategoryService {
  constructor(private readonly repository: CategoryRepository) {}
  async execute(id: string, updatedBy: string) {
    try {
      const category = await this.repository.findById(id);

      if (!category) {
        return new Error("Category does not exists with this ID");
      }

      const categoryUpdated = await this.repository.deleteLogic(id, updatedBy);

      if (!categoryUpdated) {
        return new Error("There was a problem updating the category");
      }

      return categoryUpdated;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
