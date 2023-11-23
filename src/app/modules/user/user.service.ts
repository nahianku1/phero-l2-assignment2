import { User } from "./user.interface";
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

const getSingleUserFromDB = async (userId: string) => {
  console.log(userId, 17);
  const existingUser = await UserModel.isExists(userId);
  if (existingUser) {
    const result = await UserModel.findOne({ userId: userId });

    return result;
  } else {
    return existingUser;
  }
};
const updateSingleUser = async (userId: string, body: User) => {
  const existingUser = await UserModel.isExists(userId);
  if (existingUser) {
    const result = await UserModel.findOneAndUpdate(
      { userId: userId },
      { $set: { ...body } },
      { new: true, runValidators: true }
    );
    console.log(result);

    return result;
  } else {
    return existingUser;
  }
};

const deleteSingleUserFromDB = async (userId: string) => {
  const result = await UserModel.findOneAndDelete({ userId });
  console.log(result, 45);

  return result;
};
export const UserServices = {
  createUserIntoDB,
  getAllUsersUserFromDB,
  getSingleUserFromDB,
  updateSingleUser,
  deleteSingleUserFromDB,
};
