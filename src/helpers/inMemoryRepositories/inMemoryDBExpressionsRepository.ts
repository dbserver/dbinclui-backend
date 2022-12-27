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