import { DigitalContentRepository } from "../../repositories/DigitalContentRepository.js";

export class GetAllDigitalContentsService {
  constructor(private readonly repository: DigitalContentRepository) {}
  async execute() {
    try {
      const result = await this.repository.findAll();

      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
