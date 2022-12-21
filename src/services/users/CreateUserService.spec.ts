import { UserEntity } from "../../entities/UserEntity";
import { InMemoryUserRepository } from "../../helpers/inMemoryRepositories/InMemoryUserRepository";
import { CreateUserService } from "./CreateUserService";

describe("CreateUserService", () => {
  let inMemoryUserRepository: InMemoryUserRepository;
  let createUserService: CreateUserService;

  beforeAll(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    createUserService = new CreateUserService(inMemoryUserRepository);
  });

  beforeEach(() => {
    inMemoryUserRepository.loadDefaultData(2);
  });

  afterEach(() => {
    inMemoryUserRepository.clearDatabase();
  });

  it("Should return an Error if uid already exists in database", async () => {
    const user: UserEntity = {
      uid: "1",
      name: "Joazinho",
      email: "Joazinho@email.com",
    };

    const result = await createUserService.execute(user);

    expect(result).toBeInstanceOf(Error);
  });

  it("Should create and return an UserEntity", async () => {
    const user: UserEntity = {
      uid: "3",
      name: "Joazinho",
      email: "Joazinho@email.com",
    };

    const result = await createUserService.execute(user);

    expect(result).not.toBeInstanceOf(Error);
    expect((result as UserEntity).uid).toBe("3");
    expect((result as UserEntity).name).toBe("Joazinho");
    expect((result as UserEntity).email).toBe("Joazinho@email.com");
    expect((result as UserEntity).admin).toBe(false);
  });
});
