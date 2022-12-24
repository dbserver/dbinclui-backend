import { UserEntity } from "../../entities/UserEntity";
import { InMemoryUserRepository } from "./InMemoryUserRepository";

describe("InMemoryUserRepository", () => {
  let inMemoryUserRepository: InMemoryUserRepository;

  beforeAll(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
  });

  beforeEach(() => {
    inMemoryUserRepository.loadDefaultData(2);
  });

  afterEach(() => {
    inMemoryUserRepository.clearDatabase();
  });

  it("Should an Exception if uid already exists", async () => {
    const user: UserEntity = {
      uid: "0",
      name: "Joazinho",
      email: "Joazinho@gmail.com",
      admin: false,
    };

    await expect(async () => await inMemoryUserRepository.create(user)).rejects.toThrowError(
      "User with this uid already exists",
    );
  });

  it("Should create and return an User entity", async () => {
    const user: UserEntity = {
      uid: "123456",
      name: "Joazinho",
      email: "Joazinho@gmail.com",
      admin: false,
    };

    const result = await inMemoryUserRepository.create(user);

    expect(result.uid).toBe("123456");
    expect(result.name).toBe("Joazinho");
    expect(result.email).toBe("Joazinho@gmail.com");
  });

  it("Should return null if uid does not exists in database", async () => {
    const result = await inMemoryUserRepository.findByUid("inexistente");

    expect(result).toBeNull();
  });

  it("Should return an User Entity by uid", async () => {
    const result = await inMemoryUserRepository.findByUid("0");

    expect(result).not.toBeNull();
  });
});
