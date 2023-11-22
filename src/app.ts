import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";

const app: Application = express();

app.use(cors());
app.use(express.json());
dotenv.config();

app.get("/api/users", async (req, res) => {
  res.send(`Welcome!`);
});

export default app;
