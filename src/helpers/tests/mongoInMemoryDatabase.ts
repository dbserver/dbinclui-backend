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
  
  public async createGuide () {
    try{
      const guide = mongoose.connection.collection("guides")
      const res = await guide.insertOne({
        title: "Título do guia",
        content: "Conteúdo do guia",
        filePaths: {
          filePath: `wwww.image${1}.com.br`,
          publicId: `uploads/${1}`,
        },
    });
    }catch(error){
      console.log("Failed to launch database collections.");
      console.log(error);
      throw error;
    }
  }

  public async getGuide () {
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

}

export const mongoInMemoryDatabase = MongoInMemoryDatabase.getInstance();
