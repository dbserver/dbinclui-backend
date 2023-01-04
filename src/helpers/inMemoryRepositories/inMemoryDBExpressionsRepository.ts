import { DBExpressionEntity } from "../../entities/DBExpressionEntity.js";
import { DBExpressionsRepository } from "../../repositories/DBExpressionsRepository.js";
import { UserEntity } from "../../entities/UserEntity";

export class inMemoryDBExpressionsRepository implements DBExpressionsRepository {
  database: DBExpressionEntity[] = [];
  userDatabase: UserEntity[] = [];

  async create(expression: DBExpressionEntity): Promise<DBExpressionEntity> {
    expression._id = String(this.database.length);

    this.database.push(expression);
    return this.database[this.database.length - 1];
  }

  async findAll(): Promise<DBExpressionEntity[]> {
    return this.database;
  }

  async findById(id: string): Promise<DBExpressionEntity | null> {
    const result = this.database.find(
      (dbExpression) => (dbExpression._id as unknown as string) === id,
    );
    return result ?? null;
  }

  async favorite(expressionID: string, userID: string): Promise<DBExpressionEntity | null> {
    const result = await this.findById(expressionID);

    if (!result) {
      return null;
    }

    const expressionIndex = this.database.indexOf(result);

    let userIndex = -1;
    const match = result.favoriteOf?.find((user, index) => {
      userIndex = index;
      return user.toString() === userID;
    });

    if (!match) {
      result.favoriteOf?.push(userID);
      this.database[expressionIndex] = result;
      return this.database[expressionIndex];
    }

    result.favoriteOf?.splice(userIndex, 1);
    this.database[expressionIndex] = result;
    return this.database[expressionIndex];
  }

  async deleteLogic(id: string, updatedBy: string): Promise<DBExpressionEntity | null> {
    const result = await this.findById(id);

    if (!result) {
      throw new Error("Expression does not exists");
    }

    const index = this.database.indexOf(result);

    result.deleted = true;
    result.updatedBy = updatedBy as any;

    this.database[index] = result;

    return this.database[index];
  }

  async findByUid(uid: string): Promise<UserEntity | null> {
    const user = this.userDatabase.find((user) => user.uid === uid);

    if (!user) {
      return null;
    }

    return user;
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

  async loadExpresionDefaultData(length: number) {
    for (let i = 0; i < length; i++) {
      const expression: DBExpressionEntity = {
        _id: String(i),
        expression: `Expressão de test numero: ${i}`,
        favoriteOf: ["123"],
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
