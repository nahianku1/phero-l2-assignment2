import { Request, Response } from "express";
import { UserServices } from "./user.service";
import { zoduserValidationSchema } from "./user.validation";

const createUser = async (req: Request, res: Response) => {
  console.log(`Servet hit`);

  try {
    // const { user } = req.body;

    const { success, error, data } = zoduserValidationSchema.safeParse(
      req.body
    );
    console.log({ success, error, data },14);

    if (success) {
      const result = await UserServices.createUserIntoDB(data);
      if (result.userId) {
        res.status(200).json({
          success: true,
          message: "User created succesfully",
          data: result,
        });
      }
    } else {
      res.status(400).json({
        success: true,
        message: "Zod validation failed",
        error: error,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error creating student",
      error: error.message,
    });
  }
};

export const UserControllers = {
  createUser,
};
