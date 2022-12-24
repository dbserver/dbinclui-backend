import { UserEntity } from "../../entities/UserEntity.js";
import { UserModel } from "../../models/UserModel.js";
import { UserRepository } from "../UserRepository.js";

export class UserMongoRepository implements UserRepository {
  database = UserModel;

  async create(user: UserEntity): Promise<UserEntity> {
    return this.database.create(user);
  }

  async findByUid(uid: string): Promise<UserEntity | null> {
    return this.database.findOne({ uid: uid });
  }
}
