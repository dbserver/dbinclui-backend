import { DBExpressionsMongoRepository } from "./DBExpressionsMongoRepository"
import { mongoInMemoryDatabase } from "../../helpers/tests/mongoInMemoryDatabase";
import { DBExpressionEntity } from "../../entities/DBExpressionEntity";


describe ("DBExpressionsMongoRepository", () => {
    let repository: DBExpressionsMongoRepository; 

    beforeAll(async () => {
        await mongoInMemoryDatabase.open();
        repository = new DBExpressionsMongoRepository();
      });
    
      beforeEach(async () => {
        await mongoInMemoryDatabase.createDBExpression();
      });
    
      afterEach(async () => {
        await mongoInMemoryDatabase.clear();
      });
    
      afterAll(async () => {
        await mongoInMemoryDatabase.close();
      });

      describe ("create expression", () =>{
        it("Espera que crie uma expressão", async () => {
            const expression = {
               author: "63b5c66a1b506ae265806e6e" ,
                expression: "Olá, Bom Dia",
            } as any

            const result = await repository.create(expression);

            expect(result._id).not.toBeNull();
            expect(result.expression).toBe("Olá, Bom Dia");
            expect(result.author._id).not.toBeNull();
        })
      }
      )
});
