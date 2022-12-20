import { ExpressionEntity } from "../entities/ExpressionEntity";

export interface UsersExpressionsRepository {
    create(content:ExpressionEntity):Promise<ExpressionEntity>;
}