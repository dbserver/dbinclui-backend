import { mongoInMemoryDatabase } from "../../helpers/tests/mongoInMemoryDatabase";
import { DigitalContentMongoRepository } from "./DigitalContentMongoRepository";

const contentMock = {
  title: "Título default",
  shortDescription: "Descrição default",
  guide: "63b5c66a1b506ae265806e6e",
  category: "63b5c66a1b506ae265806e6e",
  author: "63b5c66a1b506ae265806e6e",
  deleted: false,
  filePaths: [
    {
      filePath: "www.imagem.com",
      publicId: "imagem",
    },
  ],
} as any;

describe("DigitalContentMongoRepository", () => {
  let repository: DigitalContentMongoRepository;

  beforeAll(async () => {
    await mongoInMemoryDatabase.open();
    repository = new DigitalContentMongoRepository();
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

  it("description", () => {});
});
