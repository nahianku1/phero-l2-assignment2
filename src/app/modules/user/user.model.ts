import mongoose, { Schema } from "mongoose";
import { Address, FullName, IUserModel, Order, User } from "./user.interface";
import config from "../../../config/config";
import bcrypt from "bcrypt";

const fullNameSchema = new Schema<FullName>(
  {
    firstName: { type: String, required: [true, "First name is required!"] },
    lastName: { type: String, required: [true, "Last name is required!"] },
  },
  { _id: false }
);

const addressSchema = new Schema<Address>(
  {
    street: { type: String, required: [true, "Street is required!"] },
    city: { type: String, required: [true, "City is required!"] },
    country: { type: String, required: [true, "Country is required!"] },
  },
  { _id: false }
);

const orderSchema = new Schema<Order>(
  {
    productName: {
      type: String,
      required: [true, "Product name is required!"],
    },
    price: { type: Number, required: [true, "Product price is required!"] },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required!"],
    },
  },
  { _id: false }
);

const userSchema = new Schema<User, IUserModel>(
  {
    userId: {
      type: Number,
      required: [true, "User ID is required!"],
      unique: true,
    },
    username: { type: String, required: [true, "Username is required!"] },
    password: { type: String, required: [true, "Password is required!"] },
    fullName: {
      type: fullNameSchema,
      required: [true, "Fullname is required!"],
    },
    age: { type: Number, required: [true, "Age is required!"] },
    email: {
      type: String,
      required: [true, "Email is required!"],
      validate: {
        validator: function (email: string): boolean {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
        message: "Please enter a valid email address!",
      },
      unique: true,
      lowercase: true,
    },
    isActive: { type: Boolean, required: [true, "Status is required!"] },
    hobbies: { type: [String], required: [true, "Hobbies is required!"] },
    address: { type: addressSchema, required: [true, "Address is required!"] },
    orders: { type: [orderSchema] },
  },
  // while converting to JSON, deleting unnecessary fields from resulting document at schema level. this will be applied to all documents. 
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret._id;
        delete ret.password;
      },
    },
    
  }
);

//checking user already exists or not
userSchema.statics.isExists = async function (userId: string) {
  return await this.findOne({ userId: userId });
};

//checking order already exists or not. User can't order same product twice.
userSchema.statics.orderExists = async function (userId: string, order: Order) {
  return await this.findOne({
    userId: userId,
    orders: { $elemMatch: { ...order } },
  });
};

//  pre hook for hashing password while saving document
userSchema.pre("save", async function (next): Promise<void> {
  this.password = await bcrypt.hash(
    this.password as string,
    Number(config.bcrypt_salt)
  );
  next();
});

// post hook for hiding orders from output result.
userSchema.post("save", async function (doc, next): Promise<void> {
  doc.orders = undefined;
  next();
});

// post hook for all find query. If resulting document is not null then hide orders from that resulting document 
userSchema.post(/^find/, async function (doc, next): Promise<void> {
  if (doc !== null) {
    doc.orders = undefined;
    next();
  }
});

//while updating, hashing password again from plain text to hashed password otherwise the plain password will be saved when updating. 
userSchema.pre("findOneAndUpdate", async function (next): Promise<void> {
  const doc = this.getUpdate()!.$set; //getting the document from the update query
  doc.password = await bcrypt.hash(
    doc.password as string,
    Number(config.bcrypt_salt)
  );
  next();
});

export const UserModel = mongoose.model<User, IUserModel>("User", userSchema);
