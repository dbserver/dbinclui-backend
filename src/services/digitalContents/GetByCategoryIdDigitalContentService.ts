import { DigitalContentRepository } from "../../repositories/DigitalContentRepository.js";

export class GetByCategoryIdDigitalContentService {
  constructor(private readonly repository: DigitalContentRepository) {}

  async execute(id: string) {
    try {
      const result = await this.repository.findByCategoryId(id);

      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
