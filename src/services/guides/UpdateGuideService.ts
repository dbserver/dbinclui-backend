import { GuideEntity } from "../../entities/GuideEntity.js";
import { GuideRepository } from "../../repositories/GuideRepository.js";

export class UpdateGuideService {
  constructor(private readonly repository: GuideRepository) {}

  async execute(id: string, guideRequest: GuideEntity) {
    try {
      const guide = await this.repository.findById(id);

      if (!guide) {
        return new Error("Guide does not exists");
      }

      guideRequest._id = guide._id;
      const result = await this.repository.update(guideRequest);

      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
