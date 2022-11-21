import { DigitalContentEntity } from "../../entities/DigitalContentEntity.js";
import { DigitalContentRepository } from "../../repositories/DigitalContentRepository.js";

export class CreateDigitalContentService {
  constructor(private readonly repository: DigitalContentRepository) {}

  async execute(content: DigitalContentEntity) {
    try {
      const result = this.repository.create(content);

      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
