import { CategoryRepository } from "../../repositories/CategoryRepository.js";

export class GetAllCategoriesService {
  constructor(private readonly repository: CategoryRepository) {}

  async execute() {
    try {
      const result = await this.repository.findAll();
      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
