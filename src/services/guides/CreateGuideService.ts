import { GuideEntity } from "../../entities/GuideEntity.js";
import { GuideRepository } from "../../repositories/GuideRepository.js";

export class CreateGuideService {
  constructor(private guidesRepository: GuideRepository) {}

  async execute(guide: GuideEntity) {
    try {
      const result = this.guidesRepository.create(guide);

      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
