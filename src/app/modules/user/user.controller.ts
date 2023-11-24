import { Request, Response } from "express";
import { UserServices } from "./user.service";
import { zodorderSchema, zoduserValidationSchema } from "./user.validation";



const createUser = async (req: Request, res: Response) => {
  const {
    success,
    error,
    data: validUser,
  } = zoduserValidationSchema.safeParse(req.body);

  if (success) {
    try {
      const result = await UserServices.createUserIntoDB(validUser);
      if (result.userId) {
        res.status(200).json({
          success: true,
          message: "User created successfully!",
          data: result,
        });
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error creating user",
        error: error.message,
      });
    }
  } else {
    res.status(400).json({
      success: true,
      message: "Zod validation failed",
      error: error.issues[0].message,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersUserFromDB();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching all user",
      error: error.message,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const result = await UserServices.getSingleUserFromDB(userId);

    if (result?.userId) {
      res.status(200).json({
        success: true,
        message: "User fetched successfully!",
        data: result,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching single user",
      error: error.message,
    });
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const {
    success,
    error,
    data: validUpdateInfo,
  } = zoduserValidationSchema.safeParse(req.body);

  if (success) {
    try {
      const result = await UserServices.updateSingleUser(
        userId,
        validUpdateInfo
      );

      if (result?.userId) {
        res.status(200).json({
          success: true,
          message: "User updated successfully!",
          data: result,
        });
      } else {
        res.status(404).send({
          success: false,
          message: "User not found",
          error: {
            code: 404,
            description: "User not found!",
          },
        });
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error updating user",
        error: error.message,
      });
    }
  } else {
    res.status(400).json({
      success: true,
      message: "Zod validation failed",
      error: error.issues[0].message,
    });
  }
};

const deleteSingleUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const result = await UserServices.deleteSingleUserFromDB(Number(userId));
    if (result) {
      res.status(200).json({
        success: true,
        message: "User deleted successfully!",
        data: null,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: error.message,
    });
  }
};

const updateUserOrders = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const {
    success,
    error,
    data: validOrder,
  } = zodorderSchema.safeParse(req.body);

  if (success) {
    try {
      const result = await UserServices.updateUserOrders(userId, validOrder);
      if (result?.modifiedCount) {
        res.status(200).json({
          success: true,
          message: "Order created successfully!",
          data: null,
        });
      } else if (result === null) {
        res.status(500).send({
          success: false,
          message: "Order already exists!",
          error: {
            code: 500,
            description: "Order already exists!",
          },
        });
      } else {
        res.status(404).send({
          success: false,
          message: "User not found",
          error: {
            code: 404,
            description: "User not found!",
          },
        });
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error updating order",
        error: error.message,
      });
    }
  } else {
    res.status(400).json({
      success: true,
      message: "Zod validation failed",
      error: error.issues[0].message,
    });
  }
};

const getAllOrder = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const result = await UserServices.getAllOrdersfromUser(userId);

    if (result) {
      res.status(200).json({
        success: true,
        message: "Order fetched successfully!",
        data: result,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }
  } catch (error: any) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Error fetching order",
      error: error.message,
    });
  }
};

const getTotalPrice = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const result = await UserServices.getToalPricefromDB(userId);

    if (result) {
      res.status(200).json({
        success: true,
        message: "Total price calculated successfully!",
        data: result,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "User not found!",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching total price!",
      error: error.message,
    });
  }
};
export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  updateUserOrders,
  getAllOrder,
  getTotalPrice,
};
