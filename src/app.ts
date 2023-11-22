import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { userRouter } from "./app/modules/user/user.route";

const app: Application = express();

app.use(cors());
app.use(express.json());
dotenv.config();

app.use("/api/users", userRouter);

export default app;
