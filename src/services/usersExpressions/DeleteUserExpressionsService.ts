import { UsersExpressionsRepository } from "../../repositories/UsersExpressionsRepository";

export class DeleteUserExpressionsService {
  constructor(private readonly repository: UsersExpressionsRepository) {}

  async execute(id: string) {
    try {
      const expression = await this.repository.findById(id);
      
      if (!expression) {
        return new Error("Expression with this ID does not exists");
      }

      const result = await this.repository.delete(id);

      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
