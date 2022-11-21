import { GuideRepository } from "../../repositories/GuideRepository.js";

export class GetByIdGuideService {
  constructor(private readonly repository: GuideRepository) {}

  async execute(id: string) {
    try {
      const result = await this.repository.findById(id);

      if (!result) {
        return new Error("Guide with this ID does not exists");
      }

      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
