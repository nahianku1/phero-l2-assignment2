import express from "express";
import { UserControllers } from "./user.controller";

export const userRouter = express.Router();

userRouter.post("/", UserControllers.createUser);
userRouter.get("/", UserControllers.getAllUsers);
userRouter.get("/:userId", UserControllers.getSingleUser);
userRouter.put("/:userId", UserControllers.updateSingleUser);
userRouter.delete("/:userId", UserControllers.deleteSingleUser);
