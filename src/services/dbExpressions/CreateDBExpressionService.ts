import { DBExpressionEntity } from "../../entities/DBExpressionEntity";
import { DBExpressionsRepository } from "../../repositories/DBExpressionsRepository";

export class CreateDBExpressionService {
  constructor(private dbExpressionRepository: DBExpressionsRepository) {}

  async execute(dbExpression: DBExpressionEntity) {
    try {
      const result = this.dbExpressionRepository.create(dbExpression);

      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}