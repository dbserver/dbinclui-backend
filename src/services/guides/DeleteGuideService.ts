import { GuideRepository } from "../../repositories/GuideRepository.js";

export class DeleteGuideService {
  constructor(private readonly repository: GuideRepository) {}
  async execute(id: string) {
    try {
      const guide = await this.repository.findById(id);

      if (!guide) {
        return new Error("Guide does not exists");
      }

      await this.repository.delete(id);

      return guide;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
