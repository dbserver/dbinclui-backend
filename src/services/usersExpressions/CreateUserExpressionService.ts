import { ExpressionEntity } from "../../entities/ExpressionEntity.js";
import { UsersExpressionsRepository } from "../../repositories/UsersExpressionsRepository.js";

export class CreateUserExpressionService {
  constructor(private usersExpressionRepository: UsersExpressionsRepository) {}

  async execute(userExpression: ExpressionEntity) {
    try {
      const result = this.usersExpressionRepository.create(userExpression);

      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
