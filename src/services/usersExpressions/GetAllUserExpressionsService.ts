import { UsersExpressionsRepository } from "../../repositories/UsersExpressionsRepository";

export class GetAllUserExpressionsService {
  constructor(private readonly repository: UsersExpressionsRepository) {}

  async execute(id: string) {
    try {
      const result = await this.repository.findAllById(id);

      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
