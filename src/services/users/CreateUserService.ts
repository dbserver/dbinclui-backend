import { UserEntity } from "../../entities/UserEntity";
import { UserRepository } from "../../repositories/UserRepository";

export class CreateUserService {
  constructor(private readonly repository: UserRepository) {}
  async execute(user: UserEntity) {
    try {
      const userFinded = await this.repository.findByUid(user.uid);

      if (userFinded) {
        return new Error("User with this uid already exists");
      }
      const result = await this.repository.create(user);

      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
