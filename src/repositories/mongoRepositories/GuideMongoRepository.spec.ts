import { mongoInMemoryDatabase } from "../../helpers/tests/mongoInMemoryDatabase";
import { GuideMongoRepository } from "./GuideMongoRepository";

const contentMock = {
  title: "Título default",
  content: "Descrição default",
  author: "63b5c66a1b506ae265806e6e",
  deleted: false,
  filePaths: {
    filePath: "www.imagem.com",
    publicId: "imagem",
  },
} as any;

describe("GuideMongoRepository", () => {
  let repository: GuideMongoRepository;

  beforeAll(async () => {
    await mongoInMemoryDatabase.open();
    repository = new GuideMongoRepository();
  });

  beforeEach(async () => {
    await repository.create(contentMock);
  });

  afterEach(async () => {
    await mongoInMemoryDatabase.clear();
  });

  afterAll(async () => {
    await mongoInMemoryDatabase.close();
  });
});
