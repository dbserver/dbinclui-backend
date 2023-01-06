import { DBExpressionsRepository } from "./../../repositories/DBExpressionsRepository";

export class GetAllDBExpressionsService {
  constructor(private readonly dbExpressionRepository: DBExpressionsRepository) {}
  async execute() {
    try {
      const result = await this.dbExpressionRepository.findAll();

      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
