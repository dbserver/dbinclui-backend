import { GuideRepository } from "../../repositories/GuideRepository.js";

export class GetAllGuidesService {
  constructor(private readonly repository: GuideRepository) {}

  async execute() {
    try {
      const result = await this.repository.findAll();

      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
