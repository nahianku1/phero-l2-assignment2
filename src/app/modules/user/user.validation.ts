import { z } from "zod";

export const zodfullNameSchema = z.object({
  firstName: z.string({ required_error: "First name is required" }),
  lastName: z.string({ required_error: "Last name is required" }),
});

export const zodaddressSchema = z.object({
  street: z.string({ required_error: "Street is required" }),
  city: z.string({ required_error: "City is required" }),
  country: z.string({ required_error: "Country is required" }),
});

export const zodorderSchema = z.object({
  productName: z.string({ required_error: "Product name is required" }),
  price: z.number({ required_error: "Price is required" }),
  quantity: z.number({ required_error: "Quantity is required" }),
});

export const zoduserValidationSchema = z.object({
  userId: z.number({ required_error: "User ID is required" }),
  username: z.string({ required_error: "Username is required" }),
  password: z.string({ required_error: "Password is required" }),
  fullName: zodfullNameSchema,
  age: z.number({ required_error: "Age is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please enter a valid email!" }),
  isActive: z.boolean({ required_error: "isActive is required" }),
  hobbies: z.array(z.string({ required_error: "Hobbies is required" })),
  address: zodaddressSchema,
  orders: z.array(zodorderSchema).optional(),
});
