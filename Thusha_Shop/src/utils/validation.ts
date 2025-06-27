<<<<<<< HEAD

import { z } from "zod";

// Form validation schemas
export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(6, "Password must be at least 6 characters").optional(),
  confirmNewPassword: z.string().optional()
}).refine(
  data => !data.newPassword || data.newPassword === data.confirmNewPassword, 
  {
    message: "New passwords don't match",
    path: ["confirmNewPassword"]
  }
);

export const validateForm = <T>(schema: z.ZodSchema<T>, data: any) => {
  try {
    schema.parse(data);
    return { success: true };
=======
// src/utils/validation.ts

import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const validateForm = <T>(schema: z.ZodSchema<T>, data: unknown) => {
  try {
    const validData = schema.parse(data);
    return { success: true, data: validData };
>>>>>>> upstream/main
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error };
    }
<<<<<<< HEAD
    return { success: false, errors: new z.ZodError([]) };
  }
};
=======
    return { success: false, errors: new Error('Validation failed') };
  }
};
>>>>>>> upstream/main
