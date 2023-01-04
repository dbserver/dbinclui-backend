import { DBExpressionEntity } from "../../entities/DBExpressionEntity";
import { DBExpressionsRepository } from "../../repositories/DBExpressionsRepository";

export class DeleteLogicDBExpressionService {
  constructor(private readonly repository: DBExpressionsRepository) {}

  async execute(id: string, updatedBy: string) {
    try {
      const expression = await this.repository.findById(id);

      if (!expression) {
        return new Error("Expression with this ID does not exists");
      }

      const expressionUpdated = await this.repository.deleteLogic(id, updatedBy);

      return expressionUpdated;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
