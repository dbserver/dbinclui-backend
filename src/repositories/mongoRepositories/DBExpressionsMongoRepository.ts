import { DBExpressionEntity } from "../../entities/DBExpressionEntity";
import { DBExpressionsModel } from "../../models/DBExpressionsModel";
import { DBExpressionsRepository } from "../DBExpressionsRepository";

export class DBExpressionsMongoRepository implements DBExpressionsRepository {
    database = DBExpressionsModel;

    async create(expression: DBExpressionEntity): Promise<DBExpressionEntity> {
        return this.database.create(expression);
    }
}