import { DBExpressionsRepository } from "../../repositories/DBExpressionsRepository";

export class FavoriteDBExpressionService {
  constructor(private readonly repository: DBExpressionsRepository) {}

  async execute(expressionID: string, userID: string) {
    try {
      const result = await this.repository.favorite(expressionID, userID);

      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
