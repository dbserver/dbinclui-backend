import { DBExpressionsRepository } from "../../repositories/DBExpressionsRepository";

export class DeleteDBExpressionService {
  constructor(private readonly repository: DBExpressionsRepository) {}

  async execute(id: string) {
    try {
      const result = await this.repository.delete(id);

      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
