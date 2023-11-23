import { Request, Response } from "express";
import { UserServices } from "./user.service";
import { zoduserValidationSchema } from "./user.validation";

const createUser = async (req: Request, res: Response) => {

  try {

    const {
      success,
      error,
      data: validUser,
    } = zoduserValidationSchema.safeParse(req.body);


    if (success) {
      const result = await UserServices.createUserIntoDB(validUser);
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
      message: "Error fetching all students",
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching single student",
      error: error.message,
    });
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const result = await UserServices.updateSingleUser(userId, req.body);

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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating students",
      error: error.message,
    });
  }
};

const deleteSingleUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const result = await UserServices.deleteSingleUserFromDB(userId);

    if (result?.userId) {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting students",
      error: error.message,
    });
  }
};

const updateUserOrders = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const result = await UserServices.updateUserOrders(userId, req.body);

    if (result?.modifiedCount) {
      res.status(200).json({
        success: true,
        message: "Order created successfully!",
        data: null,
      });
    } else {
      res.status(500).send({
        success: false,
        message: "Order already exists!",
        error: {
          code: 500,
          description: "Order already exists!",
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
};

const getAllOrder = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const result = await UserServices.getAllOrdersfromUser(userId);
    console.log(result, __filename, 195);

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
    // console.log(result,__filename,227);

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
