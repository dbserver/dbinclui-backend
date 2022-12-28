import { InMemoryUserRepository } from "../../helpers/inMemoryRepositories/InMemoryUserRepository";
import { GetByUidService } from "./GetByUidUserService";

describe("GetByUidService", () => {
  let inMemoryUserRepository: InMemoryUserRepository;
  let getByUidService: GetByUidService;

  beforeAll(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    getByUidService = new GetByUidService(inMemoryUserRepository);
  });

  beforeEach(() => {
    inMemoryUserRepository.loadDefaultData(2);
  });

  afterEach(() => {
    inMemoryUserRepository.clearDatabase();
  });

  it("Should return false if uid does not exists in database", async () => {
    const result = await getByUidService.execute("0");

    expect(result.name).toBe("Usuario 0");
  });

  it("Should return true if uid exists in database", async () => {
    const result = await getByUidService.execute("inexistente");

    expect(result).toBeInstanceOf(Error);
  });
});
