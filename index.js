import express from "express";
import db from "./database/database.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./routes/routes.js";
dotenv.config();
const app = express();

try {
    await db.authenticate();
    console.log('Database Connected');
} catch (error) {
    console.error(error);
}

app.use(cookieParser());
app.use(express.json());
app.use(router);
app.listen(8080, ()=> console.log(`Server running on port 8080`));
