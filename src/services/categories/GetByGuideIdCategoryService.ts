import { CategoryRepository } from "../../repositories/CategoryRepository.js";

export class GetByGuideIdCategoryService {
  constructor(private readonly repository: CategoryRepository) {}

  async execute(guideId: string) {
    try {
      const result = await this.repository.findByGuideId(guideId);

      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
