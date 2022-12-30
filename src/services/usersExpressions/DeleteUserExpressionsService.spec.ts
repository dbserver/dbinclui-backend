import { InMemoryUsersExpressionsRepository } from "../../helpers/inMemoryRepositories/inMemoryUsersExpressionsRepository";
import { DeleteUserExpressionsService } from "./DeleteUserExpressionsService";

describe("DeleteUserExpressionService", () => {
  let repository: InMemoryUsersExpressionsRepository;
  let service: DeleteUserExpressionsService;

  beforeAll(() => {
    repository = new InMemoryUsersExpressionsRepository();
    service = new DeleteUserExpressionsService(repository);
  });

  beforeEach(async () => {
    repository.loadExpresionDefaultData(3);
  });

  it("Should return an error if an expressionId does not exist", async () => {
    const result = await service.execute("InexistenteID");

    expect(result).toBeInstanceOf(Error);
  });

  it("Should delete and return an entity deleted", async () => {
    const result = await service.execute("2");

    expect(result).not.toBeNull();
    expect(result).toHaveProperty("_id", "2");
    expect(result).toHaveProperty("expression", "Expressão de test numero: 2");
    expect(result).toHaveProperty("author", {
      _id: "2",
      admin: false,
      email: "Usuario2@email.com",
      name: "Usuario 2",
      uid: "2",
    });
  });
});
