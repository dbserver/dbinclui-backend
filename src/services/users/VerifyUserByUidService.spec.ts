import { InMemoryUserRepository } from "../../helpers/inMemoryRepositories/InMemoryUserRepository";
import { VerifyUserByUidService } from "./VerifyUserByUidService";

describe("VerifyUserByUidService", () => {
  let inMemoryUserRepository: InMemoryUserRepository;
  let verifyUserByUidService: VerifyUserByUidService;

  beforeAll(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    verifyUserByUidService = new VerifyUserByUidService(inMemoryUserRepository);
  });

  beforeEach(() => {
    inMemoryUserRepository.loadDefaultData(2);
  });

  afterEach(() => {
    inMemoryUserRepository.clearDatabase();
  });

  it("Should return false if uid does not exists in database", async () => {
    const result = await verifyUserByUidService.execute("2");

    expect(result).toBeFalsy();
  });

  it("Should return true if uid exists in database", async () => {
    const result = await verifyUserByUidService.execute("1");

    expect(result).toBeTruthy();
  });
});
