import express from "express";
import { UserControllers } from "./user.controller";

export const userRouter = express.Router();

userRouter.post("/", UserControllers.createUser);
// studentRouter.get("/", StudentControllers.getAllStudents);
// studentRouter.get("/single/:id", StudentControllers.getSingleStudents);
// studentRouter.delete("/single/:id", StudentControllers.deleteSingleStudents);
