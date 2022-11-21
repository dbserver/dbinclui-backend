import { GuideRepository } from "../../repositories/GuideRepository.js";

export class GetCategoriesAndContentsGuideService {
  constructor(private readonly repository: GuideRepository) {}
  async execute(id: string) {
    try {
      const result = await this.repository.findCategoriesAndContentsByGuideId(id);

      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
