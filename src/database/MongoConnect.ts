import mongoose from "mongoose";

export class MongoDB {
  async connect() {
    try {
      const uri = process.env.MONGO_URL || "mongodb://localhost:27017/";
      await mongoose.connect(uri, {
        dbName: process.env.MONGO_DATABASE,
      });

      console.log("Conectado ao banco de dados com sucesso!");
    } catch (error) {
      throw new Error("Ocorreu um problema ao iniciar a conexão com o banco de dados");
    }
  }

  async disconnect() {
    try {
      await mongoose.disconnect();
      console.log("Banco de dados desconectado com sucesso!");
    } catch (error) {
      console.log("Ocorreu um problema ao tentar desconectar o banco de dados");
    }
  }
}
