import { UserMongoRepository } from "./UserMongoRepository";
import { mongoInMemoryDatabase } from "../../helpers/tests/mongoInMemoryDatabase";
import { UserEntity } from "../../entities/UserEntity";

describe("UserMongoRepository", () => {
  let repository: UserMongoRepository;

  beforeAll(async () => {
    await mongoInMemoryDatabase.open();
    repository = new UserMongoRepository();
  }); 

  beforeEach(async () => {
    await mongoInMemoryDatabase.createUser("20");
  });

  afterEach(async () => {
    await mongoInMemoryDatabase.clear();
  });

  afterAll(async () => {
    await mongoInMemoryDatabase.close();
  });

  describe("create", () => {
    it("Espera criar um usuário", async () => {
      const user: UserEntity = {
        uid: "123",
        name: "Joao",
        email: "joaojoao@gmail.com",
      };

      const result = await repository.create(user);

      expect(result._id).not.toBeNull();
      expect(result.uid).toBe("123");
      expect(result.email).toBe("joaojoao@gmail.com");
      expect(result.name).toBe("Joao");
      expect(result.admin).toBeFalsy();
    });
  });

  describe("findByUid", () => {
    it("Espera ser nulo se não encontrar por uid", async () => {
      const resultUid = await repository.findByUid("10");

      expect(resultUid).toBeNull();
    });

    it("Espera encontrar por uid", async () => {
      const resultUid = await repository.findByUid("20");

      expect(resultUid).not.toBeNull();
      expect(resultUid?.uid).toBe("20");
      expect(resultUid?.name).toBe("Joao");
      expect(resultUid?.email).toBe("Joao@email.com");
      expect(resultUid?.admin).toBeTruthy();
      expect(resultUid?._id).not.toBeNull();
    });
  });
});
