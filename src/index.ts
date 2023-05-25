import "./configs/env.js";
import { App } from "./App.js";
import { MongoDB } from "./database/MongoConnect.js";

const mongo = new MongoDB();
const app = new App();

mongo.connect();
app.start();
