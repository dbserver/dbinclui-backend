import { GuideRepository } from "../../repositories/GuideRepository.js";

export class DeleteLogicGuideService {
  constructor(private readonly repository: GuideRepository) {}
  async execute(id: string, updatedBy: string) {
    try {
      const guide = await this.repository.findById(id);

      if (!guide) {
        return new Error("Guide does not exists");
      }

      const guideUpdated = await this.repository.deleteLogic(id, updatedBy);

      if (!guideUpdated) {
        return new Error("There was a problem updating the guide");
      }

      return guideUpdated;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
