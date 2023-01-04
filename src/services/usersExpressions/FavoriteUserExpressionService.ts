import { UsersExpressionsRepository } from "../../repositories/UsersExpressionsRepository";

export class FavoriteUserExpressionService {
  constructor(private readonly repository: UsersExpressionsRepository) {}

  async execute(id: string) {
    try {
      const expression = await this.repository.findById(id);

      if (!expression) {
        return new Error("Expression with this ID does not exists.");
      }

      expression.favorite = !expression.favorite;

      const expressionUpdated = await this.repository.update(expression);

      return expressionUpdated;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
