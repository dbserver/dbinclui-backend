import { UserExpressionEntity } from "../../entities/UserExpressionEntity.js";
import { UsersExpressionsRepository } from "../../repositories/UsersExpressionsRepository.js";
import { UserEntity } from "../../entities/UserEntity.js";

export class InMemoryUsersExpressionsRepository implements UsersExpressionsRepository {
  database: UserExpressionEntity[] = [];

  userDatabase: UserEntity[] = [];

  async create(expression: UserExpressionEntity): Promise<UserExpressionEntity> {
    expression._id = String(this.database.length);

    this.database.push(expression);
    return this.database[this.database.length - 1];
  }

  async findByUid(uid: string): Promise<UserEntity | null> {
    const user = this.userDatabase.find((user) => user.uid === uid);

    if (!user) {
      return null;
    }

    return user;
  }

  async findById(id: string) {
    const expression = this.database.find((expression) => expression._id === id);

    if (!expression) {
      return null;
    }

    return expression;
  }

  async loadUserDefaultData(length: number) {
    for (let i = 0; i < length; i++) {
      const user: UserEntity = {
        _id: String(i),
        uid: String(i),
        name: `Usuario ${i}`,
        email: `Usuario${i}@email.com`,
        admin: false,
      };

      this.userDatabase.push(user);
    }
  }

  async findAllById(id: string) {
    return this.database.filter((expression) => expression.author._id === id);
  }

  async delete(id: string) {
    const result = await this.findById(id);

    if (!result) {
      throw new Error("Expression does not exists");
    }

    const index = this.database.indexOf(result);

    this.database.splice(index, 1);

    return result;
  }

  async loadExpresionDefaultData(length: number) {
    for (let i = 0; i < length; i++) {
      const expression: UserExpressionEntity = {
        _id: String(i),
        expression: `Expressão de test numero: ${i}`,
        author: {
          _id: String(i),
          uid: String(i),
          name: `Usuario ${i}`,
          email: `Usuario${i}@email.com`,
          admin: false,
        },
      };

      this.database.push(expression);
    }
  }

  async clearAllDatabases() {
    this.database = [];
    this.userDatabase = [];
  }
}
