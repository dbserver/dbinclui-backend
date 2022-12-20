import { ExpressionEntity } from "../../entities/ExpressionEntity";
import { UsersExpressionsRepository } from "../../repositories/UsersExpressionsRepository";

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
