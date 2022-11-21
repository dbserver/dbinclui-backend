import { DigitalContentRepository } from "../../repositories/DigitalContentRepository.js";

export class GetByIdDigitalContentService {
  constructor(private readonly repository: DigitalContentRepository) {}

  async execute(id: string) {
    try {
      const result = await this.repository.findById(id);

      if (!result) {
        return new Error("Digital Content with this ID does not exists");
      }

      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
