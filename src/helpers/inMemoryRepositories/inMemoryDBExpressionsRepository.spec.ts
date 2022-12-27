import { inMemoryDBExpressionsRepository } from "./inMemoryDBExpressionsRepository";
import { DBExpressionEntity } from "../../entities/DBExpressionEntity";

describe("inMemoruUsersExpressionsRepository", () => {
    let repository: inMemoryDBExpressionsRepository;

    beforeAll(() => {
        repository = new inMemoryDBExpressionsRepository();
    });

    beforeEach(() => {
        repository.loadExpresionDefaultData(3);
    });

    afterEach(() => {
        repository.clearAllDatabases();
    });

    it("Should create a new db expression in the database", async () => {
        const dbExpression: DBExpressionEntity = {
            _id: "3",
            expression: "Essa é uma expressão de teste",
            author: {
                uid: "0",
                name: "Autor Teste",
                email: "autor_teste@gmail.com",
                admin: false,
            },
        };

        const result = await repository.create(dbExpression);

        expect(result._id).toBe("3");
        expect(result.expression).toBe("Essa é uma expressão de teste");
        expect(result.author.uid).toBe("0");
        expect(result.author.name).toBe("Autor Teste");
        expect(result.author.email).toBe("autor_teste@gmail.com");
    });

});