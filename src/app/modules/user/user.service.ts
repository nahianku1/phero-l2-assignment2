import { Order, User } from "./user.interface";
import { UserModel } from "./user.model";

const createUserIntoDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};
const getAllUsersUserFromDB = async () => {
  const result = await UserModel.find(
    {},
    { userId: 1, fullName: 1, age: 1, email: 1, address: 1 }
  );
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  console.log(userId, 17);
  const existingUser = await UserModel.isExists(userId);
  if (existingUser) {
    const result = await UserModel.findOne({ userId: userId });

    return result;
  } else {
    return existingUser;
  }
};
const updateSingleUser = async (userId: number, updatedInfo: User) => {
  console.log(`Servet hit from update user`);
  const existingUser = await UserModel.isExists(userId);
  if (existingUser) {
    await UserModel.validate(updatedInfo);
    const result = await UserModel.findOneAndUpdate(
      { userId: userId },
      { $set: { ...updatedInfo } },
      { new: true, runValidators: true }
    );
    console.log(result, 35);

    return result;
  } else {
    return existingUser;
  }
};

const deleteSingleUserFromDB = async (userId: number) => {
  const existingUser = await UserModel.isExists(userId);
  if (existingUser) {
    const result = await UserModel.findOneAndDelete({ userId });
    console.log(result, 45);

    return result;
  } else {
    return existingUser;
  }
};

const updateUserOrders = async (userId: number, order: Order) => {
  const existingUser = await UserModel.isExists(userId);
  if (existingUser) {
    const existingOrder = await UserModel.orderExists(userId, order);
    console.log(existingOrder, 61);
    if (existingOrder) {
      return null;
    } else {
      const result = await UserModel.updateOne(
        { userId },
        { $addToSet: { orders: { ...order } } }
      );
      console.log(result, 55);

      return result;
    }
  } else {
    return existingUser;
  }
};

const getAllOrdersfromUser = async (userId: number) => {
  const existingUser = await UserModel.isExists(userId);

  if (existingUser) {
    const result = await UserModel.find(
      { userId: userId },
      { orders: 1, _id: 0 }
    );
    console.log(result[0], 86);
    return result[0];
  } else {
    return existingUser;
  }
};

const getToalPricefromDB = async (userId: number) => {
  console.log(`Servet hit from Total Price`);
  const existingUser = await UserModel.isExists(userId);
  console.log(existingUser, 96);

  if (existingUser) {
    const result = await UserModel.aggregate([
      {
        $unwind: "$orders",
      },
      {
        $match: { userId: Number(userId) },
      },
      {
        $group: {
          _id: "$userId",
          totalPrice: {
            $sum: { $multiply: ["$orders.price", "$orders.quantity"] },
          },
        },
      },

      {
        $addFields: { totalPrice: "$totalPrice" },
      },
      { $project: { _id: 0 } },
    ]);
    console.log(result);

    return result[0];
  } else {
    return existingUser;
  }
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersUserFromDB,
  getSingleUserFromDB,
  updateSingleUser,
  deleteSingleUserFromDB,
  updateUserOrders,
  getAllOrdersfromUser,
  getToalPricefromDB,
};
