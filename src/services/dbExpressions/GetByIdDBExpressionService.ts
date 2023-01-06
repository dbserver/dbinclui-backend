import { DBExpressionsRepository } from './../../repositories/DBExpressionsRepository.js';

export class GetByIdDBExpressionService {
  constructor(private readonly repository: DBExpressionsRepository) {}

  async execute(id: string) {
    try {
      const result = await this.repository.findById(id);

      if (!result) {
        return new Error("Expression with this ID does not exists");
      }

      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
