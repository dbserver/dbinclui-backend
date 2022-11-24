import { DigitalContentRepository } from "../../repositories/DigitalContentRepository";

export class GetByGuideIdDigitalContentService {
  constructor(private readonly repository: DigitalContentRepository) {}

  async execute(id: string) {
    try {
      const result = await this.repository.findByGuideId(id);

      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
