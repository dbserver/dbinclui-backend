import { UserRepository } from "../../repositories/UserRepository";
import { UserEntity } from "../../entities/UserEntity";

export class InMemoryUserRepository implements UserRepository {
  database: UserEntity[] = [];

  async create(user: UserEntity): Promise<UserEntity> {
    const result = await this.findByUid(user.uid);

    if (result) {
      throw new Error("User with this uid already exists");
    }

    user._id = String(this.database.length);
    user.admin = false;

    this.database.push(user);

    return this.database[this.database.length - 1];
  }

  async findByUid(uid: string): Promise<UserEntity | null> {
    const user = this.database.find((user) => user.uid === uid);

    if (!user) {
      return null;
    }

    return user;
  }

  async loadDefaultData(length: number) {
    for (let i = 0; i < length; i++) {
      const user: UserEntity = {
        _id: String(i),
        uid: String(i),
        name: `Usuario ${i}`,
        email: `Usuario${i}@email.com`,
        admin: false,
      };

      this.database.push(user);
    }
  }

  async clearDatabase() {
    this.database = [];
  }
}
