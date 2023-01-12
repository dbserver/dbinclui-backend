import { DigitalContentRepository } from "../../repositories/DigitalContentRepository.js";

export class DeleteLogicDigitalContentService {
  constructor(private readonly repository: DigitalContentRepository) {}
  async execute(id: string, updatedBy: string) {
    try {
      const guide = await this.repository.findById(id);

      if (!guide) {
        return new Error("Digital Content does not exists");
      }

      const digitalContentUpdated = await this.repository.deleteLogic(id, updatedBy);

      if (!digitalContentUpdated) {
        return new Error("There was a problem updating the digital content");
      }

      return digitalContentUpdated;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
