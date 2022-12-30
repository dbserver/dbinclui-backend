import { InMemoryUsersExpressionsRepository } from "../../helpers/inMemoryRepositories/InMemoryUsersExpressionsRepository";
import { GetAllByIdUserExpressionsService } from "./GetAllByIdUserExpressionsService";

describe("GetAllByIdUserExpressionsService", () => {
  let repository: InMemoryUsersExpressionsRepository;
  let service: GetAllByIdUserExpressionsService;

  beforeAll(() => {
    repository = new InMemoryUsersExpressionsRepository();
    service = new GetAllByIdUserExpressionsService(repository);
  });

  beforeEach(() => {
    repository.loadExpresionDefaultData(5);
    repository.loadExpressionWithSameUser(1, "1");
  });

  afterEach(() => {
    repository.clearAllDatabases();
  });

  it("Should return an empty array", async () => {
    const result = await service.execute("123456");

    expect(result.length).toEqual(0);
  });

  it("Should return an array with three elements", async () => {
    const result = await service.execute("1");

    expect(result.length).toEqual(2);

    expect(result[0]).toHaveProperty("_id", "1");
    expect(result[0]).toHaveProperty("expression", "Expressão de test numero: 1");
    expect(result[0]).toHaveProperty("author", {
      _id: "1",
      admin: false,
      email: "Usuario1@email.com",
      name: "Usuario 1",
      uid: "1",
    });

    expect(result[1]).toHaveProperty("_id", "0");
    expect(result[1]).toHaveProperty("expression", "Expressão de test com o mesmo id numero: 0");
    expect(result[1]).toHaveProperty("author", {
      _id: "1",
      admin: false,
      email: "Usuario1@email.com",
      name: "Usuario 1",
      uid: "1",
    });
  });
});
