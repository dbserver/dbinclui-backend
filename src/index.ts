import "./configs/env.js";
import { App } from "./App.js";
import { MongoDB } from "./database/MongoConnect.js";
import { Cloudinary } from "./database/Cloudinary.js";

const cloudinary = new Cloudinary();
const mongo = new MongoDB();
const app = new App();

cloudinary.initializeConfig();
mongo.connect();
app.start();
