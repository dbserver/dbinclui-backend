import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

class MongoInMemoryDatabase {
  private mongoServer?: MongoMemoryServer;
  private static instance: MongoInMemoryDatabase;

  private constructor() {}

  public static getInstance() {
    if (!MongoInMemoryDatabase.instance) {
      MongoInMemoryDatabase.instance = new MongoInMemoryDatabase();
    }
    return MongoInMemoryDatabase.instance;
  }

  public async open() {
    try {
      this.mongoServer = await MongoMemoryServer.create();

      const uri = this.mongoServer.getUri();
      await mongoose.connect(uri);
    } catch (error) {
      console.log("Failed to create database.");
      console.log(error);
      throw error;
    }
  }
  public async close() {
    try {
      await mongoose.connection.dropDatabase();
      await mongoose.disconnect();
      if (this.mongoServer) {
        await this.mongoServer.stop();
      }
    } catch (error) {
      console.log("Failed to close to database.");
      console.log(error);
      throw error;
    }
  }

  public async clear() {
    try {
      const collections = mongoose.connection.collections;
      for (const nameCollection in collections) {
        const collection = collections[nameCollection];
        await collection.deleteMany({});
      }
    } catch (error) {
      console.log("Failed to clean the collections in memory.");
      console.log(error);
      throw error;
    }
  }

  public async createGuide() {
    try {
      const user = mongoose.connection.collection("users");
      await mongoInMemoryDatabase.createUser("123");
      const allUsers = await user.find().toArray();

      const guide = mongoose.connection.collection("guides");
      await guide.insertOne({
        title: "Título do guia",
        content: "Conteúdo do guia",
        filePaths: {
          filePath: `wwww.image${1}.com.br`,
          publicId: `uploads/${1}`,
        },
        author: allUsers[0]._id,
        deleted: false,
      });
    } catch (error) {
      console.log("Failed to launch database collections.");
      console.log(error);
      throw error;
    }
  }

  public async getGuide() {
    try {
      const guide = mongoose.connection.collection("guides");
      const allGuides = await guide.find().toArray();

      return allGuides[0];
    } catch (error) {
      console.log("Something went wrong finding the posts.");
      console.log(error);
      throw error;
    }
  }

  public async createCategory() {
    try {
      const category = mongoose.connection.collection("categories");
      await mongoInMemoryDatabase.createGuide();
      const guides = mongoose.connection.collection("guides");
      const allGuides = await guides.find().toArray();
      const user = mongoose.connection.collection("users");
      await mongoInMemoryDatabase.createUser("123");
      const allUsers = await user.find().toArray();

      await category.insertOne({
        title: "Título da categoria",
        shortDescription: "Descrição da categoria",
        guide: allGuides[0]._id,
        author: allUsers[0]._id,
        deleted: false,
      });
    } catch (error) {
      console.log("Failed to launch database collections.");
      console.log(error);
      throw error;
    }
  }

  public async getCategory() {
    try {
      const category = mongoose.connection.collection("categories");
      const allCategories = await category.find().toArray();

      return allCategories[0];
    } catch (error) {
      console.log("Something went wrong finding the categories.");
      console.log(error);
      throw error;
    }
  }

  public async createDigitalContent() {
    try {
      const digitalContent = mongoose.connection.collection("digitalContents");
      await mongoInMemoryDatabase.createCategory();
      const categories = mongoose.connection.collection("categories");
      const allCategories = await categories.find().toArray();
      await mongoInMemoryDatabase.createGuide();
      const guides = mongoose.connection.collection("guides");
      const allGuides = await guides.find().toArray();
      const user = mongoose.connection.collection("users");
      await mongoInMemoryDatabase.createUser("123");
      const allUsers = await user.find().toArray();

      await digitalContent.insertOne({
        title: "Título do conteúdo digital",
        shortDescription: "Descrição do conteúdo digital",
        guide: allGuides[0]._id,
        category: allCategories[0]._id,
        filePaths: [
          {
            filePath: `wwww.image${1}.com.br`,
            publicId: `uploads/${1}`,
          },
        ],
        author: allUsers[0]._id,
        deleted: false,
      });
    } catch (error) {
      console.log("Failed to launch database collections.");
      console.log(error);
      throw error;
    }
  }

  public async getDigitalContent() {
    try {
      const DigitalContents = mongoose.connection.collection("digitalContents");
      const allDigitalContents = await DigitalContents.find().toArray();

      return allDigitalContents[0];
    } catch (error) {
      console.log("Something went wrong finding the categories.");
      console.log(error);
      throw error;
    }
  }

  public async createUser(uid?: string) {
    uid = uid ?? "123";
    try {
      const user = mongoose.connection.collection("users");
      await user.insertOne({
        uid: uid,
        name: "Joao",
        email: "Joao@email.com",
        admin: true,
      });
    } catch (error) {
      console.log("Failed to launch database collections.");
      console.log(error);
      throw error;
    }
  }

  public async getUser(index?: number) {
    const user = mongoose.connection.collection("users");
    const userFinded = await user.find().toArray();

    return userFinded[index ?? 0];
  }

  public async createUserExpression() {
    try {
      const user = mongoose.connection.collection("users");
      await mongoInMemoryDatabase.createUser("123");
      const allUsers = await user.find().toArray();

      const userExpression = mongoose.connection.collection("usersExpressions");
      userExpression.insertOne({
        expression: "Expressão de test",
        author: allUsers[0]._id,
      });
    } catch (error) {
      console.log("Something went wrong creating the User Expressions.");
      console.log(error);
      throw error;
    }
  }

  public async getExpression() {
    const expression = mongoose.connection.collection("usersExpressions");
    const expressionFinded = await expression.find().toArray();

    return expressionFinded[0];
  }

  public async createDBExpression() {
    try {
      const user = mongoose.connection.collection("users");
      await mongoInMemoryDatabase.createUser("123");
      const allUsers = await user.find().toArray();

      const dbExpression = mongoose.connection.collection("dbExpressions");
      await dbExpression.insertOne({
        expression: "Expressão de test da DB",
        author: allUsers[0]._id,
        favoriteOf: [allUsers[0]._id],
        deleted: false,
      });
    } catch (error) {
      console.log("Something went wrong creating the DB Expressions.");
    }
  }

  public async getDBExpression() {
    try {
      const dbExpression = mongoose.connection.collection("dbExpressions");
      const allDBExpressions = await dbExpression.find().toArray();

      return allDBExpressions[0];
    } catch (error) {
      console.log("Something went wrong finding the categories.");
      console.log(error);
      throw error;
    }
  }
}

export const mongoInMemoryDatabase = MongoInMemoryDatabase.getInstance();
