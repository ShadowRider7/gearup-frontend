import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(255, "Name must not exceed 255 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    role: z.enum(["CUSTOMER", "PROVIDER", "ADMIN"], {
      message: "Invalid role selected",
    }),
    phone: z
      .string()
      .regex(/^\+?[0-9\s\-()]+$/, "Please enter a valid phone number")
      .min(10, "Phone number must be at least 10 characters"),
    address: z
      .string()
      .min(5, "Address must be at least 5 characters")
      .max(255, "Address must not exceed 255 characters"),
    bio: z
      .string()
      .max(1000, "Bio must not exceed 1000 characters")
      .optional()
      .nullable(),
    profilePhoto: z
      .string()
      .url("Please enter a valid URL")
      .optional()
      .nullable(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
